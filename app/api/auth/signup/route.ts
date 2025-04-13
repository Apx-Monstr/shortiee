import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";
export async function POST(req:NextRequest):Promise<NextResponse>{
    try{
        const body = await req.json();
        const {email, name, password} = body;
        console.log(email, password, name) // verify all these in frontend
        await connectToDatabase()
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                {
                    error:"Email Already in Use"
                },
                {
                    status:400
                }
            )
        }
        const user = new User({ email, password, name });
        await user.save();
        return NextResponse.json(
            {
                msg:"Signup Successfull",
                user:{
                    id:user._id,email, name
                }
            },
            {
                status:201
            }
        )
    }catch (error){
        console.log("SignUp Error", error)
        return NextResponse.json(
            {
                error:"Error Occured During Signup"
            },
            {
                status:500
            }
        )
    }
}