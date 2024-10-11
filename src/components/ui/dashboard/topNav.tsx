import LocaleSwitcher from "@/components/LocaleSwitcher";
import { auth } from "../../../../auth";
import UserNavLinks from "./nav-links";
import ProfileMenu from "@/components/ui/dashboard/profile-menu/profile-menu";
import { UserRepository } from "@/lib/user-management/user.repository";

export default async function TopNav() {
  const session = await auth();
  const userRole = session?.user.role;
  const user = new UserRepository();
  const userDeatils = await user.getById(session?.user.uId!);
  const credits = userDeatils?.credits ? userDeatils?.credits : 0;
  return (
    <div className="flex h-full flex-row px-3 py-4 md:px-2">
      <div className="grid grid-row-2 sm:flex sm:flex-col divide-x divide-gray-400">
        <LocaleSwitcher />
        <div className="flex items-center bg-gray-700 px-4 py-2 rounded-lg">
          <span className="text-gray-400 mr-2">Credits:</span>
          <span className="text-white font-semibold text-lg">{credits}</span>
        </div>
      </div>

      <div className="flex grow justify-end flex-row ">
        <UserNavLinks role={userRole!} />
        <ProfileMenu />
      </div>
    </div>
  );
}
