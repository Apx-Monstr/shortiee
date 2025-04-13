import { connectToDatabase } from '../../../../../lib/mongodb';
import { verifyToken } from '../../../../../lib/auth';
import Url from '../../../../../models/Url';
import Click from '../../../../../models/Click';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { shortCode: string } }) {
    try {
        await connectToDatabase();
        const decoded = await verifyToken(request);
        const { shortCode } = params;

        // Find URL
        const url = await Url.findOne({ shortCode, userId: decoded.userId });
        if (!url) {
            return NextResponse.json(
                { error: 'URL not found' },
                { status: 404 }
            );
        }

        // Fetch clicks
        const clicks = await Click.find({ urlId: url._id }).select(
            'timestamp ip userAgent browser device os country city referrer'
        );

        return NextResponse.json({ clicks }, { status: 200 });
    } catch (error: any) {
        console.error('Get clicks error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            {
                status: error.message?.includes('token') ? 401 : 500,
            }
        );
    }
}