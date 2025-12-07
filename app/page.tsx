import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  tags: {
    nodes: {
      name: string;
    }[];
  };
}

interface AllPostsResponse {
  posts: {
    nodes: Post[];
  };
}

// Revalidate every 60 seconds (ISR - Incremental Static Regeneration)
export const revalidate = 60;

const POSTS_PER_PAGE = 12;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  let data;
  
  try {
    const result = await client.query<AllPostsResponse>({
      fetchPolicy: 'network-only',
      query: gql`
        query AllPosts {
          posts(first: 100) {
            nodes {
              id
              title
              excerpt
              date
              slug
              content
              featuredImage {
                node {
                  sourceUrl
                  altText
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
      `,
    });
    data = result.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <main className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Site Temporarily Unavailable</h1>
        <p className="text-slate-400">We're experiencing technical difficulties. Please check back soon!</p>
      </main>
    );
  }

  if (!data || !data.posts) {
    return (
      <main className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">No posts found</h1>
        <p className="text-slate-400">Check back soon for new content!</p>
      </main>
    );
  }

  const allPosts = data.posts.nodes;
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);
  
  const startPost = startIndex + 1;
  const endPost = Math.min(endIndex, totalPosts);

  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 leading-tight">
            Doctors Who Code
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Where medicine meets technology. Empowering physicians to build tools that transform healthcare.
          </p>
          <SearchBar />
        </div>

        <div className="bg-gradient-to-r from-surface/60 to-surface/40 border border-slate-700 rounded-2xl p-8 md:p-12 mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Hi, I'm Dr. Chukwuma Onyeije</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                A maternal-fetal medicine specialist with over 30 years of experience, combining clinical expertise with software development to create AI-powered tools for healthcare.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all"
              >
                Learn More About Me
                <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface/60 border border-slate-700/50 rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">30+</div>
                <div className="text-slate-400 text-sm">Years in Medicine</div>
              </div>
              <div className="bg-surface/60 border border-slate-700/50 rounded-lg p-6">
                <div className="text-3xl font-bold text-secondary mb-2">AI</div>
                <div className="text-slate-400 text-sm">Powered Tools</div>
              </div>
              <div className="bg-surface/60 border border-slate-700/50 rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">MFM</div>
                <div className="text-slate-400 text-sm">Specialist</div>
              </div>
              <div className="bg-surface/60 border border-slate-700/50 rounded-lg p-6">
                <div className="text-3xl font-bold text-secondary mb-2">Tech</div>
                <div className="text-slate-400 text-sm">Enthusiast</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            {currentPage === 1 ? 'Latest Posts' : `Posts - Page ${currentPage}`}
          </h2>
          <div className="space-y-6">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-slate-400 mb-4">
              Showing {startPost}-{endPost} of {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
            </p>
          </div>
          
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
      )}
    </main>
  );
}
