import { FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EmptySummaryState() {
  return (
    <div className="text-center py-12 md:py-20">
      <div className="flex flex-col items-center gap-4 md:gap-6">
        <FileText className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
        <h2 className="text-lg md:text-xl font-semibold text-gray-600">
          No summaries yet
        </h2>
        <p className="text-gray-500 max-w-md text-sm md:text-base px-4">
          Upload your first PDF to get started with
          AI-powered summaries.
        </p>
        <Link href="/upload">
          <Button
            variant={'link'}
            className="mt-4 text-white bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline transition-all duration-300"
          >
            Create Your First Summary
          </Button>
        </Link>
      </div>
    </div>
  );
}