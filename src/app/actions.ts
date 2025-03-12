"use server";

import { database, firestore } from "@/lib/firebase";
import {
  ref,
  push,
  serverTimestamp as databaseTimestamp,
} from "firebase/database";
import {
  collection,
  addDoc,
  updateDoc,
  query,
  serverTimestamp as firestoreTimestamp,
  increment,
  doc,
  orderBy,
  getDocs,
} from "firebase/firestore";

interface Response {
  success: boolean;
  message: string;
  details?: string;
}

interface News {
  title: string;
  author: string;
  content: string;
  likes: number;
}

interface Comment {
  news_id: string;
  user_id: string;
  content: string;
}

export async function createAspirasi(message: string): Promise<Response> {
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return {
      success: false,
      message: "Gagal mengirim aspirasi.",
      details: "Pesan tidak boleh kosong dan harus berupa teks.",
    };
  }

  try {
    const dbRef = ref(database, "aspirasi");

    await push(dbRef, {
      message: message.trim(),
      timestamp: databaseTimestamp(),
    });

    return {
      success: true,
      message: "Aspirasi berhasil dikirim.",
      details: "Terima kasih atas masukannya!",
    };
  } catch (error) {
    console.error("Gagal membuat aspirasi:", error);

    return {
      success: false,
      message: "Gagal mengirim aspirasi.",
      details: "Terjadi kesalahan pada server, coba lagi nanti.",
    };
  }
}

export async function createNews(data: News) {
  try {
    await addDoc(collection(firestore, "news"), {
      title: data.title,
      author: data.author,
      content: data.content,
      likes: 0,
      timestamp: firestoreTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getNews() {
  return await getDocs(collection(firestore, "news"));
}

export async function likeNews(id: string) {
  const dbRef = doc(firestore, "news", id);
  await updateDoc(dbRef, {
    likes: increment(1),
  });
}

export async function createComment(data: Comment) {
  try {
    await addDoc(collection(firestore, "news", data.news_id, "comments"), {
      user_id: data.user_id,
      content: data.content,
      timestamp: firestoreTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getComments(newsId: string) {
  const q = query(
    collection(firestore, "news", newsId, "comments"),
    orderBy("timestamp", "asc"),
  );
  return await getDocs(q);
}
