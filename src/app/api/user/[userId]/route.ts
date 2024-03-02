import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient, currentUser } from "@clerk/nextjs";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  console.log("params", params.userId);
//   let curUser = await currentUser();
  const originUser = await clerkClient.users.getUser(params.userId);
  console.log("originUser", originUser);
  return NextResponse.json(originUser);
}
