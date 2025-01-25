/* eslint-disable @next/next/no-img-element */
"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";

import { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import useCartStore, { Product } from "@/lib/zustand/cart.store";
import {
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon, TrashIcon } from "lucide-react";

const CartDropdown = () => {
  const {
    cart,
    totalAmount,
    decreaseQuantity,
    addToCart,
    ProductsCounter,
    totalProducts,
    fetchCart
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleDelete = (id: string) => {
    decreaseQuantity(id);
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
        className="flex items-center relative px-3 py-3 text-sm font-medium rounded-l-md border-r border-gray-200  hover:shadow focus:outline-none "
      >
        <span className="absolute top-1.5 right-1 size-[14px] text-xs rounded-full bg-cyan-600 text-white">
          {ProductsCounter()}
        </span>
        <ShoppingCartIcon className="size-5 text-gray-800 " />
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
        <div className="absolute left-1 mt-2 w-[400px] origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {cart.length == 0 ? (
            <div className="h-64 w-full flex flex-col justify-center items-center ">
              <img
                src="/static_emptyBasket.webp"
                alt="emptyCart"
                className="size-40"
              />
              <h2 className="font-semibold mt-1">سبد خرید شما خالی است</h2>
              <h2 className="text-gray-600 text-sm mb-6">
                میتوانید برای انتخاب محصول به صفحه محصولات برگردید
              </h2>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="flex items-center justify-between text-sm bg-slate-200 rounded-md px-5 py-2 text-gray-800 mx-4">
                <span>سبد خرید شما</span>
                <span className="text-gray-600 text-sm">
                  {totalProducts()} عدد
                </span>
              </h3>
              <ul
                dir="rtl"
                className="mt-2 space-y-2 max-h-[330px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400"
              >
                {cart.map((product) => (
                  <li className="mx-4 my-2" key={product._id}>
                    <section className="flex gap-3 rounded-2xl border border-gray-300 bg-white/50 shadow-sm py-4 px-5">
                      <div className="flex-grow h-full flex flex-col gap-2 mt-2">
                        <p className="text-gray-950 text-sm text-right font-semibold w-52 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-700 text-right w-48 truncate">
                          {product.description}
                        </p>
                        <span className="w-fit flex flex-col text-sm font-semibold gap-2 border-t border-gray-300 pl-5 pt-1">
                          <div className="flex gap-2 items-center py-2 text-sky-600">
                            <CheckBadgeIcon className="w-5" />
                            <span className="text-xs ">
                              18 ماه گارانتی شرکتی
                            </span>
                          </div>
                        </span>
                        <div className="flex items-center gap-4">
                          <PlusIcon
                            onClick={() => handleAddToCart(product)}
                            className="text-gray-900 w-5 hover:cursor-pointer"
                          />
                          <span>{product.quantity}</span>
                          <TrashIcon
                            onClick={() => handleDelete(product._id)}
                            className="text-red-700 w-5 hover:cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end w-[40%]">
                        <img
                          src={`http://localhost:8000/images/products/images/${product.image[0]}`}
                          alt={product.name}
                          className=""
                        />
                        <span className="text-left font-medium">
                          {product.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          تومان
                        </span>
                      </div>
                    </section>
                  </li>
                ))}
              </ul>
              <div className=" border-t border-gray-200 pt-4">
                <Link href={"/cart"}>
                  <button className="flex justify-center gap-5 w-full mt-2 px-2 py-3 text-base font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none">
                    <span>ثبت سفارش</span>
                    <span>|</span>
                    <span>
                      {totalAmount()
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      تومان
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Transition>
    </div>
  );
};

export default CartDropdown;
