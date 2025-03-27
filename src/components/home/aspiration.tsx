"use client";

import { createAspiration } from "@/app/actions/aspiration";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2Icon } from "lucide-react";
import { useState, useTransition } from "react";

export function FormAspiration() {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      const response = await createAspiration(message);

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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2Icon className="animate-spin mr-2" />} Kirim
      </Button>
    </form>
  );
}
