"use client";

import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/solid";
import {
  UserCircleIcon,
  WalletIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import useUserStore from "@/lib/zustand/users.store";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {users} = useUserStore()

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-3 text-sm font-medium rounded-r-md border-l border-gray-200  hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-700"
      >
        <UserIcon className="size-5 text-gray-800" />
      </button>

      {/* Dropdown Menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div
          dir="rtl"
          className="absolute left-1 mt-2 w-64 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none"
        >
          <div className="p-4 flex flex-col gap-3">
            <h3 className="text-lg text-right font-semibold text-gray-700">
              {`${users[0].firstname} ${users[0].lastname}`}
            </h3>
            <ul className="mt-2 space-y-3">
              <li className=" text-gray-600">
                <a href="" className="flex items-center gap-1">
                  <UserCircleIcon className="size-6" />
                  <span>حساب کاربری</span>
                </a>
              </li>
              <li className=" text-gray-600">
                <a href="" className="flex items-center gap-1">
                  <WalletIcon className="size-6" />
                  <span>کیف پول</span>
                </a>
              </li>
              <li className=" text-gray-600">
                <a href="" className="flex items-center gap-1">
                  <ArrowLeftStartOnRectangleIcon className="size-6" />
                  <span>خروج</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default ProfileDropdown;
