"use server";

import { firestore } from "@/lib/firebase";
import { increment } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

export interface News {
  id?: string;
  title: string;
  author: string;
  content: string;
  likes: number;
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

export async function getNews() {
  try {
    const q = query(
      collection(firestore, "news"),
      orderBy("timestamp", "desc"),
    );
    const snapshot = await getDocs(q);

    return {
      success: true,
      message: "Berita berhasil diambil.",
      data: snapshot,
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
    const newsRef = doc(firestore, "news", id);
    const snapshot = await getDoc(newsRef);

    return {
      success: true,
      message: "Berita berhasil diambil",
      data: snapshot,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      messaage: "Gagal mengambil berita",
    };
  }
}

export async function likeNews(id: string) {
  try {
    const newsRef = doc(firestore, "news", id);

    await updateDoc(newsRef, {
      likes: increment(1),
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
