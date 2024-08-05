import KyInstance from "@/lib/ky";
import { FollowersInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useFollowersInfo(
  userId: string,
  initialState: FollowersInfo
) {
  const query = useQuery({
    queryKey: ["followers-info", userId],
    queryFn: () =>
      KyInstance.get(`/api/users/${userId}/followers`).json<FollowersInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  return query;
}
