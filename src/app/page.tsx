import { getHomepageListing } from "@/infrastructure/blog";
import Curation from "./components/Curation";

export default async function Home() {
  const posts = await getHomepageListing();
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <h1 className="text-3xl uppercase">Gifted Austin</h1>
      <Curation title="musings" posts={posts.musings} />
      <Curation title="Engineering" posts={posts.engineering} />
      <Curation title="Poetry" posts={posts.poetry} />
    </main>
  );
}
