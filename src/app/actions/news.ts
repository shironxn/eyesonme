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
  updateDoc,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface News {
  id?: string;
  title: string;
  content: string;
  images: string[];
  author: string;
  category: string;
  likes: number;
  timestamp?: string;
}

export async function createNews(data: News) {
  try {
    await addDoc(collection(firestore, "news"), {
      title: data.title.trim(),
      title_lower: data.title.toLowerCase().replace(/[^\w\s-]/g, ""),
      content: data.content.trim(),
      images: data.images,
      author: data.author || "Admin",
      category: data.category,
      likes: data.likes,
      timestamp: serverTimestamp(),
    });

    revalidatePath("/berita");
    return {
      success: true,
      message: "Berita berhasil dibuat!",
      details: "Beritamu sudah masuk dan bisa dilihat sekarang.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Terjadi kesalahan saat membuat berita.",
      details: "Silakan coba lagi nanti.",
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

    const data: News[] = await Promise.all(
      snapshot.docs.map(async (item) => {
        const likes = await getCountFromServer(
          collection(firestore, "news", item.id, "likes"),
        );

        return {
          id: item.id,
          title: item.data().title,
          content: item.data().content,
          images: item.data().images,
          author: item.data().author,
          category: item.data().category,
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
      data,
      totalPages: Math.ceil(totalDocuments / limitNews),
    };
  } catch (error) {
    console.error(error);
    throw new Error(
      "Terjadi kesalahan saat mengambil berita. Silakan coba lagi nanti.",
    );
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
    throw new Error(
      "Terjadi kesalahan saat mengambil berita. Silakan coba lagi nanti.",
    );
  }
}

export async function updateNews(data: News) {
  try {
    await updateDoc(doc(firestore, "news", data.id!), {
      title: data.title,
      title_lower: data.title.toLowerCase(),
      content: data.content,
      images: data.images,
      author: data.author,
      category: data.category,
    });

    revalidatePath("/berita");
    return {
      success: true,
      message: "Berita berhasil diubah!",
      details: "Beritamu sudah masuk dan bisa dilihat sekarang.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Terjadi kesalahan saat mengubah berita.",
      details: "Silakan coba lagi nanti.",
    };
  }
}

export async function deleteNews(newsId: string) {
  try {
    await deleteDoc(doc(firestore, "news", newsId));
  } catch (error) {
    console.error(error);
    return {
      message: "Terjadi kesalahan saat menghapus berita.",
      details: "Silakan coba lagi nanti.",
    };
  }

  redirect("/berita");
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
      };
    }

    await setDoc(docRef, {
      user_id: userId,
      timestamp: serverTimestamp(),
    });

    revalidatePath("/berita");
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menyukai berita.",
      details: "Silakan coba lagi nanti.",
    };
  }
}
