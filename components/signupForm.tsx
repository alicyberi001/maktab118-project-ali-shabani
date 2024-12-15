"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { auth_user_signup } from "@/api/adminLogin.service";
import { IAuth_user_signup } from "@/types/auth.api";

const signupSchema = z
  .object({
    firstName: z.string().nonempty("نام الزامی است."),
    lastName: z.string().nonempty("نام خانوادگی الزامی است."),
    email: z.string().email("ایمیل معتبر نیست."),
    phone: z
      .string()
      .regex(/^09\d{9}$/, "شماره تلفن باید با 09 شروع شود و 11 رقم باشد."),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد."),
    confirmPassword: z.string().min(6, "تکرار رمز عبور الزامی است."),
    address: z.string().nonempty("آدرس الزامی است."),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "پذیرش قوانین الزامی است." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن باید یکسان باشند.",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (
    // data: SignupFormValues,
    { username, password, address, firstname, lastname, phoneNumber }: IAuth_user_signup
  ) => {
    try {
      // const authRes = await auth_user_signup({
      //   firstname: data.firstName,
      //   lastname: data.lastName,
      //   username: data.email,
      //   password: data.password,
      //   phoneNumber: data.phone,
      //   address: data.address,
      // });
      const authRes = await auth_user_signup({
        firstname,
        lastname,
        username,
        password,
        phoneNumber,
        address,
      });
      console.log(authRes);
      const { accessToken, refreshToken } = authRes.token;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      toast.success("ثبت نام با موفقیت انجام شد");
      // setTimeout(() => {
      //   redirect("/");
      // }, 3000);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 px-8">
      <div className="mx-auto w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold text-white">
          اطلاعات حساب خود را وارد کنید
        </h2>
      </div>

      <div className="mt-7 mx-auto w-[700px]">
        <div className="bg-white px-6 py-12 shadow rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-end gap-2">
              <div className="flex-grow">
                <label
                  className="block text-sm font-medium text-gray-900"
                  dir="rtl"
                >
                  نام خانوادگی
                </label>
                <input
                  {...register("lastName")}
                  className="border-0 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="flex-grow">
                <label
                  className="block text-sm font-medium text-gray-900"
                  dir="rtl"
                >
                  نام
                </label>
                <input
                  {...register("firstName")}
                  className="border-0 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <div className="flex-grow">
                <label
                  className="block text-sm font-medium text-gray-900"
                  dir="rtl"
                >
                  ایمیل
                </label>
                <input
                  {...register("email")}
                  className="border-0 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex-grow">
                <label
                  className="block text-sm font-medium text-gray-900"
                  dir="rtl"
                >
                  شماره همراه
                </label>
                <input
                  {...register("phone")}
                  className="border-0 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <div className="flex-grow">
                <label
                  className="block text-sm font-medium text-gray-900"
                  dir="rtl"
                >
                  رمز عبور
                </label>
                <input
                  {...register("password")}
                  type="password"
                  className="border-0 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex-grow">
                <label
                  className="block text-sm font-medium text-gray-900"
                  dir="rtl"
                >
                  تکرار رمز عبور
                </label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className="border-0 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-900"
                dir="rtl"
              >
                آدرس
              </label>
              <input
                {...register("address")}
                className="border-0 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  {...register("acceptTerms")}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-900">
                  <a className="underline">قوانین</a> را می‌پذیرم
                </label>
                {errors.acceptTerms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>
              <p className="mt-4 text-center text-sm text-gray-500">
                حساب دارید؟
                <a
                  href="/login"
                  className="font-semibold leading-6 text-[#2f3e46] hover:text-[#3b4c55] hover:underline mx-2"
                >
                  ورود
                </a>
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#202A30] px-3 py-2 text-sm text-white hover:bg-[#2f3e46]"
            >
              ثبت نام
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
