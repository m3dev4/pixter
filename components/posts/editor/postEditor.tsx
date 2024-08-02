"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Starterki from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "./action";
import UserAvatar from "@/components/userAvatar";
import { useSession } from "@/app/(main)/sessionProvider";
import { Button } from "@/components/ui/button";
import "./style.css";
import { useMutation } from "@tanstack/react-query";
import { useMutationPost } from "./mutation";
import PostsLoading from "../postLoading";
import ButtonLoading from "@/components/buttonLoading";

export default function PostEditor() {
  const { user } = useSession();

  const mutation = useMutationPost()

  const editor = useEditor({
    extensions: [
      Starterki.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

   function onSubmit() {
     mutation.mutate(input, {
      onSuccess: () => { 
        editor?.commands.clearContent();   
      }
     })
  }
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3 "
        />
      </div>
      <div className="flex justify-end">
        <ButtonLoading
          onClick={onSubmit}
          loading={mutation.isPending}
          disabled={!input.trim()}
          className="min-w-20"
        >
          Post
        </ButtonLoading>
      </div>
    </div>
  );
}
