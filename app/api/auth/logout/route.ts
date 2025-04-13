import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json(
        { message: 'Logged out successfully' },
        { status: 200 }
    );

    // Clear the 'token' cookie
    response.cookies.set('token', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
        sameSite: 'strict',
    });

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
