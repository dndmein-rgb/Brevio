import BgGradient from "@/components/common/bg-gradient";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSkeleton from "@/components/upload/loading-skeleton";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

// You can swap these generic divs for the animated Skeleton component we discussed earlier
function HeaderSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top Meta Row (e.g., Category and Date) */}
      <div className="flex flex-wrap items-center gap-4">
        <Skeleton className="h-8 w-32 rounded-full bg-white/80" />
        <Skeleton className="h-5 w-40 rounded-full bg-white/80" />
      </div>

      {/* Main Title Skeleton */}
      <Skeleton className="h-12 w-3/4 rounded-full bg-white/80" />
    </div>
  );
}

export default function LoadingSummary() {
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      {/* Background Gradient Layer */}
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      {/* Main Container */}
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <div className="flex flex-col gap-8">
            {/* Header Section */}
            <HeaderSkeleton />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground border-t border-rose-100/20 pt-4">
              <div className="flex items-center justify-center gap-2">
                <Skeleton className="h-4 w-4 " />

                <Skeleton className="h-6 w-12" />
              </div>

              <div className="flex gap-2">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>

            {/* Content Card */}
            <div className="relative overflow-hidden">
              <div className="relative p-8 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/50 to-transparent opacity-50 rounded-3xl" />

                {/* File Icon Badge (Top Right) */}
                <div className="absolute top-4 sm:top-4 right-4 sm:right-4 text-rose-300/20">
                  <Skeleton className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>PDF Summary</span>
                </div>

                {/* Inner Content Skeleton */}
                <div className="relative">
                  <LoadingSkeleton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
