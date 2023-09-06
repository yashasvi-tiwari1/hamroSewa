import Image from "next/image";
import {
  IconArrowLoopRight2,
  IconCurrencyDollar,
  IconLayoutDashboard,
  IconLogout,
  IconSettings,
  IconSquareLetterB,
  IconSquareLetterV,
  IconUserSquare,
} from "@tabler/icons-react";
import Link from "next/link";

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
            <Link href="/dashboard" className="dashboard_text gap-6 flex">
              <IconLayoutDashboard className=" w-6 h-6" />
              Dashboard
            </Link>
          </div>
          <div className="dashboard_item">
            <Link href="/dashboard/user" className="dashboard_text flex gap-6">
              <IconUserSquare className=" w-6 h-6" />
              Users
            </Link>
          </div>
          <div className="dashboard_item">
            <Link
              href="/dashboard/vendor"
              className="dashboard_text flex gap-6"
            >
              <IconSquareLetterV className=" w-6 h-6" />
              Vendors
            </Link>
          </div>
          <div className="dashboard_item">
            <Link
              href="/dashboard/services"
              className="dashboard_text flex gap-6"
            >
              <IconArrowLoopRight2 className=" w-6 h-6" />
              Services
            </Link>
          </div>
          <div className="dashboard_item">
            <Link
              href="/dashboard/booking"
              className="dashboard_text flex gap-6"
            >
              <IconSquareLetterB className=" w-6 h-6" />
              Booking
            </Link>
          </div>
          <div className="dashboard_item">
            <Link
              href="/dashboard/payment"
              className="dashboard_text flex gap-6"
            >
              <IconCurrencyDollar className=" w-6 h-6" />
              Payment
            </Link>
          </div>
          <div className="dashboard_item">
            <Link
              href="/dashboard/setting"
              className="dashboard_text flex gap-6"
            >
              <IconSettings className=" w-6 h-6" />
              Setting
            </Link>
          </div>
          <div className="dashboarcd_item">
            <Link href="/login" className="dashboard_text flex gap-6">
              <IconLogout className=" w-6 h-6" />
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
