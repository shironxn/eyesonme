"use client";

import { likeNews } from "@/app/actions/news";
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
import { HeartIcon, Share2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      title: "Link berhasil disalin",
      description: "Silahkan kirimkan link ke teman-teman",
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
