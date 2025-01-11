"use server";

import NavbarItems from "./navbarItems";
import {
  Squares2X2Icon,
  PercentBadgeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  return (
    <nav
      dir="rtl"
      className="w-full py-[10px] fixed top-0 z-10 bg-white backdrop-blur-xl flex justify-between items-center px-8 border-b-2 border-black/10 mobile:px-4"
    >
      <div className="flex gap-8 items-center mobile:gap-0">
        <a href="/">
          <img className="w-44 mobile:w-32" src="/logob.svg" alt="logo1b" />
        </a>
        <div className="flex gap-5 text-black/50 font-semibold">
          <a
            href="/allProducts"
            className="flex gap-1 items-center hover:text-gray-800  transition-colors duration-200"
          >
            <Squares2X2Icon className="size-5" />
            <span>محصولات</span>
          </a>
          <a
            href=""
            className="flex gap-1 items-center hover:text-gray-800  transition-colors duration-200"
          >
            <PercentBadgeIcon className="size-5" />
            <span>تکنوآفر</span>
          </a>
          <a
            href=""
            className="flex gap-1 items-center hover:text-gray-800  transition-colors duration-200"
          >
            <UserGroupIcon className="size-5" />
            <span>باشگاه مشتریان</span>
          </a>
        </div>
      </div>
      <NavbarItems />
    </nav>
  );
};

export default Navbar;
