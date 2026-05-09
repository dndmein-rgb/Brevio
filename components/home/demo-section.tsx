import { PizzaIcon } from "lucide-react";
import SummaryViewer from "../summaries/summary-viewer";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";
 const DEMO_SUMMARY = `# Quick Overview
Next.js 16 introduces transformative features that bridge the gap between static performance and dynamic flexibility for modern developers.

# Core Technical Updates
🚀 Server Actions: Deep dive into the useActionState hook for handling form state and server-side transitions natively.
🛡️ Security Layers: Utilizing the new Taint APIs to prevent sensitive server data from leaking into client-side bundles.
⚡ Partial Prerendering: Exploring the union of static shells and dynamic islands to optimize Largest Contentful Paint (LCP).
📦 Caching Logic: Adapting to the new uncached by default standard to ensure data reliability across dynamic routes.
🏗️ React 19 Hooks: Implementing the use hook for resource loading and handling async transitions without useEffect.

# Performance Metrics
📉 Bundle Size: Reduced client-side runtime by shifting heavy logic to Server Components by default.
⏱️ Hydration Speed: Improved error reporting and faster DOM reconciliation using React 19's enhanced engine.
🌐 Edge Compatibility: Better support for middleware and edge runtimes for global low-latency delivery.

# Developer Experience
🛠️ Dev Tools: New overlay for hydration mismatch debugging.
📊 Instrumentation: Improved support for OpenTelemetry.
🧪 Testing: Native support for Async Request APIs.

# Bottom Line
💫 Master Next.js 16 to build fast, scalable, and SEO-friendly web applications with the latest React features. The focus remains on shipping less JavaScript while maintaining power.

# Final Thoughts
🔥 This evolution represents a cleaning up of the App Router architecture. By simplifying caching and strengthening security, Next.js 16 provides a more predictable foundation for the next generation of web apps. It is a must-learn.`;
export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4 ">
          <PizzaIcon className="w-6 h-6 text-rose-500" />
          </div>
          <div className="text-center mb-16">
          <MotionH3 initial={{y:20 ,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:0.5,delay:0.2}} className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">Watch how Brevio transforms <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">this Next.js course PDF</span>  into an easy-to-read summary!</MotionH3>
          </div>
          </div>
          <MotionDiv initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5}} >
            {/* Summary Viewer */}
              <SummaryViewer summary={DEMO_SUMMARY} />
          </MotionDiv>
        
      </div>
    </section>
  );
}
