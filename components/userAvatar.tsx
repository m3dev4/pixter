import Image from "next/image";
import userPic from "@/public/images/user.png";
import { cn } from "@/lib/utils";
interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className: string;
}

export default function UserAvatar({
  avatarUrl,
  size,
  className,
}: UserAvatarProps) {
  return (
    <Image
      src={avatarUrl || userPic}
      alt="User Avatar"
      width={size || 48}
      height={size || 48}
      className={cn(
        "aspect-square h-fit rounded-full bg-secondary object-cover flex-none",
        className
      )}
    />
  );
}
