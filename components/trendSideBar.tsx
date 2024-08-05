import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import UserAvatar from "./userAvatar";
import { Button } from "./ui/button";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";
import { getUserDataSelect } from "@/lib/types";
import FollowButton from "./followButton";

export default function TrendsSideBar() {
  return (
    <div className="sticky top[2.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <Following />
        <Trending />
      </Suspense>
    </div>
  );
}

async function Following() {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFollowing = await prisma.user.findMany({
    where: {
      NOT: {
        id: user?.id,
      },
    },
    select: {
      ...getUserDataSelect(user.id),
      followers: {
        where: {
          followerId: user.id
        },
        select: {
          followerId: true
        }
      }
    },
    take: 5,
  });
  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Followers</div>
      {usersToFollowing.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-3">
          <Link
            href={`/users/${user.username}`}
            className="flex items-center gap-3"
          >
            <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
            <div>
              <p className="line-clam-1 break-all font-semibold">
                {user.displayName}
              </p>
              <p className="line-clamp-1 break-all font-semibold">
                @{user.username}
              </p>
            </div>
          </Link>
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowingByUser: !!user.followers.some(
                ({ followerId }) => followerId === user.id
              ),
            }}
          />
        </div>
      ))}
    </div>
  );
}

const getTrendingTopics = unstable_cache(
  async () => {
    try {
      const result = await prisma.$queryRaw<
        { hashtag: string; count: bigint }[]
      >`
          SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
          FROM posts
          GROUP BY hashtag
          ORDER BY count DESC, hashtag ASC
          LIMIT 10
        `;
      return result.map((row) => ({
        hashtag: row.hashtag,
        count: Number(row.count),
      }));
    } catch (error) {
      console.error("Error fetching trending topics:", error);
      return [];
    }
  },
  ["trending-topics"],
  { revalidate: 3600 }
);

async function Trending() {
  const trendingTopics = await getTrendingTopics();

  if (trendingTopics.length === 0) {
    return <div>No trending topics at the moment.</div>;
  }

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Trending</div>
      {trendingTopics.map(({ hashtag, count }) => (
        <Link href={`/hashtag/${hashtag}`} key={hashtag} className="block py-2">
          <p className="line-clamp-1 break-all font-semibold hover:underline">
            {hashtag}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatNumber(count)} {count === 1 ? "post" : "posts"}
          </p>
        </Link>
      ))}
    </div>
  );
}
