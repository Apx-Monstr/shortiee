import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header/>
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
										Shorten, Share, and Track Your Links
									</h1>
									<p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
										Create shortened URLs that are easy to share and track. Get detailed analytics on your links'
										performance.
									</p>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Link href="/login">
										<Button className="bg-purple-600 hover:bg-purple-700">
											Get Started
											<ArrowRight className="ml-2 h-4 w-4" />
										</Button>
									</Link>
								</div>
							</div>
							<div className="flex items-center justify-center">
								<div className="relative h-[450px] w-full overflow-hidden rounded-xl border bg-gradient-to-b from-purple-100 to-white p-4 dark:from-purple-950 dark:to-background">
									<div className="flex h-full w-full flex-col rounded-lg border bg-background p-6 shadow-lg">
										<div className="flex items-center justify-between border-b pb-2">
											<div className="flex items-center space-x-2">
												<div className="h-3 w-3 rounded-full bg-red-500" />
												<div className="h-3 w-3 rounded-full bg-yellow-500" />
												<div className="h-3 w-3 rounded-full bg-green-500" />
											</div>
											<div className="text-sm text-gray-500 dark:text-gray-400">Dashboard</div>
										</div>
										<div className="mt-4 grid gap-2">
											<div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
											<div className="h-32 rounded-md bg-gray-100 dark:bg-gray-800" />
											<div className="grid grid-cols-2 gap-2">
												<div className="h-24 rounded-md bg-gray-100 dark:bg-gray-800" />
												<div className="h-24 rounded-md bg-gray-100 dark:bg-gray-800" />
											</div>
											<div className="h-40 rounded-md bg-gray-100 dark:bg-gray-800" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
									Features
								</h2>
								<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
									Everything you need to manage and track your links
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
							<div className="flex flex-col items-center space-y-4 text-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
									<svg className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
										<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
										<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
									</svg>
								</div>
								<div className="space-y-2">
									<h3 className="text-xl font-bold">Link Shortening</h3>
									<p className="text-gray-500 dark:text-gray-400">Create short, memorable links that redirect to your long URLs.</p>
								</div>
							</div>
							<div className="flex flex-col items-center space-y-4 text-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
									<svg className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 2v20M2 12h20" />
									</svg>
								</div>
								<div className="space-y-2">
									<h3 className="text-xl font-bold">QR Code Generation</h3>
									<p className="text-gray-500 dark:text-gray-400">Generate QR codes for your shortened links for easy mobile access.</p>
								</div>
							</div>
							<div className="flex flex-col items-center space-y-4 text-center">
								<div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
									<svg className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
										<path d="M3 3v18h18" />
										<path d="m19 9-5 5-4-4-3 3" />
									</svg>
								</div>
								<div className="space-y-2">
									<h3 className="text-xl font-bold">Analytics Dashboard</h3>
									<p className="text-gray-500 dark:text-gray-400">Track clicks, locations, devices, and more with our detailed analytics.</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer/>
		</div>

	)
}