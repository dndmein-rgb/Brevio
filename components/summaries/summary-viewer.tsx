"use client"
import { useState } from "react";
import { Card } from "../ui/card";
import { NavigationControls } from "./navigation-controls";
import ProgressBar from "./progress-bar";
import { parseSelection } from "@/utils/summary-helpers";
import ContentSection from "./content-section";
import { MotionDiv } from "../common/motion-wrapper";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 mb-4 sm:mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center flex justify-center items-center gap-2 px-2">
        {title}
      </h2>
    </div>
  );
};

export default function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  
  const handleNext = () => setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  const handlePrev = () => setCurrentSection((prev) => Math.max(prev - 1, 0));
 const sections = summary
  .split(/\n(?=#)/)  // Split on newline followed by #, keeping the #
  .map((section) => section.trim())
  .filter(Boolean)
  .map(parseSelection);
  return (
    <Card className="relative mx-auto px-2 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full lg:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <ProgressBar sections={sections} currentSection={currentSection} />
      <MotionDiv key={currentSection} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.2,ease:"easeInOut"}} exit={{opacity:0}}  className="h-full overflow-y-auto scrollbar-hide pt-10 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-24">
        <div className="px-3 sm:px-4 md:px-6">
          <SectionTitle title={sections[currentSection].title} />
          <ContentSection
            title={sections[currentSection]?.title || ''}
            points={sections[currentSection]?.points || []}
          />
        </div>
      </MotionDiv>
      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrev}
        onNext={handleNext}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
}