import { type NextRequest, NextResponse } from "next/server";
// import { isAuthenticated } from "@lib/auth";

export const config = {
	matcher: "/api/:function*",
};

export function middleware(request: NextRequest) {
	if (!isAuthenticated(request)) {
		return new NextResponse(JSON.stringify({ success: false, message: "authentication failed" }), {
			status: 401,
			headers: { "content-type": "application/json" },
		});
	}
}
function isAuthenticated(_request: NextRequest) {
	return true;
}
