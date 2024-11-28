"use server";

// import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  // const router = useRouter();

  // const navigate = (href: string) => {
  //   router.push(href);
  // };

  return (
    <nav dir="rtl" className="w-full py-[10px] bg-white backdrop-blur-md flex justify-between items-center px-8 border-b-2 border-black/10 box-border ">
      <div className="flex gap-2 items-center">
        <img className="w-44 h-12" src="./logo1b.svg" alt="logo2" />
      </div>
      <div className="flex gap-[1px]">
        <a
          href="#"
          className="py-2 px-3 border-[3px] border-[#202A30] font-bold text-[#202A30] rounded-lg hover:bg-[#202A30] hover:text-[#D4D9D5]"
        >
        ورود
        </a>
        <a
          href="#"
          className="py-2 px-3 font-bold text-[#202A30] rounded-lg"
        >
        عضویت
        </a>
      </div>
    </nav>
  );
};


export default Navbar;
