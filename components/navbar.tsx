"use server";

// import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CartDropdown from "./cartDropdown";
import ProfileDropdown from "./profileDropdown";
import Link from "next/link";





const Navbar: React.FC = () => {
  return (
    <nav
      dir="rtl"
      className="w-full py-[10px] fixed top-0 z-10 bg-white backdrop-blur-xl flex justify-between items-center px-8 border-b-2 border-black/10 mobile:px-4"
    >
      <div className="flex gap-8 items-center mobile:gap-0">
        <a href="/">
          <img className="w-44 mobile:w-32" src="/logo1b.svg" alt="logo1b" />
        </a>
        <div className="relative mobile:hidden">
          <input
            placeholder="محصول یا برند خود را جستجو کنید"
            className="w-96 bg-slate-200/30 rounded-md h-12 px-4 py-2 pr-11 border-0 text-sm text-gray-800 placeholder:text-slate-400"
          />
          <MagnifyingGlassIcon className="w-6 absolute right-3 top-3 text-slate-400" />
        </div>
      </div>
      <div className="flex">
      <ProfileDropdown />
      <CartDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
