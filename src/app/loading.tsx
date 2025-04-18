import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-main" width={40} height={40} />
    </div>
  );
}
