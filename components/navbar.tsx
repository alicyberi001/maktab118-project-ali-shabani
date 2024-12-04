"use server";

// import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  // const router = useRouter();

  // const navigate = (href: string) => {
  //   router.push(href);
  // };

  return (
    <nav
      dir="rtl"
      className="w-full py-[10px] fixed z-10 bg-white flex justify-between items-center px-8 border-b-2 border-black/10 box-border "
    >
      <div className="flex gap-8 items-center">
        <a href="/">
          <img className="w-44" src="./logo1b.svg" alt="logo2" />
        </a>
        <div className="relative">
          <input
            placeholder="محصول یا برند خود را جستجو کنید"
            className="w-96 bg-slate-200 rounded-md h-12 px-4 py-2 pr-11 border-0 text-sm text-gray-800 placeholder:text-slate-400"
          />
          <MagnifyingGlassIcon className="w-6 absolute right-3 top-3 text-slate-400" />
        </div>
      </div>
      <div className="flex gap-[1px]">
        <a
          href="#"
          className="py-1 px-4 border-[2px] border-[#202A30] font-bold text-[#202A30] rounded-lg hover:bg-[#202A30] hover:text-white"
        >
          ورود
        </a>
        <a href="#" className="py-1 px-4 font-bold text-[#202A30] rounded-lg">
          عضویت
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
