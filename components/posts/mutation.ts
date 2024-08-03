import {
    InfiniteData,
    QueryFilters,
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
  import { useToast } from "../ui/use-toast";

  import { usePathname, useRouter } from "next/navigation";
  import { deletedPost } from "./action";
  import { PostsPage } from "@/lib/types";
  
  export function useDeletePostMutation() {
    const { toast } = useToast();
  
    const queryClient = useQueryClient();
  
    const router = useRouter();
  
    const pathname = usePathname();
  
    const mutation = useMutation({
      mutationFn: deletedPost,
      onSuccess: async (deletedPost) => {
        const queryFilter: QueryFilters = { queryKey: ["post-feed"] };
  
        await queryClient.cancelQueries(queryFilter);
  
        queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
          queryFilter,
          (oldData) => {
            if (!oldData) return oldData;
  
            return {
              pageParams: oldData.pageParams,
              pages: oldData.pages.map((page) => ({
                nextCursor: page.nextCursor,
                posts: page.posts.filter((p) => p.id !== deletedPost.id),
              })),
            };
          }
        );
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
  
        if (pathname === `/post/${deletedPost.id}`) {
          router.push("/");
        }
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
    return mutation;
  }
  