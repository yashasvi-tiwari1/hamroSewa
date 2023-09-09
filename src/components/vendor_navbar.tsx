import {
  IconChevronDown,
  IconLogout,
  IconUserCheck,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CustomDialog from "@sewa/pages/dialog-page";
import LoadMoney from "@sewa/pages/vendor/wallet";
import Link from "next/link";

function Dropdown() {
  const handleLogout = () => {};
  return (
    <div className="absolute mt-2 right-0" onClick={(e) => e.stopPropagation()}>
      <div className="bg-white border border-gray-300 rounded shadow-md">
        <ul>
          <li className="cursor-pointer p-2 hover:bg-gray-100 transition-colors duration-300">
            <Link href="/login" className="flex gap-2">
              <span>
                <IconLogout />
              </span>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [vendor, setVendor] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const vend = localStorage.getItem("vendorInfo");
    if (vend) setVendor(vend);
  }, []);

  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`sticky z-20 top-0 left-60 bg-dashboard ml-52 px-12 py-4 ${
        isDialogOpen ? "hidden" : ""
      }`}
    >
      <div className="h-10 flex items-center justify-between">
        <span className="text-2xl font-medium tracking-wide text-gray-700">
          Dashboard
        </span>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 items-center">
            <div>
              <IconUserCheck />
            </div>
            <div className="">
              <p>name</p>
            </div>
            <div
              className="relative"
              ref={dropdownRef as React.RefObject<HTMLDivElement>}
            >
              <div onClick={handleIconClick}>
                <IconChevronDown className="w-4 h-4 cursor-pointer" />
              </div>
              {isDropdownOpen && <Dropdown />}
            </div>
            <div>
              <span className="font-semibold">Balance: Rs 50000 </span>
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white py-1 px-2 rounded ml-4 text-base"
                onClick={openDialog}
              >
                Withdraw
              </button>
              <LoadMoney isOpen={isDialogOpen} onClose={closeDialog} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // }
}
