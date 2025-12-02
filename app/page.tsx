import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";
import PostCard from "@/components/PostCard";
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

export default async function Home() {
  const { data } = await client.query<AllPostsResponse>({
    query: gql`
      query AllPosts {
        posts {
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

  const posts = data.posts.nodes;
  const featuredPost = posts[0]; // Most recent post
  const otherPosts = posts.slice(1); // Rest of the posts

  return (
    <main>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 leading-tight">
            Doctors Who Code
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Where medicine meets technology. Empowering physicians to build tools that transform healthcare.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Latest Post</h2>
              <span className="px-4 py-2 bg-primary/20 text-primary text-sm font-semibold rounded-full border border-primary/30">
                NEW
              </span>
            </div>
            <PostCard post={featuredPost} />
          </div>
        )}

        {/* About Preview */}
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

      {/* Recent Posts Section */}
      {otherPosts.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <h2 className="text-3xl font-bold text-white mb-8">More Posts</h2>
          <div className="space-y-6">
            {otherPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
