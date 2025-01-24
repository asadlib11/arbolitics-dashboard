import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location_id = Number(10);
    const limit = Number(searchParams.get("limit"));
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    const response = await axios.get(
      "https://staging-api.arbolitics.com/data/getArboliticsDataset",
      {
        data: {
          location_id: location_id,
          limit: limit,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(response.data.data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
