import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    const adm = localStorage.getItem("adminInfo");
    if (adm) setAdmin(adm);
  }, []);
  if (admin) {
    const adminData = JSON.parse(admin);
    return (
      <div className=" sticky z-20 top-0 left-60 bg-dashboard ml-52 px-12 py-4  ">
        <div className="h-10 flex items-center justify-between">
          <span className="text-2xl font-medium tracking-wide text-gray-700">
            Dashboard
          </span>

          <div className="flex items-center gap-6">
            <div className="flex gap-4 items-center">
              <div>
                <Image
                  src="/assets/briefcase.svg"
                  alt="logged in profile pic"
                  height={30}
                  width={100}
                  className="w-8 h-10 rounded-xl"
                />
              </div>
              <div className="">
                <p>{adminData.name}</p>
                <p className="-mt-1">admin</p>
              </div>
              <div>
                <IconChevronDown
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => router.push("/login")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
