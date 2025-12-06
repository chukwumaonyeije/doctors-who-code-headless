import { Metadata } from "next";
import Image from "next/image";
import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";
import { calculateReadingTime } from "@/lib/reading-time";
import ShareButtons from "@/components/ShareButtons";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  slug: string;
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

interface GraphQLResponse {
  post: Post | null;
}

// Revalidate every 60 seconds (ISR - Incremental Static Regeneration)
export const revalidate = 60;

// GraphQL query for single post
const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      excerpt
      date
      slug
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
`;

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const { data } = await client.query<GraphQLResponse>({
      query: GET_POST_BY_SLUG,
      variables: { slug: resolvedParams.slug },
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    });

    if (!data?.post) {
      return {
        title: "Post Not Found",
      };
    }

  const post = data.post;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://doctorswhocode.blog";
  const postUrl = `${baseUrl}/blog/${resolvedParams.slug}`;

  return {
    title: post.title,
    description: post.excerpt?.replace(/<[^>]*>/g, "").substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>/g, "").substring(0, 160),
      url: postUrl,
      type: "article",
      images: [
        {
          url: post.featuredImage?.node.sourceUrl || "",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>/g, "").substring(0, 160),
      images: [post.featuredImage?.node.sourceUrl || ""],
    },
  };
  } catch (error) {
    console.error('Error fetching post metadata:', error);
    return {
      title: "Post Not Found",
      description: "Unable to load this post. Please try again later.",
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const resolvedParams = await params;
    const { data } = await client.query<GraphQLResponse>({
      query: GET_POST_BY_SLUG,
      variables: { slug: resolvedParams.slug },
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    });

    if (!data?.post) {
      notFound();
    }

  const post = data.post;
  const readingTime = calculateReadingTime(post.content);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://doctorswhocode.blog";
  const postUrl = `${baseUrl}/blog/${resolvedParams.slug}`;

  return (
    <article className="max-w-4xl mx-auto py-16 px-6">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative h-96 w-full overflow-hidden rounded-2xl mb-8">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>

        {/* Title with Gradient */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Tags */}
        {post.tags.nodes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.nodes.map((tag: any, index: number) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content with Tailwind Typography */}
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-white
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-secondary prose-a:no-underline hover:prose-a:text-primary prose-a:transition-colors
          prose-strong:text-white prose-strong:font-semibold
          prose-code:text-secondary prose-code:bg-surface/60 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
          prose-pre:bg-surface/60 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-xl
          prose-blockquote:border-l-primary prose-blockquote:bg-surface/30 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
          prose-ul:text-slate-300 prose-ol:text-slate-300
          prose-li:marker:text-primary
          prose-img:rounded-xl prose-img:shadow-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Share Buttons */}
      <div className="mt-12">
        <ShareButtons url={postUrl} title={post.title} />
      </div>

      {/* Back to Blog Link */}
      <div className="mt-8 pt-8 border-t border-slate-700">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors"
        >
          <span>←</span>
          <span className="font-medium">Back to all posts</span>
        </a>
      </div>
    </article>
  );
  } catch (error) {
    const resolvedParams = await params;
    console.error(`Error loading post with slug "${resolvedParams.slug}":`, error);
    return (
      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Unable to Load Post</h1>
        <p className="text-slate-400 mb-6">We're having trouble connecting to the server. Please try again later.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all"
        >
          <span>←</span>
          <span>Back to Home</span>
        </a>
      </div>
    );
  }
}
