/* eslint-disable @next/next/no-img-element */
"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChartBarSquareIcon,
  FolderIcon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3Icon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

const navigation = [
  {
    name: "سفارش ها",
    href: "/admin_panel/orders",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "مدیریت کالا",
    href: "/admin_panel/product_manager",
    icon: FunnelIcon,
    current: false,
  },
  {
    name: "مدیریت موجودی و قیمت ها",
    href: "/admin_panel/price_manager",
    icon: ChartBarSquareIcon,
    current: false,
  },
  {
    name: "خروج",
    href: "/admins_login",
    icon: ArrowLeftStartOnRectangleIcon,
    current: false,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 xl:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[#2f384386]" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#202A30] px-6 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <Image
                        className=""
                        src="/logo1.svg"
                        alt="Your Company"
                        width={200}
                        height={45}
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                          <a
                            href="#"
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                          >
                            <Image
                              className=""
                              src=""
                              alt="Your Company"
                              width={200}
                              height={45}
                            />
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">Tim Cook</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Static sidebar for desktop */}
        <div className="fixed inset-y-0 z-50 flex w-80 flex-col mobile:hidden">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#202A30] px-6 my-3 mx-3 ring-1 ring-white/5 pt-5 rounded-3xl">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                className=""
                src="/logo.svg"
                alt="Your Company"
                width={200}
                height={45}
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src="./logo.svg"
                      alt="aaa"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">ادمین:‌ علی شعبانی</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Sticky search header */}
        {/* <div className="xl:fixed top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-[#202A30] px-4 shadow-sm sm:px-6 lg:px-8 w-full"> */}
        <button
          type="button"
          className="absolute top-1 p-2.5 text-white xl:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-5 w-5 text-black" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
