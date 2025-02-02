"use client";

import useUserStore from "@/lib/zustand/users.store";
import ProfileDropdown from "./profileDropdown";
import CartDropdown from "./cartDropdown";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const NavbarItems = () => {
  const { totalUsers } = useUserStore();
  return (
    <>
      {totalUsers() !== 0 ? (
        <div className="flex">
          <ProfileDropdown />
          <CartDropdown />
        </div>
      ) : (
        <div className="flex">
          <Link
            href={"/login"}
            className="flex gap-1 items-center border border-gray-600 px-3 py-2 text-sm rounded-md hover:text-white hover:bg-slate-900 hover:border-gray-900 ml-4"
          >
            <ArrowRightStartOnRectangleIcon className="size-6" />
            <span>ورود | ثبت نام</span>
          </Link>
          <CartDropdown />
        </div>
      )}
    </>
  );
};

export default NavbarItems;
