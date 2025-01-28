"use server";

import { database } from "@/lib/firebase";
import { ref, push, serverTimestamp } from "firebase/database";

interface Response {
  success: boolean;
  message: string;
  details?: string;
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
      created_at: serverTimestamp(),
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
