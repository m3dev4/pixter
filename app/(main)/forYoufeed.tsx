"use client";
import InfiniteScroll from "@/components/infiniteScroll";
import Post from "@/components/posts/editor/post";
import PostsLoading from "@/components/posts/postLoading";
import { Button } from "@/components/ui/button";
import KyInstance from "@/lib/ky";
import { PostData, PostsPage } from "@/lib/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ForYouFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      KyInstance.get(
        "/api/posts/for-you",
        pageParam ? { searchParams: { cursor: pageParam } } : {}
      ).json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return <PostsLoading />;
  }

  if(status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-destructive">
        No posts found
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occured while loading post
      </p>
    );
  }
  return (
    <InfiniteScroll
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" /> }
    </InfiniteScroll>
  );
}
