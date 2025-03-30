"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, ImagePlus, PlusIcon, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  imageUrls: string[];
  setImageUrlsAction: React.Dispatch<React.SetStateAction<string[]>>;
  maxImages?: number;
}

export default function ImageUploader({
  imageUrls,
  setImageUrlsAction,
  maxImages = 10,
}: Props) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);

      return true;
    } catch (error) {
      console.error(error);
      setError("URL tidak valid");
      return false;
    }
  };

  const addImageUrl = () => {
    setError(null);
    if (!currentUrl.trim()) {
      setError("URL tidak boleh kosong");
      return;
    }

    if (imageUrls.length >= maxImages) {
      setError(`Maksimal ${maxImages} gambar yang diperbolehkan`);
      return;
    }

    if (imageUrls.includes(currentUrl)) {
      setError("URL gambar ini sudah ditambahkan");
      return;
    }

    if (validateUrl(currentUrl)) {
      setImageUrlsAction([...imageUrls, currentUrl]);
      setCurrentUrl("");
    }
  };

  const removeImageUrl = (index: number) => {
    setImageUrlsAction(imageUrls.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addImageUrl();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Masukkan URL gambar"
          className="flex-1"
        />
        <Button
          variant="noShadow"
          size="icon"
          type="button"
          className="bg-accent"
          onClick={addImageUrl}
        >
          <PlusIcon />
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {imageUrls.length === 0 && (
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <ImagePlus className="h-10 w-10 text-gray-400" />
            <p className="text-sm font-medium">Belum ada gambar</p>

            <p className="text-xs text-muted">
              <span className="text-red-600">*</span> Minimal 1 gambar
              diperlukan (Maks. {maxImages} gambar)
            </p>
          </div>
        </div>
      )}

      {imageUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-md overflow-hidden border bg-gray-100">
                <Image
                  src={url}
                  alt={`Gambar ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImageUrl(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Hapus gambar"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="text-xs mt-1 truncate">{url.split("/").pop()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
