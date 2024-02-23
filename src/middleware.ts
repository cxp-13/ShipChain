import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    debug: true,
    publicRoutes: [
        '/',
        '/orders/:userId/:orderId',
        '/question',
        '/rocket'
    ],
    ignoredRoutes: []
});

// export default authMiddleware({});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};