import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, ExternalLink, Globe, Link, MousePointer } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Link className="h-5 w-5 text-gray-500" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <ExternalLink className="h-4 w-4" />
          <Skeleton className="h-6 w-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Clicks</p>
              <Skeleton className="h-8 w-16 mt-1" />
            </div>
            <MousePointer className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Created</p>
              <Skeleton className="h-6 w-32 mt-1" />
              <Skeleton className="h-4 w-24 mt-2" />
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Expires</p>
              <Skeleton className="h-6 w-32 mt-1" />
              <Skeleton className="h-4 w-24 mt-2" />
            </div>
            <Clock className="h-8 w-8 text-amber-500" />
          </div>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Clicks Over Time</h2>
        <Card className="p-6">
          <Skeleton className="h-[300px] w-full" />
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
              <Skeleton className="h-64 w-full" />
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-2 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-2 w-full" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="browsers">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Browser Distribution</h3>
            <Skeleton className="h-[300px] w-full" />
          </Card>
        </TabsContent>

        <TabsContent value="os">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Operating System Distribution</h3>
            <Skeleton className="h-[300px] w-full" />
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold">Geographic Distribution</h3>
          </div>
          <Skeleton className="h-64 w-full" />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Clicks</h3>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border-b pb-3 last:border-0">
                <div className="flex justify-between mb-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
