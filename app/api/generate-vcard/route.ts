import { NextResponse } from "next/server";
import vCardsJS from "vcards-js";

interface VCardData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  websiteUrl: string;
}

export async function POST(request: Request) {
  try {
    const body: VCardData = await request.json();

    

    return NextResponse.json({ vCardString });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }
}
