"use client";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useTransition } from "react";
import { createAspirasi } from "@/app/actions";
import { Loader2Icon } from "lucide-react";

export function FormAspirasi() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      if (message.trim() === "") {
        return;
      }

      await createAspirasi(message);
      setMessage("");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        id="message"
        name="message"
        placeholder="Contoh: aku mw makan siang gratis"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2Icon className="animate-spin" />} Kirim
      </Button>
    </form>
  );
}
