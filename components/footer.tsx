"use server";

const Footer: React.FC = () => {
  return (
    <div className="bg-[#202A30] h-72 flex justify-center pt-7">
      <div className="flex gap-16 items-center">
        <div dir="rtl" className="flex gap-14">
          <div className="flex flex-col gap-3 text-sm">
            <span className="mb-2 font-semibold">پرفروش ترین محصولات</span>
            <a href="#">آیفون ۱۳</a>
            <a href="#">گوشی اس ۲۴</a>
            <a href="#">شیاومی</a>
            <a href="#">ساعت هوشمند</a>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="mb-2 font-semibold">پس از خرید</span>
            <a href="#">تضمین رجیستری</a>
            <a href="#">رویه بازگرداندن کالا</a>
            <a href="#">رهگیری سفارش</a>
            <a href="#">سوالات متدوال</a>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="mb-2 font-semibold">قوانین و مقررات</span>
            <a href="#">قوانین و خط مشی</a>
            <a href="#">حریم خصوصی کاربران</a>
            <a href="#">ارزیابی مشتریان</a>
            <a href="#">چرا تکنو سرویس</a>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="mb-2 font-semibold">درباره ما</span>
            <a href="#">تکنو سرویس در یک نگاه</a>
            <a href="#">اهداف و تعهدات ما</a>
            <a href="#">سوالات متداول</a>
            <a href="#">تماس با ما</a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <img src="./logo1.svg" alt="logo1" className="w-36" />
          <div className="flex gap-2">
            <img src="./github.svg" alt="" className="w-5" />
            <img src="./linkedin.svg" alt="" className="w-5" />
            <img src="./telegram.svg" alt="" className="w-5" />
            <img src="./x1.svg" alt="" className="w-5" />
            <img src="./instagram.png" alt="" className="w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
