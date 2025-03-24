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
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

export interface Comment {
  id?: string;
  news_id: string;
  user_id: string;
  name: string;
  avatar_url: string;
  content: string;
  likes: number;
  timestamp?: string;
}

export async function createComment(data: Comment) {
  try {
    if (!data.news_id.trim() || !data.user_id.trim() || !data.content.trim()) {
      return { success: false, message: "Gagal mengirim komentar." };
    }

    await addDoc(collection(firestore, "news", data.news_id, "comments"), {
      user_id: data.user_id,
      name: data.name,
      avatar_url: data.avatar_url,
      content: data.content.trim(),
      timestamp: serverTimestamp(),
    });

    revalidatePath("/berita");
    return {
      success: true,
      message: "Komentar berhasil dikirim.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal mengirim komentar.",
    };
  }
}

export async function getComments(newsId: string) {
  try {
    const q = query(
      collection(firestore, "news", newsId, "comments"),
      orderBy("timestamp", "asc"),
    );
    const snapshot = await getDocs(q);

    const data = await Promise.all(
      snapshot.docs.map(async (item) => {
        const likes = await getCountFromServer(
          collection(firestore, "news", newsId, "comments", item.id, "likes"),
        );

        return {
          ...item.data(),
          id: item.id,
          news_id: newsId,
          likes: likes.data().count,
        };
      }),
    );

    return {
      success: true,
      message: "Komentar berhasil diambil",
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal mengambil komentar.",
    };
  }
}

export async function updateComment(
  newsId: string,
  commentId: string,
  content: string,
) {
  try {
    const docRef = doc(
      collection(firestore, "news", newsId, "comments"),
      commentId,
    );

    await updateDoc(docRef, { content });

    revalidatePath("/berita");
    return {
      success: true,
      message: "Komentar berhasil diubah.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal menghapus komentar.",
    };
  }
}

export async function deleteComment(newsId: string, commentId: string) {
  try {
    const docRef = doc(
      collection(firestore, "news", newsId, "comments"),
      commentId,
    );
    await deleteDoc(docRef);

    revalidatePath("/berita");
    return {
      success: true,
      message: "Komentar berhasil dihapus",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal menghapus komentar",
    };
  }
}

export async function likeComment(
  newsId: string,
  commentId: string,
  userId: string,
) {
  try {
    const docRef = doc(
      firestore,
      "news",
      newsId,
      "comments",
      commentId,
      "likes",
      userId,
    );

    const like = await getDoc(docRef);
    if (like.exists()) {
      await deleteDoc(docRef);

      revalidatePath("/berita");
      return {
        success: true,
        message: "Komentar berhasil dihapus like",
      };
    }

    await setDoc(docRef, {
      user_id: userId,
      timestamp: serverTimestamp(),
    });

    revalidatePath("/berita");
    return {
      success: true,
      message: "Komentar berhasil diberi like",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal memberi like pada komentar",
    };
  }
}
