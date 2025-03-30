"use client";

import { deleteNews, likeNews } from "@/app/actions/news";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { auth, firestore } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  HeartIcon,
  Loader2Icon,
  Share2Icon,
  SquarePenIcon,
  TrashIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

const provider = new GoogleAuthProvider();

export function LikeNews({ newsId, likes }: { newsId: string; likes: number }) {
  const { toast } = useToast();

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

  const handleLike = useCallback(async () => {
    if (!user) {
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error(error);
        toast({
          title: "Gagal masuk.",
          description: "Coba cek koneksi atau ulangi beberapa saat lagi.",
          variant: "destructive",
        });
        return;
      }
    } else {
      const res = await likeNews(newsId, user.uid);

      if (res.success) {
        setIsLiked(!isLiked);
      } else {
        toast({
          title: res.message,
          description: res.details,
          variant: "destructive",
        });
      }
    }
  }, [newsId, isLiked, user, toast]);

  return (
    <Button variant="accent" onClick={() => handleLike()}>
      <HeartIcon fill={isLiked ? "#11001c" : "none"} />
      {likes}
    </Button>
  );
}

export function ShareNews({ title }: { title: string }) {
  const path = usePathname();
  const { toast } = useToast();
  const text = encodeURIComponent(`
*${title}*

Klik link berikut untuk membaca artikel ini:\n`);

  const [url, setUrl] = useState("");

  const links = [
    {
      name: "Whatsapp",
      icon: "/icons/whatsapp.svg",
      href: `https://wa.me/?text=${text}%20${url}`,
    },
    {
      name: "X",
      icon: "/icons/x.svg",
      href: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    },
    {
      name: "Facebook",
      icon: "/icons/facebook.svg",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: "Telegram",
      icon: "/icons/telegram.svg",
      href: `https://t.me/share/url?url=${url}&text=${text}`,
    },
  ];

  useEffect(() => {
    const fullUrl = `${window.location.origin}${path}`;
    setUrl(fullUrl);
  }, [path]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);

    toast({
      title: "Berhasil disalin",
      description: "Tautan artikel berhasil disalin ke clipboard",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="neutral">
          <Share2Icon /> Bagikan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bagikan Artikel</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-center sm:justify-start gap-4">
          {links.map((item, index) => (
            <Link key={index} href={item.href} target="_blank">
              <Button variant="ghost" size="icon">
                <Image src={item.icon} alt={item.name} width={24} height={24} />
              </Button>
            </Link>
          ))}
          <Button variant="ghost" size="icon">
            <Image
              src="/icons/copy.svg"
              alt="Copy Link"
              width={24}
              height={24}
              onClick={handleCopy}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateNews({ newsId }: { newsId: string }) {
  const router = useRouter();

  const handleUpdate = () => {
    router.push("/berita/edit/" + newsId);
  };

  return (
    <Button size="icon" className="bg-main" onClick={() => handleUpdate()}>
      <SquarePenIcon />
    </Button>
  );
}

export function DeleteNews({ newsId }: { newsId: string }) {
  const { toast } = useToast();

  const [isLoading, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const res = await deleteNews(newsId);

      if (res) {
        toast({
          title: res.message,
          description: res.details,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          disabled={isLoading}
          size="icon"
          variant="destructive"
          className="bg-red-600"
        >
          {isLoading ? <Loader2Icon className="animate-spin" /> : <TrashIcon />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Artikel yang telah dihapus tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete()}
            className="bg-destructive text-white"
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
