import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlarmClock,
  Bell,
  HelpCircle,
  LogOutIcon,
  MessageCircleMore,
  UserRoundPenIcon,
} from "lucide-react";
import { auth } from "../../../../../auth";
import Image from "next/image";
import Logout from ".././profile/logout";
import Link from "next/link";  
import { getTranslations } from "next-intl/server";

const profileLinks = [
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: UserRoundPenIcon,
  },
  {
    name: "My Transaction",
    href: "/dashboard/myTransaction",
    icon: Bell,
  },
  {
    name: "My Requests",
    href: "/dashboard/myRequests",
    icon: MessageCircleMore,
  },
  {
    name: "My Meetings",
    href: "/dashboard/myMeeting",
    icon: AlarmClock,
  },
  {
    name: "Sign Out",
    href: "dashboard/logout",
    icon: LogOutIcon,
  },
];

export default async function ProfileMenu() {
  // const pathname = usePathname();
  const session = await auth();
  const userImage = session?.user?.image;
  const t = await getTranslations("profile-links");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Image
            src={`${userImage}`}
            width={560}
            height={620}
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {profileLinks.map((link, index) => (
          <DropdownMenuItem key={index} asChild>
            {link.name === "Sign Out" ? (
              <Logout />
            ) : (
              <Link
                key={link.name}
                href={link.href}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {`${t(link.name)}`}
              </Link>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

 
