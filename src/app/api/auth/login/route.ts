import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await axios.post(
      "https://staging-api.arbolitics.com/auth/login",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}
