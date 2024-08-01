import Post from "@/components/posts/editor/post";
import PostEditor from "@/components/posts/editor/postEditor";
import TrendsSideBar from "@/components/trendSideBar";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import ForYouFeed from "./forYoufeed";

export default function Home() {
  return (
    <main className="min-w-0 w-full flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSideBar />
    </main>
  );
}
