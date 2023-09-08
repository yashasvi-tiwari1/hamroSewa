import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
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
  description: string;
  service_type: string;
};
function VendorSignup({ currentLocation }: any) {
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
      description: z
        .string()
        .min(1, { message: "Description is required" })
        .max(255),
      service_type: z.string(),
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
    console.log(data);
    axios
      .post(`${BASEURL}/vendor`, {
        ...data,
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      })
      .then((response) => {
        toast.success(response?.data?.msg);
        localStorage.setItem("vendorInfo", JSON.stringify(response?.data));
        navigate.push({
          pathname: "/vendor",
          query: { name: response.data.name },
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
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
          <div className="mb-5 w-full">
            <select
              placeholder="Select Service_Type"
              className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
              {...register("service_type")}
            >
              <option value="" disabled selected>
                Select an Service Type
              </option>
              <option value="Plumber">Plumber</option>
              <option value="Painter">Painter</option>
              <option value="Electrician">Electrician</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Carepenter">Carpenter</option>
              <option value="Gardener">Gardener</option>
              <option value="Decorator">Decorator</option>
              <option value="Builder">Builder</option>
              <option value="Welder">Welder</option>
              <option value="Helper">Helper</option>
            </select>
            {errors.service_type && <span>{errors.service_type.message}</span>}
          </div>
          <div className="mb-5 w-full">
            <textarea
              rows={2}
              placeholder="Description of your work and experience..."
              className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
              {...register("description")}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="bg-teal-500 w-full hover:bg-teal-700 text-white py-2 px-6 rounded font-semibold tracking-wider"
            >
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
export default VendorSignup;
