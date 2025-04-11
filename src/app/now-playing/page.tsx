// app/now-playing/page.tsx
import { Suspense } from "react";
import NowPlayingContent from "./NowPlayingContent";

export default function NowPlayingPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <NowPlayingContent />
    </Suspense>
  );
}
