import { ContentRenderer } from "@/app/components/ContentRenderer";
import { getPost, getPostContent, getPosts } from "@/infrastructure/blog";
import React from "react";

export default async function Musing({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const posts = await getPosts();

  const matchedPost = posts.results.filter((post) => {
    if (post && post.properties && post.properties.slug) {
      return post.properties.slug.rich_text?.[0].plain_text == slug;
    }
  })[0];

  const [postData, postContent] = await Promise.all([
    getPost(matchedPost.id),
    getPostContent(matchedPost.id),
  ]);

  const articleItem: ArticleItemProps = {
    title: postData.properties.Name.title[0].plain_text,
    postData: postData,
    postContent: postContent,
    date: postData.created_time,
    hearts: postData.properties.hearts.number,
    postId: matchedPost.id,
  };

  return <ArticleItem {...articleItem} />;
}

interface ArticleItemProps {
  postId: string;
  postData: any;
  postContent: any;
  date: string;
  hearts: number;
  title: string;
}

function ArticleItem(props: ArticleItemProps): React.JSX.Element {
  return (
    <article className="prose lg:prose-xl text-slate-50 max-w-lg">
      <span>{props.date}</span>
      <h1 className="text-white">{props.title}</h1>
      <ContentRenderer postContent={props.postContent} />
    </article>
  );
}
