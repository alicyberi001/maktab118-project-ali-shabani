"use client"

import {
  ShoppingCartIcon,
  UserIcon
} from "@heroicons/react/24/solid";

import { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";

const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        className="flex items-center px-3 py-3 text-sm font-medium rounded-md border-r border-gray-200  hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-700"
      >
        <ShoppingCartIcon className="size-5 text-gray-800"/>
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
          className="absolute left-1 mt-2 w-64 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-700">سبد خرید شما</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex justify-between text-gray-600">
                <span>محصول 1</span>
                <span>120,000 تومان</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>محصول 2</span>
                <span>75,000 تومان</span>
              </li>
              <li className="flex justify-between text-gray-600">
                <span>محصول 3</span>
                <span>45,000 تومان</span>
              </li>
            </ul>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-800 font-medium">
                <span>جمع کل</span>
                <span>240,000 تومان</span>
              </div>
              <button
                className="w-full mt-3 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                ادامه به پرداخت
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default CartDropdown;
