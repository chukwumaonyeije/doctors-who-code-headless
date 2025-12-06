import { config } from 'dotenv';
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import { MeiliSearch } from 'meilisearch';

// Load environment variables
config({ path: '.env.local' });

const meilisearchClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || '',
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
    fetch,
  }),
  cache: new InMemoryCache(),
});

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 100) {
      nodes {
        id
        title
        slug
        excerpt
        content
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

async function indexPosts() {
  try {
    console.log('Fetching posts from WordPress...');
    const { data } = await client.query({ query: GET_ALL_POSTS });
    
    const posts = (data as any).posts.nodes.map((post: any, index: number) => {
      // Sanitize slug to only contain alphanumeric, hyphens, and underscores
      const sanitizedSlug = post.slug
        ?.replace(/[^a-zA-Z0-9-_]/g, '-')
        ?.replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
        || `post-${index}`;
      
      return {
        id: sanitizedSlug,
        wordpress_id: post.id, // Store original WordPress ID
        title: post.title,
        slug: post.slug, // Keep original slug for URLs
        excerpt: post.excerpt?.replace(/<[^>]*>/g, ''), // Strip HTML
        content: post.content?.replace(/<[^>]*>/g, ''), // Strip HTML
        date: post.date,
        author: post.author.node.name,
        featuredImage: post.featuredImage?.node?.sourceUrl || null,
        categories: post.categories.nodes.map((cat: any) => cat.name),
        tags: post.tags.nodes.map((tag: any) => tag.name),
      };
    });

    console.log(`Indexing ${posts.length} posts...`);

    const index = meilisearchClient.index('posts');
    
    // Set primary key explicitly
    await index.update({ primaryKey: 'id' });
    
    // Configure searchable attributes
    await index.updateSearchableAttributes([
      'title',
      'excerpt',
      'content',
      'author',
      'categories',
      'tags'
    ]);

    // Configure filterable attributes
    await index.updateFilterableAttributes([
      'categories',
      'tags',
      'author',
      'date'
    ]);

    // Configure sortable attributes
    await index.updateSortableAttributes(['date']);

    // Add documents to index
    const response = await index.addDocuments(posts);
    
    console.log('✅ Posts indexed successfully!');
    console.log(`Task UID: ${response.taskUid}`);
    
  } catch (error) {
    console.error('❌ Error indexing posts:', error);
    process.exit(1);
  }
}

indexPosts();
