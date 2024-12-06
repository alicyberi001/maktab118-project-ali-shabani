"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth_admin_login } from "@/api/adminLogin.service";
import { IAuth_admin_login, IAuth_admin_login_Res } from "@/types/auth.api";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

const validationSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof validationSchema>;

const AdminLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async ({ username, password }: IAuth_admin_login) => {
    try {
      const authRes = await auth_admin_login({ username, password });
      console.log(authRes);
      const { accessToken, refreshToken } = authRes.token;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      toast.success("وارد شدید");
      setTimeout(() => {
        redirect("/admin_panel/orders");
      }, 3000); 
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-3 tracking-tight text-white">
          ورود به پنل ادمین
        </h2>
      </div>

      <div className="mt-7 mx-auto w-full max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 animate-fade-up animate-ease-in"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
                dir="rtl"
              >
                ایمیل یا نام کاربری
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="username"
                  {...register("username")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#202A30] sm:text-sm sm:leading-6"
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div>
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
                  type="password"
                  {...register("password")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#202A30] sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 rounded border-gray-300 text-[#202A30] focus:ring-[#202A30]"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm leading-6 text-gray-900"
                >
                  بخاطر بسپار
                </label>
              </div>

              <div className="text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-[#202A30] hover:text-[#2e3b44]"
                >
                  فراموشی رمز عبور
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#202A30] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#2f3e46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202A30]"
              >
                ورود
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
