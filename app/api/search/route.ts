import { NextRequest, NextResponse } from 'next/server';
import meilisearchClient from '@/lib/meilisearch-client';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const index = meilisearchClient.index('posts');
    const results = await index.search(query, {
      limit,
      attributesToHighlight: ['title', 'excerpt'],
      highlightPreTag: '<mark>',
      highlightPostTag: '</mark>',
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
