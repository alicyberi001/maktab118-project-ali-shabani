"use server";

import LoginForm from "@/components/loginForm";

const ProductPage: React.FC = () => {
  return (
    <article dir="rtl" className="flex gap-6 justify-center mt-4 ">
      <section className="w-[70%] flex gap-3 rounded-2xl border border-gray-300 shadow-sm py-7 px-9">
        <div className="flex-grow h-full  flex flex-col gap-4">
          <p className="text-gray-950 text-lg font-semibold">
            پایه خنک کننده لپ تاپ کولر مستر مدل NOTEPAL A200
          </p>
          <p className="text-sm text-gray-700">
            Cooler Master A200 Laptop Cooler
          </p>
          <span className="w-fit flex text-sm font-semibold gap-2 border-b border-gray-300 pl-5 py-4">
            <span className="text-zinc-900">نظرات کاربران</span>
            <span className="text-cyan-600">۰ نظر</span>
          </span>
          <span className="w-fit flex flex-col text-sm font-semibold gap-2 border-b border-gray-300 pl-5 pb-2">
            <span className="flex gap-1">
              <span className="text-zinc-500">رنگ:</span>
              <span className="text-zinc-800">مشکی</span>
            </span>
            <span className="text-cyan-600">۰ نظر</span>
          </span>
          <div className="text-zinc-950 flex flex-col gap-2">
            <span>ویژگی های اصلی</span>
            <div className="w-3/4 h-56 bg-white/80 border border-gray-400 rounded-2xl flex flex-col px-4 shadow-sm">
              <div className="w-full h-1/4 border-b border-dashed border-gray-400 flex items-center gap-2">
                <span className="text-gray-700">جنس بدنه:</span>
                <span>-</span>
              </div>
              <div className="w-full h-1/4 border-b border-dashed border-gray-400 flex items-center gap-2">
                <span className="text-gray-700">پردازنده:</span>
                <span>-</span>
              </div>
              <div className="w-full h-1/4 border-b border-dashed border-gray-400 flex items-center gap-2">
                <span className="text-gray-700">رم:</span>
                <span>-</span>
              </div>
              <div className="w-full h-1/4  flex items-center gap-2">
                <span className="text-gray-700">مناسب برای:</span>
                <span>-</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%] h-full bg-slate-400">2</div>
      </section>
      <section className="flex flex-col gap-6 w-[380px] ">
        <div className="w-full flex flex-col gap-3 border border-gray-300 shadow-sm rounded-2xl px-5 py-4">
          <div className="w-full h-24 bg-slate-500 rounded-lg">1</div>
          <div className="w-full h-40 bg-red-500 rounded-lg">2</div>
          <div className="w-full h-24 bg-green-600 rounded-lg">3</div>
          <button className="w-full h-14 bg-teal-500 rounded-lg">افزودن به سبد خرید</button>
        </div>
        <div className="w-full h-52 bg-orange-500 rounded-2xl"></div>
      </section>
    </article>
  );
};

export default ProductPage;
