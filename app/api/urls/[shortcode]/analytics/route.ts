import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb"; // assuming you have a utility for DB connection
import Url from "@/models/Url";
import Click from "@/models/Click";

export const GET = async (req: NextRequest, { params }: { params: { shortcode: string } }) => {
  const { shortcode } = params;

  await connectToDatabase();

  try {
    // Find the URL by shortcode
    const urlDoc = await Url.findOne({ shortCode: shortcode });

    if (!urlDoc) {
      return NextResponse.json(
        { message: "URL not found for this shortcode." },
        { status: 404 }
      );
    }

    // Fetch click data for this URL
    const clicks = await Click.find({ urlId: urlDoc._id }).sort({ timestamp: -1 });

    // Map click data to required fields
    // const clickData = clicks.map(click => ({
    //   timestamp: click.timestamp,
    //   referrer: click.referrer || "Direct",
    //   country: click.country || "Unknown",
    //   city: click.city || "Unknown"
    // }));

    // Construct analytics response
    const analytics = {
      shortCode: urlDoc.shortCode,
      originalUrl: urlDoc.originalUrl,
      clickCount: urlDoc.clickCount,
      createdAt: urlDoc.createdAt,
      expiresAt: urlDoc.expiresAt,
      clicks: clicks
    };

    return NextResponse.json(analytics, { status: 200 });
  } catch (error) {
    console.error("[ANALYTICS_API_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to fetch analytics data.", error },
      { status: 500 }
    );
  }
};
