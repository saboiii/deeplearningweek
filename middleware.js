import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPrivateRoute = createRouteMatcher(["/game(.*)"]);
const isSubmitRoute = createRouteMatcher(["/api/submit(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isSubmitRoute(request)) {
    const isRegistrationOpen = process.env.NEXT_PUBLIC_VERSION === "1.0.0";
    if (!isRegistrationOpen) {
      return new NextResponse(null, { status: 404 });
    }
  }

  if (isPrivateRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
