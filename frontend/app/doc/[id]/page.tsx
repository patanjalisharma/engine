// doc/[id]/page.tsx
'use client'
import { Suspense } from "react";
import Doc from "../../components/Doc"; // extract inner component

export default function DocPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0c]" />}>
      <Doc />
    </Suspense>
  );
}
  