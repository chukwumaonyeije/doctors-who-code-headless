import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";

export default async function Home() {
  const { data } = await client.query({
    query: gql`
      query AllPosts {
        posts {
          nodes {
            id
            title
          }
        }
      }
    `,
  });

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">
        WordPress Posts
      </h1>

      <ul className="space-y-4 text-white">
        {data.posts.nodes.map((post: any) => (
          <li key={post.id} className="text-xl">
            {post.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
