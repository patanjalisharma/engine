'use client'
import { useEffect, useState } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";



type SearchResult = {
  _id: string;
  title: string;
  content: string;
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  const q = searchParams.get("q");

  if (!q) return;

  setQuery(q);

  async function fetchResults() {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/search?q=${q}`);
      const data = await res.json();
      setResults(data.result || []);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  }

  fetchResults();
}, [searchParams]);

  async function handleSearch() {
    
    if (!query.trim()) return;
    router.push(`/?q=${query}`)
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/search?q=${query}`);
      const data = await res.json();
      setResults(data.result || []);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-gray-100 selection:bg-blue-500/30">
      
      {/* Header Section */}
      <div className="sticky top-0 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 z-10 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent tracking-tight">
                What you lookin’ for?
            </h1>

            {/* Search Bar Container */}
            <div className="relative w-full group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
              
              <div className="relative flex w-full gap-2">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 p-4 rounded-xl bg-[#121214] border border-white/10 focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-500 shadow-2xl"
                />

                <button
                  onClick={handleSearch}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-blue-900/20"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    </span>
                  ) : "Search"}
                </button>
              </div>
            </div>

            {/* Disclaimer / Tip */}
            <p className="mt-4 text-xs text-gray-500 italic">
              <span className="text-blue-400 font-medium">Tip:</span> For best results, use correct spellings and relevant keywords.
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <main className="mt-8 max-w-3xl mx-auto px-4 pb-20">
        {results.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500 font-light">
              No results found. Start your discovery by typing above.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {results.map((item) => (
            <div
              key={item._id}
              className="group p-5 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10 transition-all duration-300 shadow-sm"
            >
              {/* Title */}
              <Link href={`/doc/${item._id}?q=${query}`}
                className="text-blue-400 text-xl font-semibold group-hover:text-blue-300 transition-colors inline-block mb-2"
              >
                {item.title}
                <svg className="inline-block w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Preview */}
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                {item.content.split("\n")[0]}
              </p>
              
              {/* Subtle Metadata Placeholder (Optional Enhancement) */}
              <div className="mt-3 flex items-center gap-4 text-[10px] uppercase tracking-widest text-gray-600 font-bold">
                <span>Result ID: {item._id.slice(-6)}</span>
                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                <span>Verified Source</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}