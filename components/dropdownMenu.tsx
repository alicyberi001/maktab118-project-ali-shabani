"use client"

import React from "react";

interface MenuItem {
  label: string;
  submenu?: MenuItem[];
}

const DropdownMenu = () => {
  const menuItems: MenuItem[] = [
    {
      label: "Home",
    },
    {
      label: "About",
      submenu: [
        { label: "Our Team" },
        { label: "Our Story" },
        { label: "Careers" },
      ],
    },
    {
      label: "Services",
      submenu: [
        { label: "Web Development" },
        {
          label: "Mobile Development",
          submenu: [
            { label: "iOS Development" },
            { label: "Android Development" },
          ],
        },
        { label: "UI/UX Design" },
      ],
    },
    {
      label: "Contact",
    },
  ];

  return (
    <div className="relative">
      <nav className="bg-gray-800 text-white p-4 rounded-md">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <DropdownItem key={index} item={item} group={"outer"}/>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const DropdownItem = ({ item, group }: { item: MenuItem, group?: "outer" | "inner"  }) => {
  return (
    <li className={`relative group/${group == "outer" ? "outer" : "inner"}`}>
      <button
        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-700 rounded-md"
      >
        <span>{item.label}</span>
        {item.submenu && (
          <span className={`ml-2 text-gray-300 group-hover/${group == "outer" ? "outer" : "inner"}:text-red-500`}>▼</span>
        )}
      </button>
      {item.submenu && (
        <ul className={`absolute left-full top-0 mt-0 ml-4 hidden group-hover/${group == "outer" ? "outer" : "inner"}:block bg-gray-700 text-white w-40 rounded-md shadow-lg space-y-1`}>
          {item.submenu.map((subItem, subIndex) => (
            <DropdownItem key={subIndex} item={subItem} group={"inner"}/>
          ))}
        </ul>
      )}
    </li>
  );
};

export default DropdownMenu;
