"use client";

import {
  MagnifyingGlassIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  BanknotesIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const InfoCards = () => {
  return (
    <div className="relative bg-gray-900 w-full h-56 flex justify-center my-24 mb-96">
      <h2 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient absolute top-10 bg-[length:200%_200%]" >در صورت انتخاب تکنو سرویس</h2>
      <div className="flex gap-4 pt-28">
        <section className="bg-white shadow-lg flex flex-col gap-3 items-center w-64 h-80 rounded-xl px-12 py-8">
          <RocketLaunchIcon className="size-10" />
          <h2 className="text-center text-xl font-semibold text-gray-900">
            ارسال اکسپرس به موقع مرسولات
          </h2>
          <p className="text-center text-sm text-gray-500">
            ما در تکنوسرویس تضمین می‌کنیم که تمامی سفارشات شما به سرعت و در
            کوتاه‌ترین زمان ممکن به دستتان برسد. با خدمات ارسال اکسپرس، تجربه
            خریدی راحت را خواهید داشت.
          </p>
        </section>
        <section className="bg-white shadow-lg flex flex-col gap-3 items-center w-64 h-80 rounded-xl px-12 py-8">
          <CheckBadgeIcon className="size-10" />
          <h2 className="text-center text-xl font-semibold text-gray-900">
            تضمین اصالت کالاها
          </h2>
          <p className="text-center text-sm text-gray-500">تمامی محصولات ارائه شده در فروشگاه تکنوسرویس با تضمین اصالت و کیفیت به مشتریان عرضه می‌شود.</p>
        </section>
        <section className="bg-white shadow-lg flex flex-col gap-3 items-center w-64 h-80 rounded-xl px-12 py-8">
          <UserGroupIcon className="size-10" />
          <h2 className="text-center text-xl font-semibold text-gray-900">
            خدمات باشگاه مشتریان
          </h2>
          <p className="text-center text-sm text-gray-500">به باشگاه مشتریان تکنوسرویس بپیوندید و از تخفیف‌های ویژه، پیشنهادات اختصاصی و خدمات اولویت‌دار بهره‌مند شوید. .</p>
        </section>
        <section className="bg-white shadow-lg flex flex-col gap-3 items-center w-64 h-80 rounded-xl px-12 py-8">
          <ClipboardDocumentCheckIcon className="size-10" />
          <h2 className="text-center text-xl font-semibold text-gray-900">
            پشتیبانی و گارانتی بلندمت
          </h2>
          <p className="text-center text-sm text-gray-500">با خرید از تکنوسرویس، از پشتیبانی حرفه‌ای و گارانتی بلندمدت برخوردار خواهید شد. تیم پشتیبانی ما همواره آماده پاسخگویی به سوالات شما و رفع مشکلات احتمالی است.</p>
        </section>
      </div>
    </div>
  );
};

export default InfoCards;
