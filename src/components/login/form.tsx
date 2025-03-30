"use client";

import { Login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2Icon, LockKeyholeIcon, UserIcon } from "lucide-react";
import { useState, useTransition } from "react";

export function LoginForm() {
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await Login({
        username,
        password,
      });

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <UserIcon size={18} />
            </div>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              className="pl-10"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockKeyholeIcon size={18} />
            </div>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              className="pl-10"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Button size="lg" type="submit" disabled={isPending}>
        {isPending && <Loader2Icon className="animate-spin mr-2" />} Masuk
      </Button>
    </form>
  );
}
