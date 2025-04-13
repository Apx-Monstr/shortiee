"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChartLine, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { Loader2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import QRCodePopupButton from "@/components/QRCodePopover";

export default function DashboardPage() {
    const { user, loading: authLoading, logout } = useAuth();
    const router = useRouter();
    const [urls, setUrls] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState("");

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    // Fetch user links
    useEffect(() => {
        if (user) {
            const fetchUrls = async () => {
                setFetchLoading(true);
                try {
                    const response = await fetch("/api/urls", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.message || "Failed to fetch URLs");
                    }

                    setUrls(data.urls || []);
                } catch (err) {
                    setError(err instanceof Error ? err.message : "Failed to fetch URLs");
                } finally {
                    setFetchLoading(false);
                }
            };

            fetchUrls();
        }
    }, [user]);

    // Show loading state for auth
    if (authLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Manage your shortened URLs and view analytics
                    </p>
                </div>
                <Link href="/dashboard/create">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Link
                    </Button>
                </Link>
            </div>

            {error && (
                <div className="mb-6 text-red-500">
                    <p>{error}</p>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Total Links</CardTitle>
                        <CardDescription>Number of links created</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {fetchLoading ? "..." : urls.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Total Clicks</CardTitle>
                        <CardDescription>Number of clicks on all links</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {fetchLoading
                                ? "..."
                                : urls.reduce((sum, url) => sum + url.clickCount, 0)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Active Links</CardTitle>
                        <CardDescription>Number of non-expired links</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {fetchLoading
                                ? "..."
                                : urls.filter(
                                    (url) => !url.expiresAt || new Date(url.expiresAt) > new Date()
                                ).length}
                        </div>
                    </CardContent>
                </Card>
            </div>
            {fetchLoading ? (
    <div className="flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
    </div>
) : urls.length === 0 ? (
    <p className="text-center text-muted-foreground">
        No links created yet. Create one to get started!
    </p>
) : (
    <div className="overflow-x-auto rounded-lg border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Short URL</TableHead>
                    <TableHead>Original URL</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {urls.map((url) => (
                    <TableRow key={url.shortCode}>
                    <TableCell>
                        <a
                            href={`${window.location.origin}/${url.shortCode}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline"
                        >
                            {`${window.location.origin}/${url.shortCode}`}
                        </a>
                    </TableCell>
                    <TableCell>
                        <p className="break-all text-sm text-muted-foreground">
                            {url.originalUrl}
                        </p>
                    </TableCell>
                    <TableCell>{url.clickCount}</TableCell>
                    <TableCell>
                        {url.expiresAt
                            ? new Date(url.expiresAt).toLocaleDateString()
                            : "Never"}
                    </TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.push(`/dashboard/analytics/${url.shortCode}`)}
                        >
                            <ChartLine/>
                        </Button>
                        <QRCodePopupButton mode="link" link={`${window.location.origin}/${url.shortCode}`}/>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                                try {
                                    const res = await fetch(`/api/urls/${url.shortCode}`, {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    });
                
                                    if (!res.ok) {
                                        const data = await res.json();
                                        throw new Error(data.message || "Failed to delete URL");
                                    }
                
                                    // Refresh URLs after delete
                                    setUrls((prev) =>
                                        prev.filter((item) => item.shortCode !== url.shortCode)
                                    );
                                } catch (error) {
                                    console.error("Delete failed:", error);
                                    alert(error instanceof Error ? error.message : "Failed to delete URL");
                                }
                            }}
                        >
                            <Trash2/>
                        </Button>
                    </TableCell>
                </TableRow>
                
                ))}
            </TableBody>
        </Table>
    </div>
)}

            {/* Display list of URLs */}
            {/* {fetchLoading ? (
                <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
                </div>
            ) : urls.length === 0 ? (
                <p className="text-center text-muted-foreground">
                    No links created yet. Create one to get started!
                </p>
            ) : (
                <div className="grid gap-4">
                    {urls.map((url) => (
                        <Card key={url.shortCode}>
                            <CardContent className="pt-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <a
                                            href={`${window.location.origin}/${url.shortCode}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purple-600 hover:underline"
                                        >
                                            {`${window.location.origin}/${url.shortCode}`}
                                        </a>
                                        <p className="text-sm text-muted-foreground break-all">
                                            {url.originalUrl}
                                        </p>
                                        {url.expiresAt && (
                                            <p className="text-sm text-muted-foreground">
                                                Expires: {new Date(url.expiresAt).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium">
                                            {url.clickCount} clicks
                                        </span>
                                        <Button variant="outline" size="sm">
                                            Details
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )} */}
        </div>
    );
}
