'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl = '/' }: PaginationProps) {
  // Don't show pagination if there's only one page
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl;
    return `${baseUrl}?page=${page}`;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-surface/60 border border-slate-700 text-white hover:border-primary hover:text-primary transition-all"
          aria-label="Previous page"
        >
          ← Previous
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-surface/30 border border-slate-700/50 text-slate-600 cursor-not-allowed">
          ← Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <Link
              key={page}
              href={getPageUrl(page)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${isActive 
                  ? 'bg-primary text-white border border-primary shadow-lg shadow-primary/20' 
                  : 'bg-surface/60 border border-slate-700 text-white hover:border-primary hover:text-primary'
                }
              `}
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-surface/60 border border-slate-700 text-white hover:border-primary hover:text-primary transition-all"
          aria-label="Next page"
        >
          Next →
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-surface/30 border border-slate-700/50 text-slate-600 cursor-not-allowed">
          Next →
        </span>
      )}
    </nav>
  );
}
