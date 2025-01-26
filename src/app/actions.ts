"use server";

import { database } from "@/lib/firebase";
import { ref, push, serverTimestamp } from "firebase/database";

export async function createAspirasi(message: string) {
  try {
    const dbRef = ref(database, "aspirasi");

    const response = await push(dbRef, {
      message: message.trim(),
      created_at: serverTimestamp(),
    });

    console.log("Aspirasi berhasil ditambahkan dengan ID:", response.key);
    return response.key;
  } catch (error) {
    console.error("Gagal menambahkan aspirasi:", error);
    throw new Error("Gagal menambahkan aspirasi, coba lagi nanti.");
  }
}
