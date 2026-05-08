import { ExternalLink, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { DownloadSummaryButton } from "./download-summary-button";

export default function SourceInfo({fileName,originalFileUrl,title,summaryText,createdAt}:{fileName:string;
    originalFileUrl:string;
    title:string;
    summaryText:string;
    createdAt:string
}){
   return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground border-t border-rose-100/20 pt-4">
      <div className="flex items-center justify-center gap-2">
        <FileText className="h-4 w-4 text-rose-400" />
        <span className="font-medium">Source:</span>
        <span className="truncate max-w-[200px] sm:max-w-xs" title={fileName}>
          {fileName}
        </span>
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
          asChild
        >
          <a 
            href={originalFileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Original
          </a>
        </Button>
        <DownloadSummaryButton title={title} fileName={fileName} summaryText={summaryText} createdAt={createdAt} />
      </div>
    </div>
  );
}