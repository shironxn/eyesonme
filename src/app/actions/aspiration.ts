"use server";

import { database } from "@/lib/firebase";
import { push, ref, serverTimestamp } from "firebase/database";
import { revalidatePath } from "next/cache";

export async function createAspiration(data: string) {
  try {
    if (!data.trim()) {
      return {
        success: false,
        message: "Oops! Aspirasi tidak boleh kosong.",
        details: "Yuk, tulis sesuatu dulu sebelum mengirim.",
      };
    }

    await push(ref(database, "aspiration"), {
      message: data.trim(),
      timestamp: serverTimestamp(),
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Aspirasi kamu sudah terkirim!",
      details: "Terima kasih sudah berbagi pendapat.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Terjadi kesalahan saat mengirim komentar",
      details: "Silakan coba lagi nanti.",
    };
  }
}
