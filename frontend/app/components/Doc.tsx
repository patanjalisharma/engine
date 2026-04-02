"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

type Doc = {
  _id: string;
  title: string;
  content: string;
  link?: string;
  redditLink?: string;
};

export default function Doc() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const [doc, setDoc] = useState<Doc | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doc/${id}`)
      .then((res) => res.json())
      .then((data) => setDoc(data));
  }, [id]);

  if (!doc) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 animate-pulse tracking-widest text-xs uppercase">Retrieving Data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-gray-200 selection:bg-blue-500/30">
      {/* Top Navbar */}
      <nav className="border-b border-white/5 bg-[#0a0a0c]/50 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-350 mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/?q=${searchParams.get("q") || ""}`} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <span className="text-white font-bold">&larr;</span>
            </div>
            <span className="text-sm font-medium text-gray-400 group-hover:text-white transition">Back to Search</span>
          </Link>
          
        </div>
      </nav>

      <main className="max-w-350 mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT COLUMN: The actual content (Wider) */}
          <div className="flex-1 lg:max-w-[calc(100%-350px)]">
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                {doc.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Verified Doc</span>
                <span>•</span>
                <span>{doc.content.split(' ').length} words</span>
              </div>
            </header>

            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-linear-to-b from-blue-500/50 via-transparent to-transparent hidden md:block"></div>
              <p className="text-gray-300 whitespace-pre-line leading-relaxed text-lg md:text-xl font-light">
                {doc.content}
              </p>
            </section>
          </div>

          {/* RIGHT COLUMN: Sidebar (Sticky) */}
          <aside className="w-full lg:w-[320px] shrink-0">
            <div className="sticky top-28 space-y-6">
              
              {/* External Links Box */}
              <div className="p-6 rounded-2xl bg-white/3 border border-white/5 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Resources</h3>
                <div className="space-y-3">
                  {doc.link && (
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all group"
                    >
                      <span className="text-sm font-semibold text-white">Source File</span>
                      <span className="opacity-70 group-hover:translate-x-1 transition">→</span>
                    </a>
                  )}

                  {doc.redditLink && (
                    <a
                      href={doc.redditLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-[#ff4500]/10 border border-[#ff4500]/20 hover:bg-[#ff4500] transition-all group"
                    >
                      <span className="text-sm font-semibold text-[#ff4500] group-hover:text-white">Community Discussion</span>
                      <span className="text-[#ff4500] group-hover:text-white opacity-70 group-hover:translate-x-1 transition">→</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Utility Info */}
              <div className="p-6 rounded-2xl border border-dashed border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">Search Tip</h3>
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  &quot;For best results, use correct spellings and relevant keywords to locate similar documents in the index.&quot;
                  <br />
                   <span className=" py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">CTRL + F to find specific words in this document.</span>
                </p>
              </div>

            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}