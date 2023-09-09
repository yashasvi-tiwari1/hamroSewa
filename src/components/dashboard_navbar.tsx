import {
  IconChevronDown,
  IconLogout,
  IconUserCheck,
} from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
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
  const [admin, setAdmin] = useState("");
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

  // useEffect(() => {
  //   const adm = localStorage.getItem("adminInfo");
  //   if (adm) setAdmin(adm);
  // }, []);
  // if (admin) {
  //   const adminData = JSON.parse(admin);
  return (
    <div className=" sticky z-20 top-0 left-60 bg-dashboard ml-52 px-12 py-4  ">
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
              {/*<p>{adminData.name}</p>*/}
              <p className="-mt-1">admin</p>
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
          </div>
        </div>
      </div>
    </div>
  );
  // }
}
