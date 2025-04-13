"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, LinkIcon, Clock, Calendar, MousePointer, Laptop, Smartphone, Globe } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import Loading from "./loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export default function AnalyticsPage() {
    const { shortcode } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState<any>(null);
    const [error, setError] = useState("");
    
    // const timeRemaining = formatDistanceToNow(new Date(analytics.expiresAt), { addSuffix: true })
    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch(`/api/urls/${shortcode}/analytics`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch analytics");
                }
                console.log(data);
                setAnalytics(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch analytics");
            } finally {
                setLoading(false);
            }
        };

        if (shortcode) {
            fetchAnalytics();
        }
    }, [shortcode]);

    // Compute analytics data only when analytics is available
    const deviceData = analytics ? [
        { name: "Desktop", value: analytics.clicks.filter((click: any) => click.device === "desktop").length },
        { name: "Mobile", value: analytics.clicks.filter((click: any) => click.device === "mobile").length },
        { name: "Tablet", value: analytics.clicks.filter((click: any) => click.device === "tablet").length },
    ] : [];

    const browserData = analytics ? [
        { name: "Chrome", value: analytics.clicks.filter((click: any) => click.browser === "Chrome").length },
        { name: "Firefox", value: analytics.clicks.filter((click: any) => click.browser === "Firefox").length },
        { name: "Safari", value: analytics.clicks.filter((click: any) => click.browser === "Safari").length },
        { name: "Edge", value: analytics.clicks.filter((click: any) => click.browser === "Edge").length },
        {
            name: "Other",
            value: analytics.clicks.filter((click: any) => !["Chrome", "Firefox", "Safari", "Edge"].includes(click.browser)).length,
        },
    ] : [];

    const osData = analytics ? [
        { name: "Windows", value: analytics.clicks.filter((click: any) => click.os === "Windows").length },
        { name: "macOS", value: analytics.clicks.filter((click: any) => click.os === "macOS").length },
        { name: "Linux", value: analytics.clicks.filter((click: any) => click.os === "Linux").length },
        { name: "iOS", value: analytics.clicks.filter((click: any) => click.os === "iOS").length },
        { name: "Android", value: analytics.clicks.filter((click: any) => click.os === "Android").length },
    ] : [];

    const clicksByHour = analytics ? analytics.clicks.reduce(
        (acc: Record<number, number>, click: any) => {
            const hour = new Date(click.timestamp).getHours();
            acc[hour] = (acc[hour] || 0) + 1;
            return acc;
        },
        {}
    ) : {};

    const timeSeriesData = analytics ? Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        clicks: clicksByHour[i] || 0,
    })) : [];

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-500">{error}</p>
                <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <Button onClick={() => router.back()}>Back to Dashboard</Button>
            </div>
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                <LinkIcon className="h-5 w-5 text-gray-500" />
                <h1 className="text-3xl font-bold">/{analytics.shortCode}</h1>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                <ExternalLink className="h-4 w-4" />
                <a
                    href={analytics.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate"
                >
                    {analytics.originalUrl}
                </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-gray-500">Total Clicks</p>
                    <h3 className="text-3xl font-bold">{analytics.clickCount}</h3>
                    </div>
                    <MousePointer className="h-8 w-8 text-blue-500" />
                </div>
                </Card>

                <Card className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-gray-500">Created</p>
                    <h3 className="text-lg font-semibold">{format(new Date(analytics.createdAt), "MMM d, yyyy")}</h3>
                    <p className="text-sm text-gray-500">{format(new Date(analytics.createdAt), "h:mm a")}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-500" />
                </div>
                </Card>

                <Card className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Expires</p>
                        {analytics.expiresAt ? (
                            <>
                            <h3 className="text-lg font-semibold">{format(new Date(analytics.expiresAt), "MMM d, yyyy")}</h3>
                            <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(analytics.expiresAt), { addSuffix: true })}</p>
                            </>
                        ) : (
                            <p className="text-lg font-semibold">Never</p>
                        )}
                    </div>
                    <Clock className="h-8 w-8 text-amber-500" />
                </div>
                </Card>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Clicks Over Time</h2>
                <Card className="p-6">
                <LineChart
                    data={timeSeriesData}
                    categories={["clicks"]}
                    index="hour"
                    colors={["blue"]}
                    valueFormatter={(value) => `${value} clicks`}
                    height={300}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                    yAxisWidth={40}
                />
                </Card>
            </div>
            <Tabs defaultValue="devices" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="browsers">Browsers</TabsTrigger>
          <TabsTrigger value="os">Operating Systems</TabsTrigger>
        </TabsList>

        <TabsContent value="devices">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Device Distribution</h3>
              <div className="h-auto">
                <PieChart
                  data={deviceData}
                  categories={["value"]}
                  index="name"
                  colors={["blue", "green", "amber"]}
                  valueFormatter={(value) => `${value} clicks`}
                />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Laptop className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Desktop</span>
                      <span className="text-sm text-gray-500">{deviceData[0].value} clicks</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(deviceData[0].value / analytics.clickCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Mobile</span>
                      <span className="text-sm text-gray-500">{deviceData[1].value} clicks</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(deviceData[1].value / analytics.clickCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="browsers">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Browser Distribution</h3>
            <BarChart
              data={browserData}
              categories={["value"]}
              index="name"
              colors={["purple"]}
              valueFormatter={(value) => `${value} clicks`}
              height={300}
            />
          </Card>
        </TabsContent>

        <TabsContent value="os">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Operating System Distribution</h3>
            <BarChart
              data={osData}
              categories={["value"]}
              index="name"
              colors={["teal"]}
              valueFormatter={(value) => `${value} clicks`}
              height={300}
            />
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold">Geographic Distribution</h3>
          </div>
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md">
            <p className="text-gray-500">No location data available</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Clicks</h3>
          <div className="space-y-4">
            {analytics.clicks.map((click, index) => (
              <div key={index} className="border-b pb-3 last:border-0">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{format(new Date(click.timestamp), "MMM d, h:mm a")}</span>
                  <span className="text-sm text-gray-500">
                    {click.browser} / {click.os}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {click.referrer ? <span>Referred from: {click.referrer}</span> : <span>Direct visit</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
        </div>
    );
}
