import { LoginForm } from "@/components/login/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Page() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12 md:py-24">
      <Card className="w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center justify-center p-8 md:w-2/5 bg-bw">
            <div className="relative w-64 h-64">
              <Image
                src="/login/lock.svg"
                alt="Lock"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="md:w-3/5 md:p-2">
            <CardHeader>
              <CardTitle className="text-3xl">Welcome!</CardTitle>
              <CardDescription className="text-base text-muted">
                Silakan login menggunakan akun yang kamu miliki.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
