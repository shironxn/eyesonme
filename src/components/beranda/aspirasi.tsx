"use client";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useTransition } from "react";
import { createAspirasi } from "@/app/actions";
import { Loader2Icon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function FormAspirasi() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      if (message.trim() === "") {
        return;
      }

      const response = await createAspirasi(message);

      if (response) {
        toast({
          title: response.message,
          description: response.details,
          variant: response.success ? "default" : "destructive",
        });
      }

      if (response.success) {
        setMessage("");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        name="message"
        placeholder="Tulis aspirasi kamu di sini"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2Icon className="animate-spin mr-2" />} Kirim
      </Button>
    </form>
  );
}
