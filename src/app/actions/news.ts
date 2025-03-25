"use server";

import { firestore } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

export interface News {
  id?: string;
  title: string;
  author: string;
  content: string;
  image_url: string;
  likes: number;
  category: string;
  timestamp?: string;
}

export async function createNews(data: News) {
  try {
    if (!data.title.trim() || !data.author.trim() || !data.content.trim()) {
      return {
        success: false,
        message: "Gagal membuat berita",
      };
    }

    await addDoc(collection(firestore, "news"), {
      title: data.title.trim(),
      author: data.author.trim(),
      content: data.content.trim(),
      likes: 0,
      timestamp: serverTimestamp(),
    });

    revalidatePath("/berita");
    return {
      success: true,
      message: "Berita berhasil dibuat.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal membuat berita",
    };
  }
}

export async function getNews({
  limitNews = 6,
  search,
  filters,
  page = 1,
}: {
  limitNews?: number;
  search?: string;
  filters?: string[];
  page?: number;
}) {
  try {
    const constraints: QueryConstraint[] = [orderBy("timestamp", "desc")];

    if (search) {
      const searchTerm = search.toLowerCase();
      constraints.push(
        where("title_lower", ">=", searchTerm),
        where("title_lower", "<=", searchTerm + "\uf8ff"),
      );
    }

    if (filters && filters.length > 0) {
      constraints.push(
        where(
          "category",
          "in",
          typeof filters === "string" ? [filters] : filters,
        ),
      );
    }

    let q = query(
      collection(firestore, "news"),
      ...constraints,
      limit(limitNews),
    );

    if (page > 1) {
      const prevQuery = query(
        collection(firestore, "news"),
        ...constraints,
        limit(limitNews * (page - 1)),
      );
      const prevSnapshot = await getDocs(prevQuery);
      const lastVisible = prevSnapshot.docs[prevSnapshot.docs.length - 1];

      q = query(
        collection(firestore, "news"),
        ...constraints,
        startAfter(lastVisible),
        limit(limitNews),
      );
    }

    const snapshot = await getDocs(q);

    const countQuery = query(collection(firestore, "news"), ...constraints);
    const countSnapshot = await getCountFromServer(countQuery);
    const totalDocuments = countSnapshot.data().count;

    const data = await Promise.all(
      snapshot.docs.map(async (item) => {
        const likes = await getCountFromServer(
          collection(firestore, "news", item.id, "likes"),
        );

        return {
          ...item.data(),
          title: item.data().title,
          category: item.data().category,
          id: item.id,
          likes: likes.data().count,
          timestamp: item.data().timestamp.toDate().toLocaleString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        };
      }),
    );

    return {
      success: true,
      message: "Berita berhasil diambil.",
      data,
      totalPages: Math.ceil(totalDocuments / limitNews),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal mengambil berita",
    };
  }
}

export async function getNewsById(id: string) {
  try {
    const docRef = doc(firestore, "news", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return {
        success: false,
        message: "Berita tidak ditemukan",
      };
    }

    const likes = await getCountFromServer(
      collection(firestore, "news", snapshot.id, "likes"),
    );

    return {
      success: true,
      message: "Berita berhasil diambil",
      data: {
        ...snapshot.data(),
        id: snapshot.id,
        likes: likes.data().count,
        timestamp: snapshot.data()?.timestamp.toDate().toLocaleString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      } as News,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal mengambil berita",
    };
  }
}

export async function likeNews(newsId: string, userId: string) {
  try {
    const docRef = doc(firestore, "news", newsId, "likes", userId);

    const like = await getDoc(docRef);
    if (like.exists()) {
      await deleteDoc(docRef);

      revalidatePath("/berita");
      return {
        success: true,
        message: "Berita berhasil dihapus like",
      };
    }

    await setDoc(docRef, {
      user_id: userId,
      timestamp: serverTimestamp(),
    });

    revalidatePath("/berita");
    return {
      success: true,
      message: "Berita berhasil diberi like",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal memberi like pada berita",
    };
  }
}
