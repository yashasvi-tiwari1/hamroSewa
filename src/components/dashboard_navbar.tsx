import { IconBell, IconChevronDown, IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className=" sticky z-20 top-0 left-60 bg-dashboard ml-52 px-12 py-4  ">
      <div className="h-10 flex items-center justify-between">
        <span className="text-2xl font-medium tracking-wide text-gray-700">
          Dashboard
        </span>
        <div className="relative  ">
          <input
            type="text"
            className="w-68 h-9 border border-gray-300 rounded-xl px-10 nav "
            placeholder="search player..."
          />
          <IconSearch className="absolute w-5 h-5 ml-3 -mt-7 text-gray-600" />
        </div>
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer">
            <IconBell className="w-7 h-7 text-yellow-500" />
            <span className="absolute text-red-600 font-bold ml-5 -mt-10">
              {" "}
              5
            </span>
          </div>

          <div className="flex gap-4 items-center">
            <div>
              <Image
                src="/assets/profile.jpg"
                alt="logged in profile pic"
                height={30}
                width={100}
                className="w-8 h-10 rounded-xl"
              />
            </div>
            <div className="">
              <p>Yashasvi</p>
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
