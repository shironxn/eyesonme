"use server";

import { database } from "@/lib/firebase";
import { push, ref, serverTimestamp } from "firebase/database";
import { revalidatePath } from "next/cache";

export async function createAspiration(data: string) {
  try {
    if (!data.trim()) {
      return { success: false, message: "Gagal mengirim aspirasi" };
    }

    await push(ref(database, "aspiration"), {
      message: data.trim(),
      timestamp: serverTimestamp(),
    });

    revalidatePath("/");
    return {
      success: true,
      message: "Aspirasi berhasil dikirim",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal mengirim aspirasi",
    };
  }
}
