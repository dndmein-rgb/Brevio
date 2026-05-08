import BgGradient from "@/components/common/bg-gradient";
import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";
import {SummaryHeader} from "@/components/summaries/summary-header"
import { FileText } from "lucide-react";
import SourceInfo from "@/components/summaries/source-info";
import SummaryViewer from "@/components/summaries/summary-viewer";

export default async function SummaryPage(props: { params: Promise<{ id: string }> }) {
    const params=await props.params;
    const id=params.id;
  const summary = await getSummaryById(id);

  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name ,word_count,created_at,original_file_url} = summary;
  const reading_time=Math.ceil((word_count||0)/200);

 return (
  <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
    <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

    {/* Consistent wrapper for vertical alignment */}
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24 flex flex-col gap-6 sm:gap-8">
      
      {/* Header Section */}
      <header className="flex flex-col gap-4">
        <SummaryHeader 
          title={title} 
          createdAt={created_at} 
          readingTime={reading_time} 
        />
        {file_name && <SourceInfo title={title} summaryText={summary_text} createdAt={created_at}  originalFileUrl={original_file_url} fileName={file_name} />}
      </header>

      {/* Content Section */}
<main className="relative flex justify-center">
  <div className="relative w-full max-w-4xl p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30">
    
    {/* Word Count Badge */}
    <div className="absolute top-4 right-4 z-10 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-3 py-1.5 rounded-full shadow-xs border border-rose-100/10">
      <FileText className="h-3.5 w-3.5 text-rose-400" />
      <span>{word_count?.toLocaleString()} words</span>
    </div>

    {/* Summary Content - Centered */}
    <div className="relative mt-8 sm:mt-6 flex justify-center">
      <SummaryViewer summary={summary_text} />
    </div>
  </div>
</main>

    </div>
  </div>
);
}