"use client";

import { useSession } from "@/app/(main)/sessionProvider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import UserAvatar from "./userAvatar";
import Link from "next/link";
import { LogOutIcon, UserIcon } from "lucide-react";
import { Logout } from "@/app/(auth)/action";
import { cn } from "@/lib/utils";

interface UserButtonProps {
  className?: string;
}

// Définissez une interface étendue si nécessaire
interface ExtendedUser {
  username: string;
  avatarUrl: string;
  // Ajoutez d'autres propriétés si nécessaire
}

export default function UserButton({ className }: UserButtonProps) {
  const { user } = useSession() as { user: ExtendedUser };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          Connecté en tant que @{user.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/user/${user.username}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profil
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            Logout();
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
