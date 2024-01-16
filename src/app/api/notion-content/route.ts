import { NextResponse } from "next/server";

import { getPosts } from "@/infrastructure/blog";

export async function GET(req: Request) {
  return NextResponse.json(await getPosts());
}
