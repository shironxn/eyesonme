"use client";

import { likeNews } from "@/app/actions/news";
import { Button } from "@/components/ui/button";
import { auth, firestore } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { HeartIcon, Share2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const provider = new GoogleAuthProvider();

export function LikeNews({ newsId, likes }: { newsId: string; likes: number }) {
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    async function checkLike() {
      const like = await getDoc(
        doc(firestore, "news", newsId, "likes", user?.uid || ""),
      );

      setIsLiked(like.exists());
    }

    checkLike();
  }, [newsId, user]);

  async function handleLike() {
    const user = auth.currentUser;
    if (!user) {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error(error);
        return;
      }
    } else {
      await likeNews(newsId, user.uid);
      setIsLiked(!isLiked);
    }
  }

  return (
    <Button onClick={() => handleLike()}>
      <HeartIcon fill={isLiked ? "#11001c" : "none"} />
      {likes}
    </Button>
  );
}

export function ShareNews() {
  return (
    <Button variant={"neutral"}>
      <Share2Icon /> Bagikan
    </Button>
  );
}
