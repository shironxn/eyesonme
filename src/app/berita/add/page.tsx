import NewsForm from "@/components/news/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen space-y-8 py-12 md:py-24">
      <Card className="w-full max-w-xl">
        <CardHeader className="bg-bw">
          <CardTitle className="text-3xl">Tambah Berita</CardTitle>
          <CardDescription>Silakan isi form di bawah ini</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="mt-8">
          <NewsForm />
        </CardContent>
      </Card>
    </div>
  );
}
