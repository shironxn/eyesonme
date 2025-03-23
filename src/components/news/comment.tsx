"use client";

import { Comment, createComment, likeComment } from "@/app/actions/comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { auth, firestore } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { EllipsisVerticalIcon, HeartIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

const provider = new GoogleAuthProvider();

export function CommentForm({ newsId }: { newsId: string }) {
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error(error);
        return;
      }
    }

    startTransition(async () => {
      const response = await createComment({
        news_id: newsId,
        user_id: user?.uid || "",
        name: user?.displayName || "",
        avatar_url: user?.photoURL || "",
        content: comment,
        likes: 0,
      });

      if (response) {
        toast({
          title: "Notifikasi",
          description: response.message,
          variant: response.success ? "default" : "destructive",
        });
      }

      if (response.success) {
        setComment("");
      }
    });
  }

  return (
    <form className="space-y-8 col-span-4" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Textarea
          placeholder="Tulis komentar Anda disini"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2Icon className="animate-spin mr-2" />} Kirim
        </Button>
      </div>
    </form>
  );
}

export function DisplayComment({ data }: { data: Comment }) {
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
        doc(
          firestore,
          "news",
          data.news_id,
          "comments",
          data.id!,
          "likes",
          user?.uid || "",
        ),
      );

      setIsLiked(like.exists());
    }

    checkLike();
  }, [data, user]);

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
      await likeComment(data.news_id, data.id!, user.uid);
    }
  }

  return (
    <div className="relative flex items-start gap-4 rounded-md border border-border bg-white p-4 shadow-sm">
      <Avatar>
        <AvatarImage src={data.avatar_url} alt={data.name} />
        <AvatarFallback>{data.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <p className="text-sm font-medium text-mtext">{data.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{data.content}</p>

        <div className="mt-2 flex gap-2 items-center text-muted-foreground">
          <HeartIcon
            fill={isLiked ? "#f43f5e" : "none"}
            className={`h-4 w-4 cursor-pointer transition-colors ${
              isLiked ? "text-red-500" : "hover:text-red-500"
            }`}
            onClick={() => handleLike()}
          />
          <span className="text-xs">{data.likes}</span>
        </div>
      </div>

      <div className="absolute right-4 top-4">
        <Button size="icon" variant="ghost" aria-label="More options">
          <EllipsisVerticalIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
