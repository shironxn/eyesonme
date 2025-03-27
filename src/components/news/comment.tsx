"use client";

import {
  Comment,
  createComment,
  deleteComment,
  likeComment,
  updateComment,
} from "@/app/actions/comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { auth, firestore } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  EllipsisVerticalIcon,
  HeartIcon,
  Loader2Icon,
  SquarePenIcon,
  Trash2Icon,
} from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

const provider = new GoogleAuthProvider();

export function CommentForm({ newsId }: { newsId: string }) {
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error(error);
        toast({
          title: "Notifikasi",
          description: "Gagal masuk. Coba lagi nanti.",
          variant: "destructive",
        });
        return;
      }
    }

    startTransition(async () => {
      const res = await createComment({
        news_id: newsId,
        user_id: user?.uid || "",
        name: user?.displayName || "",
        avatar_url: user?.photoURL || "",
        content: comment,
        likes: 0,
      });

      toast({
        title: res.message,
        description: res.details,
        variant: res.success ? "default" : "destructive",
      });

      if (res.success) {
        setComment("");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Tulis komentar Anda di sini"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2Icon className="mr-2 animate-spin" />}
        Kirim
      </Button>
    </form>
  );
}

export function DisplayComment({ data }: { data: Comment }) {
  const { toast } = useToast();

  const [user, setUser] = useState(auth.currentUser);
  const [comment, setComment] = useState(data.content);
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const checkLike = async () => {
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
    };

    checkLike();
  }, [data, user]);

  const handleLike = useCallback(async () => {
    if (!user) {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error(error);
        toast({
          title: "Notifikasi",
          description: "Gagal masuk. Coba lagi nanti.",
          variant: "destructive",
        });
        return;
      }
    } else {
      const res = await likeComment(data.news_id, data.id!, user.uid);

      if (!res.success) {
        toast({
          title: res.message,
          description: res.details,
          variant: "destructive",
        });
      }
    }
  }, [data.news_id, data.id, user, toast]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await updateComment(data.news_id, data.id!, comment);

    toast({
      title: res.message,
      description: res.details,
      variant: res.success ? "default" : "destructive",
    });

    setIsEditing(false);
  };

  const handleDelete = async () => {
    const res = await deleteComment(data.news_id, data.id!);

    toast({
      title: res.message,
      description: res.details,
      variant: res.success ? "default" : "destructive",
    });
  };

  return (
    <div className="relative grid grid-cols-[auto,1fr] gap-4 rounded-base border-2 bg-bg px-6 py-4">
      <Avatar>
        <AvatarImage src={data.avatar_url} alt={data.name} />
        <AvatarFallback>{data.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      {!isEditing ? (
        <div className="flex flex-col">
          <p className="text-base font-medium text-muted">{data.name}</p>
          <p className="text-sm">{data.content}</p>

          <div className="mt-3 flex items-center gap-2 text-muted text-xs">
            <HeartIcon
              fill={isLiked ? "#f43f5e" : "none"}
              className={`h-4 w-4 cursor-pointer transition-colors ${
                isLiked ? "text-red-500" : "hover:text-red-500"
              }`}
              onClick={handleLike}
            />
            <span>{data.likes}</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col gap-2 w-full">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px] text-sm"
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="neutral"
              onClick={() => {
                setIsEditing(false);
                setComment(data.content);
              }}
            >
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      )}

      {!isEditing && data.user_id === user?.uid && (
        <div className="absolute right-4 top-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted"
              >
                <EllipsisVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <SquarePenIcon className="mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <Trash2Icon className="mr-2" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
