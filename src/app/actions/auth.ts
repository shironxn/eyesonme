"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export interface User {
  username: string;
  password: string;
}

export async function Login(data: User) {
  try {
    const { username, password } = data;

    if (!username || !password) {
      return {
        message: "Terjadi kesalahan saat login.",
        details: "Pastikan username dan password Anda sudah benar.",
      };
    }

    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
  } catch (error) {
    console.error(error);

    return {
      message: "Terjadi kesalahan saat login.",
      details: "Silakan coba lagi nanti.",
    };
  }

  redirect("/");
}
