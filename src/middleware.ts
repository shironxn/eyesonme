import { auth } from "@/lib/auth";

export default auth((req) => {
  if (req.auth && req.nextUrl.pathname === "/login") {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (!req.auth && req.nextUrl.pathname.includes("/berita")) {
    if (
      req.nextUrl.pathname.includes("/add") ||
      req.nextUrl.pathname.includes("/edit")
    ) {
      const newUrl = new URL("/login", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
});

export const config = {
  matcher: ["/login/:path*", "/berita/:path*"],
};
