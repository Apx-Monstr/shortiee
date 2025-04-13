import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable in .env.local');
}

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        // Get token from cookie
        const cookieHeader = request.headers.get('cookie');
        let token = null;
        if (cookieHeader) {
            const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
                const [name, value] = cookie.trim().split('=');
                acc[name] = value;
                return acc;
            }, {} as Record<string, string>);
            token = cookies.token;
        }

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        // Fetch user
        const user = await User.findById(decoded.userId).select('email name');
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 401 }
        );
    }
}
