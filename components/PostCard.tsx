import Image from "next/image";
import Link from "next/link";
import { calculateReadingTime } from "@/lib/reading-time";

interface PostCardProps {
  post: {
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
  };
}

export default function PostCard({ post }: PostCardProps) {
  const readingTime = calculateReadingTime(post.content);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="bg-surface/60 border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:border-primary hover:shadow-primary/20 transition-all duration-300 group">
        
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
            <time dateTime={post.date}>{formattedDate}</time>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          <div
            className="text-slate-300 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />

          {/* Tags */}
          {post.tags.nodes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.nodes.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Read More */}
          <div className="flex items-center gap-2 text-secondary group-hover:gap-3 transition-all">
            <span className="font-medium">Read article</span>
            <span>→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
