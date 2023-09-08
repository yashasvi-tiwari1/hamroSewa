import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [vendor, setVendor] = useState("");
  useEffect(() => {
    const vend = localStorage.getItem("vendorInfo");
    if (vend) setVendor(vend);
  }, []);
  if (vendor) {
    const vendorData = JSON.parse(vendor);

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
                  src="/assets/bulb.svg"
                  alt="pp"
                  height={30}
                  width={100}
                  className="w-8 h-10 rounded-xl"
                />
              </div>
              <div className="">
                <p>{vendorData.name}</p>
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
