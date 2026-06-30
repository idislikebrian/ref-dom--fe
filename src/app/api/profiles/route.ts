import { NextResponse } from "next/server";
import { getProfileDirectory } from "../../../data/profiles";

export const dynamic = "force-dynamic";

export async function GET() {
  const directory = await getProfileDirectory();

  return NextResponse.json(directory);
}
