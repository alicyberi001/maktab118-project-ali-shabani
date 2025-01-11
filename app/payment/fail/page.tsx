"use client";

import { fetchProductById } from "@/api/product.service";
import LoginForm from "@/components/loginForm";
import useCartStore, { Product } from "@/lib/zustand/cart.store";
import {
  ShieldCheckIcon,
  ChevronLeftIcon,
  PlusIcon,
  BuildingStorefrontIcon,
  InboxStackIcon,
  Cog6ToothIcon,
  CheckBadgeIcon,
  HeartIcon,
  BellAlertIcon,
  ScaleIcon,
  ChatBubbleBottomCenterTextIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { redirect, useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useUserStore from "@/lib/zustand/users.store";
import { createOrders } from "@/api/orders.service";
import toast from "react-hot-toast";

const FailPage: React.FC = () => {
  return (
    <div dir="rtl" className="flex gap-6 justify-center py-32 px-14">
      <div className="relative w-[60%] flex flex-col gap-8">
        <div>سفارش لغو شد</div>
        <a href="/" className="w-48 h-14  rounded-lg">
          بازگشت به صفحه اصلی
        </a>
      </div>
    </div>
  );
};

export default FailPage;
