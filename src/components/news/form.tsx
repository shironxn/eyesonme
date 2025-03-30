"use client";

import type React from "react";

import { createNews, News, updateNews } from "@/app/actions/news";
import EditorToolbar from "@/components/news/editor-toolbar";
import ImageUploader from "@/components/news/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Loader2Icon, UserIcon } from "lucide-react";
import { useState, useTransition } from "react";

const NEWS_CATEGORIES = ["pengumuman", "prestasi", "acara"];

export default function NewsForm({ data }: { data?: News }) {
  const { toast } = useToast();

  const [title, setTitle] = useState(data?.title || "");
  const [category, setCategory] = useState(data?.category || "");
  const [author, setAuthor] = useState(data?.author || "");
  const [images, setImages] = useState<string[]>(data?.images || []);
  const [isPending, startTransition] = useTransition();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Tulis konten disini...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: data?.content || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none",
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      if (!category) {
        toast({
          title: "Kategori tidak boleh kosong",
          description: "Silahkan pilih kategori berita.",
          variant: "destructive",
        });
        return;
      }

      if (images.length === 0) {
        toast({
          title: "Gambar tidak boleh kosong",
          description: "Minimal satu gambar harus diupload.",
          variant: "destructive",
        });
        return;
      }

      const content = editor?.getHTML();
      if (!content) return;

      let res;

      if (data) {
        res = await updateNews({
          ...data,
          title,
          author,
          category,
          content,
          images,
        });
      } else {
        res = await createNews({
          title,
          author,
          category,
          content,
          images,
          likes: 0,
        });
      }

      toast({
        title: res.message,
        description: res.details,
        variant: res.success ? "default" : "destructive",
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-2 space-y-6 md:space-y-0">
        <div className="space-y-2 flex-1">
          <Label htmlFor="title" className="text-base">
            Judul
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul berita"
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-base">
            Kategori
          </Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Pilih kategori berita" />
            </SelectTrigger>
            <SelectContent>
              {NEWS_CATEGORIES.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-base">Gambar</Label>
        <ImageUploader
          imageUrls={images}
          setImageUrlsAction={setImages}
          maxImages={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" className="text-base">
          Konten Berita
        </Label>
        <div className="border rounded-base overflow-hidden">
          <EditorToolbar editor={editor} />
          <div className="p-4">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center border-t border-bw pt-4 gap-2">
        <div className="flex items-center gap-2">
          <Label className="text-muted">
            <UserIcon size="18" />
          </Label>
          <Input
            placeholder="Masukkan nama author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-none bg-transparent text-mtext/80 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2Icon className="animate-spin mr-2" />}
          {data ? "Simpan" : "Tambah"}
        </Button>
      </div>
    </form>
  );
}
