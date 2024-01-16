import type { NormalizedHomePageItem, Tags } from "@/infrastructure/blog";
import Link from "next/link";
import React from "react";

const parseUrl = (tags: Tags[], slug: string): string => {
  return tags.includes("poetry") ? `/poetry/${slug}` : `/musings/${slug}`;
};

interface CurationProps {
  posts: NormalizedHomePageItem[];
  title: string;
}

export default function Curation({
  posts,
  title,
}: CurationProps): React.JSX.Element {
  return (
    <div>
      <h1>{title}</h1>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <Link href={parseUrl(post.tags, post.slug)}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
