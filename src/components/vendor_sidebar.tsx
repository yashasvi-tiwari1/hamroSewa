import Image from "next/image";
import {
  IconCurrencyRupeeNepalese,
  IconLayoutDashboard,
  IconLogout,
  IconSettings,
  IconSquareLetterB,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <div className="w-52 z-10 fixed inset-y-0 bg-dashboard  ">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-12">
          <Image
            src="/assets/logo.png"
            alt="logo"
            height={250}
            width={250}
            className="h-20 w-64"
          />
        </div>
        <div>
          <div className="flex items-center gap-6 mb-8 cursor-pointer">
            <Link href="/vendor" className="dashboard_text gap-6 flex">
              <IconLayoutDashboard className=" w-6 h-6" />
              Dashboard
            </Link>
          </div>
          <div className="dashboard_item">
            <Link href="/vendor/booking" className="dashboard_text flex gap-6">
              <IconSquareLetterB className="w-6 h-6" />
              Booking
            </Link>
          </div>
          <div className="dashboard_item">
            <Link href="/vendor/payment" className="dashboard_text flex gap-6">
              <IconCurrencyRupeeNepalese className=" w-6 h-6" />
              Payment
            </Link>
          </div>
          <div className="dashboard_item">
            <Link href="/vendor/setting" className="dashboard_text flex gap-6">
              <IconSettings className=" w-6 h-6" />
              Setting
            </Link>
          </div>
          <div className="dashboarcd_item">
            <Link href="/login" className="dashboard_text flex gap-6">
              <IconLogout className=" w-6 h-6" />
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
