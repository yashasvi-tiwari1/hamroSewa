import React, { useEffect, useMemo, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import VendorSignup from "@sewa/components/vendorSignup";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contact: string;
  state: string;
  city: string;
  postal_code: string;
  street: string;
  number: string;
};
const SignUp = () => {
  const [selected, setSelected] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  useEffect(() => {
    // Retrieve user's location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.log("Error getting location:", error);
      }
    );
  }, []);
  console.log(currentLocation);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const handleDivClick = (index: number) => {
    setSelected(index);
  };
  return (
    <div className="flex justify-center bg-gray-300 ">
      <div className=" p-20 w-[900px] justify-center drop-shadow-xl">
        <div className=" flex  text-center items-center">
          <div
            className={`w-1/2  p-2  font-bold text-lg tracking-wider cursor-pointer rounded-tl-xl ${
              selected === 0
                ? "bg-teal-500 hover:bg-teal-700 text-white"
                : "bg-gray-300 text-black border drop-shadow-lg"
            }`}
            onClick={() => handleDivClick(0)}
          >
            User Form
          </div>
          <div
            className={`w-1/2  p-2  text-lg font-bold tracking-wider cursor-pointer rounded-tr-xl ${
              selected === 1
                ? "bg-teal-500 hover:bg-teal-700 text-white"
                : "bg-gray-300 text-black border drop-shadow-lg"
            } `}
            onClick={() => handleDivClick(1)}
          >
            Vendor Form
          </div>
        </div>
        <div className="">
          {selected === 0 ? (
            <Customer currentLocation={currentLocation} />
          ) : (
            <VendorSignup currentLocation={currentLocation} />
          )}
        </div>
      </div>
    </div>
  );
};
function Customer({ currentLocation }: any) {
  const navigate = useRouter();

  const validationSchema = z
    .object({
      name: z.string().min(1, { message: "Full name is required" }).max(60),
      email: z
        .string()
        .email({ message: "Invalid email format" })
        .min(1, { message: "Email is required" }),
      password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(6, { message: "password must be at least 6 characters " })
        .max(20),
      confirmPassword: z
        .string()
        .min(1, "Confirm password is required")
        .min(6, { message: "Password must be at least 6 characters " })
        .max(20),
      contact: z
        .string()
        .min(1, { message: "Contact is required" })
        .min(9, { message: "Contact must  be at least 9 digit" })
        .max(10),
      state: z.string().min(1, { message: "State is required" }).max(30),
      city: z.string().min(1, { message: "City is required" }).max(30),
      postal_code: z
        .string()
        .min(1, { message: "Postal_code is required" })
        .min(5, { message: "Postal code must be at least 5 digits " })
        .max(10),
      street: z.string().min(1, { message: "Street is required" }).max(30),
      number: z
        .string()
        .min(1, { message: "House number is required" })
        .max(20),
    })
    .partial()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });
  const formSumbit = (data: FormData) => {
    axios
      .post(`${BASEURL}/user`, {
        ...data,
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      })
      .then((response) => {
        toast.success(response?.data?.msg);
        localStorage.setItem("userInfo", JSON.stringify(response?.data));
        navigate.push({ pathname: "/", query: { name: response.data.name } });
      })
      .catch((err) => {
        console.log(err?.response?.data.message);
      });
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <>
      <div className="bg-white p-10 rounded-b-xl">
        <p className="font-bold text-2xl text-center text-teal-600 mb-10">
          Welcome to Hamro Sewa!
        </p>

        <form onSubmit={handleSubmit(formSumbit)} className="user">
          <div className="flex gap-4">
            <div className="mb-5 w-full">
              <input
                type="text"
                placeholder="Full Name"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full "
                {...register("name")}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="mb-5 w-full">
              <input
                type="text"
                placeholder="Email Address"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                {...register("email")}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-5 w-full">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                  {...register("password")}
                />
                {errors.password && <span>{errors.password.message}</span>}
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
            <div className="mb-5 w-full">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}

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
          </div>
          <div className="flex gap-4">
            <div className="mb-5 w-full">
              <input
                type="text"
                placeholder="Contact"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                {...register("contact")}
              />
              {errors.contact && <span>{errors.contact.message}</span>}
            </div>
            <div className="mb-5 w-full">
              <input
                type="text"
                placeholder="State"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                {...register("state")}
              />
              {errors.state && <span>{errors.state.message}</span>}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="mb-5 w-full">
              <input
                type="text"
                placeholder="City"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                {...register("city")}
              />
              {errors.city && <span>{errors.city.message}</span>}
            </div>
            <div className="mb-5 w-full">
              <input
                type="text"
                placeholder="Postal_Code"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                {...register("postal_code")}
              />
              {errors.postal_code && <span>{errors.postal_code.message}</span>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mb-5 w-full">
              <input
                type="text"
                placeholder="Street"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                {...register("street")}
              />
              {errors.street && <span>{errors.street.message}</span>}
            </div>
            <div className="mb-5 w-full">
              <input
                type="text"
                placeholder="House Number"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                {...register("number")}
              />
              {errors.number && <span>{errors.number.message}</span>}
            </div>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-teal-500 w-full hover:bg-teal-700 text-white py-2 px-6 rounded font-semibold tracking-wider"
            >
              {" "}
              Create An Account
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="already">Already have an account? </span>
            <Link href={"/login"} className="font-bold text-blue-600">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default SignUp;
