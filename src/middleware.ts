import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Routes } from "./constants/enums";

export default withAuth(
  async function middleware(req: NextRequest) {
    const isAuth = await getToken({ req });
    const pathname = req.nextUrl.pathname;
    const isAuthPage = pathname.startsWith(`/${Routes.AUTH}`);
    const protectedRoutes = [Routes.ADMIN];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(`/${route}`)
    );

    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL(`${Routes.ROOT}`, req.url));
    }
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL(`${Routes.ROOT}`, req.url));
    }

    if (isAuth && pathname.startsWith(`/${Routes.ADMIN}`)) {
      const role = isAuth.role;
      if (role !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL(`/${Routes.ROOT}`, req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
