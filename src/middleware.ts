import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    debug: true,
    publicRoutes: [
        '/',
        '/orders/:userId/:orderId',
        '/question',
        '/rocket',
        '/api/uploadthing'
    ],
    ignoredRoutes: ['/api/uploadthing']
});

// export default authMiddleware({});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};