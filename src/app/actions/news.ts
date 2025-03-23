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
  serverTimestamp,
  setDoc,
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

export async function getNews(limitNews?: number) {
  try {
    const q = query(
      collection(firestore, "news"),
      orderBy("timestamp", "desc"),
      ...(limitNews ? [limit(limitNews)] : []),
    );
    const snapshot = await getDocs(q);

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
