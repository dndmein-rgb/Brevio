import { parseEmojiPoint, parsePoint } from "@/utils/summary-helpers";
import { MotionDiv } from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const parseBold = (text: string) => {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-foreground font-semibold">
        {part}
      </strong>
    ) : (
      part
    )
  );
};

const EmojiPoint = ({ point, index }: { point: string; index: number }) => {
  const { emoji, text } = parseEmojiPoint(point) ?? {};

  return (
    <MotionDiv variants={itemVariants} className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl sm:rounded-2xl" />
      <div className="relative flex items-start gap-2 sm:gap-3">
        <span className="text-base sm:text-lg shrink-0 pt-0.5">{emoji}</span>
        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground/90 leading-relaxed">
          {parseBold(text ?? "")}
        </p>
      </div>
    </MotionDiv>
  );
};

const RegularPoint = ({ point, index }: { point: string; index: number }) => {
  return (
    <MotionDiv  variants={itemVariants} className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl sm:rounded-2xl" />
      <p className="relative text-xs sm:text-sm lg:text-base text-muted-foreground/90 leading-relaxed text-left">
        {parseBold(point.replace(/^•\s*/, ""))}
      </p>
    </MotionDiv>
  );
};

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <MotionDiv variants={containerVariants} key={points.join('')} initial='hidden' whileInView={'visible'} animate='visible' exit='exit' className="space-y-4">
      {points.map((point, index) => {
        const { hasEmoji, isMainPoint, isEmpty } = parsePoint(point);
        if (isEmpty) return null;
        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={`point-${index}`} index={index} point={point} />;
        }
        return <RegularPoint key={`point-${index}`} index={index} point={point} />;
      })}
    </MotionDiv>
  );
}