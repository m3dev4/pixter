"use client";

import useFollowersInfo from "@/hooks/useFollowersInfo";
import { FollowersInfo } from "@/lib/types";
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import { Button } from "./ui/button";
import KyInstance from "@/lib/ky";
import { useState, useEffect } from "react";

interface FollowButtonProps {
  userId: string;
  initialState: FollowersInfo;
}

export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data } = useFollowersInfo(userId, initialState);
  const [isFollowing, setIsFollowing] = useState(initialState.isFollowingByUser);

  useEffect(() => {
    setIsFollowing(data.isFollowingByUser);
  }, [data.isFollowingByUser]);

  const queryKey = ["follower-info", userId];

  const { mutate } = useMutation({
    mutationFn: () =>
      isFollowing
        ? KyInstance.delete(`/api/users/${userId}/followers`)
        : KyInstance.post(`/api/users/${userId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey } as InvalidateQueryFilters);
      const previousState = queryClient.getQueryData<FollowersInfo>(queryKey);
      
      const newState = {
        followers: (previousState?.followers || 0) + (isFollowing ? -1 : 1),
        isFollowingByUser: !isFollowing,
      };

      queryClient.setQueryData<FollowersInfo>(queryKey, newState);
      setIsFollowing(!isFollowing);

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      setIsFollowing(context?.previousState?.isFollowingByUser || false);
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey } as InvalidateQueryFilters);
    },
  });

  return (
    <Button
      variant={isFollowing ? "secondary" : "default"}
      onClick={() => mutate()}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}