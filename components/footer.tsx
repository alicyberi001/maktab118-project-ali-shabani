/* eslint-disable @next/next/no-img-element */
"use server";

const Footer: React.FC = () => {
  return (
    <div className="bg-[#202A30] flex flex-col items-center pt-16 pb-8 gap-7 text-white rounded-t-[150px] mx-4 mt-40">
      <div className="flex gap-16 items-center mobile:flex-col">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="logo1" className="w-36" />
          <div className="flex gap-2">
            <img src="./github.svg" alt="" className="w-4" />
            <img src="./linkedin.svg" alt="" className="w-4" />
            <img src="./telegram.svg" alt="" className="w-4" />
            <img src="./x1.svg" alt="" className="w-4" />
            <img src="./instagram.png" alt="" className="w-4" />
          </div>
        </div>
        <div dir="rtl" className="flex gap-14 mobile:flex-col">
          <div className="flex flex-col gap-3 text-sm mobile:items-center">
            <span className="mb-2 font-semibold">پرفروش ترین محصولات</span>
            <a href="#">آیفون ۱۳</a>
            <a href="#">گوشی اس ۲۴</a>
            <a href="#">شیاومی</a>
            <a href="#">ساعت هوشمند</a>
          </div>
          <div className="flex flex-col gap-3 text-sm mobile:items-center">
            <span className="mb-2 font-semibold">پس از خرید</span>
            <a href="#">تضمین رجیستری</a>
            <a href="#">رویه بازگرداندن کالا</a>
            <a href="#">رهگیری سفارش</a>
            <a href="#">سوالات متدوال</a>
          </div>
          <div className="flex flex-col gap-3 text-sm mobile:items-center">
            <span className="mb-2 font-semibold">قوانین و مقررات</span>
            <a href="#">قوانین و خط مشی</a>
            <a href="#">حریم خصوصی کاربران</a>
            <a href="#">ارزیابی مشتریان</a>
            <a href="#">چرا تکنو سرویس</a>
          </div>
          <div className="flex flex-col gap-3 text-sm mobile:items-center">
            <span className="mb-2 font-semibold">درباره ما</span>
            <a href="#">تکنو سرویس در یک نگاه</a>
            <a href="#">اهداف و تعهدات ما</a>
            <a href="#">سوالات متداول</a>
            <a href="#">تماس با ما</a>
          </div>
        </div>
      </div>
      <div className="w-3/4 border-t-2 border-[#D4D9D5] text-center pt-3">
        All rights received | Ali shabani
      </div>
    </div>
  );
};

export default Footer;
