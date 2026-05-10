import BgGradient from "@/components/common/bg-gradient";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/common/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { containerVariants, itemVariants } from "@/utils/constants";

function HeaderSkeleton() {
  return (
    <div className="flex gap-4 mb-8 justify-between">
      <div className="flex flex-col gap-2 w-full">
        {/* Title Skeleton */}
        <MotionH1 variants={itemVariants} initial="hidden" animate="visible">
          <Skeleton className="h-10 w-48 rounded-md" />
        </MotionH1>

        {/* Subtitle Skeleton */}
        <MotionDiv variants={itemVariants} initial="hidden" animate="visible">
          <Skeleton className="h-6 w-96 rounded-md" />
        </MotionDiv>
      </div>
      <MotionDiv
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="self-start"
      >
        <Skeleton className="h-10 w-32 rounded-md" />
      </MotionDiv>
    </div>
  );
}

function SummaryCardSkeleton() {
  return (
    <MotionDiv
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="rounded-lg border  bg-card text-card-foreground shadow-sm"
    >
      <Skeleton className="h-48 w-full rounded-lg" />
    </MotionDiv>
  );
}

export default function LoadingSummaries() {
  return (
    <div className="min-h-screen relative ">
      {/* Background Layer */}
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />

      {/* Content Layer */}
      <section className="container relative z-10 px-10 py-24 mx-auto flex flex-col gap-8">
        <HeaderSkeleton />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {Array.from({ length: 6 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
