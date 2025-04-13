import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable in .env.local');
}

export async function verifyToken(req:NextRequest){
    try{
        const cookieHeader = req.headers.get('cookie');
        let token = null;
        if (cookieHeader){
            const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
                const [name, value] = cookie.trim().split('=');
                acc[name] = value;
                return acc;
            }, {});
            token = cookies.token;
        }
        if (!token) {
            throw new Error('No token provided');
        }
    
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}