'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  _formatted?: {
    title: string;
    excerpt: string;
  };
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchPosts = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        setResults(data.hits || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full px-6 py-3 bg-[#1E293B] border border-[#334155] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-[#8b5cf6] border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-[#1E293B] border border-[#334155] rounded-lg shadow-2xl max-h-96 overflow-y-auto">
          {results.map((result) => (
            <Link
              key={result.id}
              href={`/blog/${result.slug}`}
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="block px-6 py-4 hover:bg-[#334155] border-b border-[#334155] last:border-b-0 transition-colors"
            >
              <h3
                className="font-semibold text-white mb-1"
                dangerouslySetInnerHTML={{
                  __html: result._formatted?.title || result.title,
                }}
              />
              <p
                className="text-sm text-gray-400 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: result._formatted?.excerpt || result.excerpt,
                }}
              />
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.trim().length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-[#1E293B] border border-[#334155] rounded-lg shadow-2xl px-6 py-4">
          <p className="text-gray-400">No results found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}
