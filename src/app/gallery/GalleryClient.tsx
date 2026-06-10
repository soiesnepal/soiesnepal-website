"use client";

import Image from "next/image";
import { Camera, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

interface GalleryImage {
  _id: string;
  title: string;
  imageUrl: string;
  date?: string;
}

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [query, setQuery] = useState("");

  const filteredImages = useMemo(() => {
    if (!query.trim()) return images;
    return images.filter(
      (img) =>
        img.title.toLowerCase().includes(query.toLowerCase()) ||
        (img.date && img.date.includes(query))
    );
  }, [images, query]);

  const hasImages = images.length > 0;
  const hasMatches = filteredImages.length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-100 dark:bg-navy-800 text-gold-500 dark:text-gold-400 border border-slate-200 dark:border-navy-700 mb-4">
            Our Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Moments & <span className="gradient-text">Memories</span>
          </h1>
        </div>

        {hasImages && (
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-navy-500"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gallery..."
                className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-gold-500/50 transition-colors"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-navy-300"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {!hasImages ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-800/50 rounded-2xl">
            <Camera className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">
              Coming Soon
            </h3>
            <p className="text-slate-500">
              Photos from our departmental student activities will be uploaded here
            </p>
          </div>
        ) : !hasMatches ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-navy-900/50 border border-slate-200 dark:border-navy-800/50 rounded-2xl">
            <p className="text-slate-500">No images matched your search.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((image) => (
              <div
                key={image._id}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-navy-700/50"
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <h3 className="text-white font-medium text-lg mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {image.title}
                    </h3>
                    {image.date && (
                      <p className="text-white/80 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {new Date(image.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
