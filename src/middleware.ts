import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  debug: true,
  publicRoutes: ["/", "/question", "/rocket", "/api/uploadthing", "/api/user"]
});

// export default authMiddleware({
//     debug: true,
//     publicRoutes: [
//         "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"
//     ]
// });

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
