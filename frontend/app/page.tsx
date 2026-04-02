'use client'
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import SearchPage from "./components/Search" // extract inner component

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0c]" />}>
      <SearchPage />
    </Suspense>
  );
}