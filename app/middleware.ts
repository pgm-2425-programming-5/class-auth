// middleware.ts

import { withAuth } from "next-auth/middleware";

export default withAuth(
  // Default handler
  function middleware(req) {
    // You can add custom logic here if needed
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Protect all routes under /dashboard
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

// Specify the matcher for protected routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
