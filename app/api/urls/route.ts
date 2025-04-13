import connectToDatabase from "@/lib/mongodb";
import Url from "@/models/Url";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { nanoid } from "nanoid";
export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const decoded = await verifyToken(request);
        console.log(decoded)
        // return NextResponse.json({
        //     msg:"hjskdfhjsdf"
        // })
        const { originalUrl,customCode, expiresAt } = await request.json();
        console.log(originalUrl, customCode, expiresAt)
        // // Validate input
        if (!originalUrl) {
            return NextResponse.json(
                { error: 'Original URL is required' },
                { status: 400 }
            );
        }

        // // Basic URL validation
        try {
            new URL(originalUrl);
        } catch {
            return NextResponse.json(
                { error: 'Invalid URL format' },
                { status: 400 }
            );
        }

        // // Generate or use custom short code
        let shortCode = customCode || nanoid(6);
        if (customCode) {
            const existingUrl = await Url.findOne({ shortCode: customCode });
            if (existingUrl) {
                return NextResponse.json(
                    { error: 'Custom code already in use' },
                    { status: 400 }
                );
            }
        }

        // // Validate expiresAt if provided
        let expiryDate = null;
        if (expiresAt) {
            expiryDate = new Date(expiresAt);
            if (isNaN(expiryDate.getTime())) {
                return NextResponse.json(
                    { error: 'Invalid expiration date' },
                    { status: 400 }
                );
            }
        }

        // // Create URL document
        const url = new Url({
            originalUrl,
            shortCode,
            userId: decoded.userId,
            expiresAt: expiryDate,
        });
        await url.save();

        return NextResponse.json(
            {
                message: 'URL created',
                url: {
                    id: url._id,
                    originalUrl: url.originalUrl,
                    shortCode: url.shortCode,
                    expiresAt: url.expiresAt,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create URL error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            {
                status: error.message?.includes('token') ? 401 : 500,
            }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const decoded = await verifyToken(request);

        // Fetch user's URLs
        const urls = await Url.find({ userId: decoded.userId }).select(
            'originalUrl shortCode createdAt expiresAt clickCount'
        );

        return NextResponse.json({ urls }, { status: 200 });
    } catch (error: any) {
        console.error('Get URLs error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            {
                status: error.message?.includes('token') ? 401 : 500,
            }
        );
    }
}
