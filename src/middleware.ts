// import { type NextRequest, NextResponse } from "next/server";
// // import { isAuthenticated } from "@lib/auth";

// export const config = {
// 	matcher: "/api/:function*",
// };

// export function middleware(request: NextRequest) {
// 	if (!isAuthenticated(request)) {
// 		return new NextResponse(JSON.stringify({ success: false, message: "authentication failed" }), {
// 			status: 401,
// 			headers: { "content-type": "application/json" },
// 		});
// 	}
// }
// function isAuthenticated(_request: NextRequest) {
// 	return true;
// }

import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
// eslint-disable-next-line import/no-default-export
export default authMiddleware({
	// "/" will be accessible to all users
	publicRoutes: [
		"/",
		"/product/:id",
		"/products(.*)",
		"/categories(.*)",
		"/search(.*)",
		"/collections(.*)",
		"/cart(.*)",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
