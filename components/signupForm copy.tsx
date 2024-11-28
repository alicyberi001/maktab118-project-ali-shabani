"use client";

export default function SignupForm() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-3 tracking-tight text-white">
            اطلاعات حساب خود را وارد کنید
          </h2>
        </div>

        <div className="mt-7 sm:mx-auto  w-[700px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              className="space-y-6 animate-fade-up animate-ease-in"
              action="#"
              method="POST"
            >
              <div className="flex justify-end gap-2">
                <div className="flex-grow">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    dir="rtl"
                  >
                    نام حانوادگی
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      autoComplete="name"
                      required
                      className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#202A30] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    dir="rtl"
                  >
                    نام
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      autoComplete="name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#202A30] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <div className="flex-grow">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    dir="rtl"
                  >
                    ایمیل یا نام کاربری
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#202A30] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    dir="rtl"
                  >
                    شماره همراه
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#202A30] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <div className="flex-grow">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    dir="rtl"
                  >
                    تکرار رمز عبور
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#202A30] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    dir="rtl"
                  >
                    رمز عبور
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#202A30] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                  dir="rtl"
                >
                  آدرس
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#202A30] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#202A30] focus:ring-[#202A30]"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-900"
                  >
                    <a className="underline" href="#">
                      قوانین
                    </a>{" "}
                    را می پذیرم
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#202A30] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2f3e46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202A30]"
                >
                  ثبت نام
                </button>
              </div>
            </form>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            حساب دارید؟
            <a
              href="/login"
              className="font-semibold leading-6 text-[#ffffffd2] hover:text-[#dedede] hover:underline mx-2"
            >
              ورود
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
