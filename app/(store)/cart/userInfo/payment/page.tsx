"use client";

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const navigation = [
  { name: 'پروژه‌ها', href: '#', icon: FolderIcon, current: false },
  { name: 'استقرارها', href: '#', icon: ServerIcon, current: true },
  { name: 'فعالیت', href: '#', icon: SignalIcon, current: false },
  { name: 'دامنه‌ها', href: '#', icon: GlobeAltIcon, current: false },
  { name: 'مصرف‌ها', href: '#', icon: ChartBarSquareIcon, current: false },
  { name: 'تنظیمات', href: '#', icon: Cog6ToothIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Wrapper with RTL */}
      <div dir="rtl" className="bg-gray-900 text-white">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900 px-6 ring-1 ring-white/10">
                  <div className="flex h-16 items-center">
                    <button
                      type="button"
                      className="ml-auto p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                  <nav className="flex flex-col gap-y-7">
                    <ul role="list" className="space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800',
                              'group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold'
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="xl:pl-72">
          <div className="sticky top-0 z-40 flex h-16 items-center gap-x-6 bg-gray-900 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="p-2.5 text-white xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <form className="flex flex-1">
              <label htmlFor="search-field" className="sr-only">
                جستجو
              </label>
              <div className="relative w-full">
                <MagnifyingGlassIcon
                  className="absolute inset-y-0 right-0 h-full w-5 text-gray-500"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block w-full bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 sm:text-sm pr-8"
                  placeholder="جستجو..."
                  type="search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
