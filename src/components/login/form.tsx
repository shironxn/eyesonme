"use client";

import { Login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LockKeyhole, User } from "lucide-react";

export function LoginForm() {
  const { toast } = useToast();

  const handleLogin = async (formData: FormData) => {
    const res = await Login(formData);

    if (res) {
      toast({
        title: res.message,
        description: res.details,
        variant: "destructive",
      });
    }
  };

  return (
    <form action={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <User size={18} />
          </div>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <LockKeyhole size={18} />
          </div>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button className="w-full mt-6 bg-main hover:bg-main/90" type="submit">
        Masuk
      </Button>
    </form>
  );
}
