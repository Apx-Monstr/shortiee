import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function Header(){
    return (
        <header className="sticky top-0 px-4 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                            Shortiee
                        </span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <Link href="/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}