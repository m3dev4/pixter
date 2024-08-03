"use client";
import { useSession } from "@/app/(main)/sessionProvider";
import UserAvatar from "@/components/userAvatar";
import { PostData } from "@/lib/types";
import { formatRelative } from "date-fns";
import Link from "next/link";
import PostMoreButton from "./postMoreButton";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();
  return (
    <article className="group/post space-y-3 rounded-3xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>
          <div>
            <Link
              href={`/users/${post.user.username}`}
              className="block font-medium hover:undeline"
            >
              {post.user.displayName}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
            >
              {formatRelative(new Date(post.createdAt), new Date())}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton post={post} className="opacity-0 transition-opacity group-hover/post:opacity-100"  />
        )}
      </div>
      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
}
