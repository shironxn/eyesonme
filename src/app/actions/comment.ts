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
      return {
        success: false,
        message: "Oops! Komentar tidak boleh kosong.",
        details: "Yuk, tulis sesuatu dulu sebelum mengirim.",
      };
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
      message: "Komentar berhasil dikirim!",
      details: "Komentarmu sudah masuk dan bisa dilihat sekarang.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Terjadi kesalahan saat mengirim komentar.",
      details: "Silakan coba lagi nanti.",
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
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Terjadi kesalahan saat mengambil komentar",
      details: "Silakan coba lagi nanti.",
    };
  }
}

export async function updateComment(
  newsId: string,
  commentId: string,
  content: string,
) {
  try {
    if (!content.trim()) {
      return {
        success: false,
        message: "Oops! Komentar tidak boleh kosong.",
        details: "Pastikan kamu menulis sesuatu sebelum menyimpan perubahan.",
      };
    }

    const docRef = doc(
      collection(firestore, "news", newsId, "comments"),
      commentId,
    );

    await updateDoc(docRef, { content });

    revalidatePath("/berita");
    return {
      success: true,
      message: "Komentar berhasil diperbarui!",
      details: "Perubahan sudah tersimpan dan bisa dilihat sekarang.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Terjadi kesalahan saat mengubah komentar.",
      details: "Silakan coba lagi nanti.",
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
      message: "Komentar berhasil dihapus!",
      details: "Komentarmu sudah terhapus dan tidak bisa dilihat lagi.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Terjadi kesalahan saat menghapus komentar.",
      details: "Silakan coba lagi nanti.",
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
      message: "Terjadi kesalahan saat memberi like pada komentar.",
      details: "Silakan coba lagi nanti.",
    };
  }
}
