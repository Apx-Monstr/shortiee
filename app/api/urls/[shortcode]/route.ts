import connectToDatabase from '@/lib/mongodb';
import Url from '@/models/Url';
import Click from '@/models/Click';
import { NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';
import jwt from 'jsonwebtoken';
import { verifyToken } from '@/lib/auth';
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { shortcode } = params;

    // Find URL
    const url = await Url.findOne({ shortCode: shortcode });
    if (!url) {
      return NextResponse.redirect('/404', 302);
    }

    // Check expiration
    if (url.expiresAt && new Date() > url.expiresAt) {
      return NextResponse.redirect('/expired', 302);
    }

    // Get JWT from cookies
    const cookies = request.headers.get('cookie') || '';
    let userIdFromCookie = null;
    
    try {
      const cookieArray = cookies.split(';').map(cookie => cookie.trim());
      const jwtCookie = cookieArray.find(cookie => cookie.startsWith('token='));
      
      if (jwtCookie) {
        const token = jwtCookie.split('=')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in .env
        userIdFromCookie = decoded.userId; // Assuming the JWT payload has userId
      }
    } catch (jwtError) {
      console.error('JWT processing error:', jwtError);
      // Continue without userId if JWT is invalid or expired
    }

    // Parse user agent
    const uaString = request.headers.get('user-agent') || '';
    const parser = new UAParser(uaString);
    const uaResult = parser.getResult();

    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    // Fetch geo data
    let geo = { country_name: null, city: null };
    try {
      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`, {
        headers: { 'User-Agent': 'YourAppName/1.0' },
      });
      if (geoResponse.ok) {
        geo = await geoResponse.json();
      }
    } catch (geoError) {
      console.error('Geo lookup failed:', geoError);
    }

    // Get referrer
    const referrer = request.headers.get('referer') || null;

    // Check if click should be recorded
    const shouldRecordClick = !userIdFromCookie || userIdFromCookie !== url.userId?.toString();

    if (shouldRecordClick) {
      // Create click record
      const click = new Click({
        urlId: url._id,
        ip,
        userAgent: uaString,
        browser: uaResult.browser.name || 'unknown',
        device: uaResult.device.type || 'desktop',
        os: uaResult.os.name || 'unknown',
        country: geo.country_name || null,
        city: geo.city || null,
        referrer,
        userId: userIdFromCookie, // Optional: store userId in click if present
      });
      await click.save();

      // Increment click count
      url.clickCount += 1;
      await url.save();
    }

    // Redirect to original URL
    return NextResponse.redirect(url.originalUrl, 301);
  } catch (error) {
    console.error('Redirect error:', error);
    return NextResponse.redirect('/error?message=Internal server error', 302);
  }
}


export async function DELETE(request: NextRequest, { params }: { params: { shortcode: string } }) {
    try {
        await connectToDatabase();
        const decoded = await verifyToken(request);

        const shortcode = params.shortcode;
        // Ensure shortCode param exists
        if (!shortcode) {
            return NextResponse.json(
                { error: 'Short code is required' },
                { status: 400 }
            );
        }

        // Find and delete the URL document belonging to the authenticated user
        const deletedUrl = await Url.findOneAndDelete({
            shortCode:shortcode,
            userId: decoded.userId,
        });

        if (!deletedUrl) {
            return NextResponse.json(
                { error: 'URL not found or unauthorized' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'URL deleted successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Delete URL error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            {
                status: error.message?.includes('token') ? 401 : 500,
            }
        );
    }
}
