"use server";

import { firestore } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
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
      likes: data.likes,
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

    return {
      success: true,
      message: "Komentar berhasil diambil",
      data: snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id, news_id: newsId };
      }),
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

    return {
      success: false,
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

export async function likeComment(newsId: string, commentId: string) {
  try {
    const docRef = doc(firestore, "news", newsId, "comments", commentId);
    await updateDoc(docRef, { likes: increment(1) });

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
