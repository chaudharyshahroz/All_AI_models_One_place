import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-2.5 text-center text-[13px]">
        <span className="font-semibold">All Ai Models  Auto is live:</span>
        <span className="hidden text-background/75 sm:inline">
          Let All Ai Models  pick the right model for every message — and tell you why.
        </span>
        <Link
          href="/features"
          className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary/80"
        >
          See how it works
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
