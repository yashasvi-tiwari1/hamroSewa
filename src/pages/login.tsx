import Image from "next/image";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="bg-gray-300 flex justify-center h-screen">
      <div className="flex p-20 w-[900px] justify-center drop-shadow-xl ">
        <div className="w-2/5 rounded-l-xl bg-white overflow-hidden h-fit">
          <Image
            src="/assets/logo.png"
            alt="logo"
            height={300}
            width={300}
            className="w-40 h-30"
          />
          <Image
            src="/assets/login.jpg"
            alt="services image"
            height={400}
            width={300}
            className="w-fit h-fit  rounded-t-lg drop-shadow-lg"
          />
        </div>

        <div className="w-3/5 bg-white p-5 rounded-r-xl h-fit">
          <p className="font-bold text-2xl text-center mb-10">Welcome</p>
          <p className="text-teal-700 font-semibold mb-5">
            Sign in to Hamro Sewa
          </p>
          <form action="http://localhost:3000">
            <div className="mb-5">
              <input
                type="text"
                placeholder="Email Address"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                required={true}
              />
            </div>
            <div className="mb-5">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                  required={true}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                >
                  {showPassword ? (
                    <IconEye className="h-5 w-5 text-gray-500" />
                  ) : (
                    <IconEyeOff className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-between mb-7 gap-10">
              <div>
                <input type="checkbox" />
                <span className="ml-2">Remember Me</span>
              </div>
              <div>
                <span className="text-teal-500">
                  <u>Forgot Password ?</u>
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-6 rounded"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="inline-flex items-center justify-center w-full gap-3 ">
            <hr className=" w-1/2 h-0.5 my-8 bg-gray-500 border-0 rounded " />
            <span className="font-semibold "> or </span>
            <hr className=" w-1/2 h-0.5 my-8 bg-gray-500 border-0 rounded " />
          </div>
          <div className="-mt-5  py-1 px-2 flex gap-2  text-right  float-right text-gray-700 ">
            <span> Not a member?</span>
            <Link href="/signup" className="font-semibold ">
              <u>Sign Up Now</u>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
