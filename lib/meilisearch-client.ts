import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || '',
});

export default client;
