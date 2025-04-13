import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(request: NextRequest){
    try{
        await connectToDatabase();
        const body = await request.json();
        const { email, password } = body;
        console.log(email, password)
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                {
                    error:"Invalid Email or Password"
                },
                {status:401}
            )
        }
        if (user.password !== password) {
            return NextResponse.json(
                {
                    error:"Incorrect Password"
                },
                {status:401}
            )
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
        });
        const response = NextResponse.json(
            {
              user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
            },
            { status: 200 }
        );
      
        response.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60, // 1 hour
            sameSite: 'strict',
        });
        return response;
    }catch (error){
        console.log("An Error Occured in route", error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}