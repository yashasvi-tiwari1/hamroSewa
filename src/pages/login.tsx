import Image from "next/image";
import homeServiceBg from "../../public/assets/login.png";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const setLoginData = (data: {
    role: string;
    accessToken: string;
    refreshToken: string;
    name: string;
    user_Id: number;
    msg: string;
  }) => {
    console.log(data);
    if (data.role == "admin") {
      localStorage.setItem("adminInfo", JSON.stringify(data));
      navigate.push({ pathname: "/dashboard", query: { name: data.name } });
      toast.success(data.msg);
    } else if (data.role == "vendor") {
      localStorage.setItem("vendorInfo", JSON.stringify(data));
      navigate.push({ pathname: "/vendor", query: { name: data.name } });
      toast.success(data.msg);
    } else {
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate.push({ pathname: "/", query: { name: data.name } });
      toast.success(data.msg);
    }
  };
  const login = (e: any) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post(`${BASEURL}/authorization`, {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        const role = response.data.role;
        console.log(role);
        setLoginData(response.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="flex w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <div className="w-1/2 ">
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={200}
            height={200}
            className="mx-auto mb-8"
          />
          <h2 className="text-3xl font-bold text-center mt-14">Welcome</h2>
          <p className="text-teal-600 font-semibold text-center mb-6">
            Sign in to Hamro Sewa
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email Address"
                className="border rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-200"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-200"
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500 hover:text-teal-500 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="flex justify-between items-center mb-4 ">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <span
                className="text-teal-600 cursor-pointer"
                onClick={() => navigate.push("/forgot-password")}
              >
                Forgot Password?
              </span>
            </div>
            <div>
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded-md w-full"
              >
                Sign In
              </button>
            </div>
            <div className="text-right text-black pt-6 text-base flex  justify-between">
              <h2 className="text-base font-semibold">Not a member?</h2>
              <p
                className="text-base underline cursor-pointer"
                onClick={() => navigate.push("/signup")}
              >
                Sign Up Now
              </p>
            </div>
          </form>
        </div>
        <div
          className="w-1/2 bg-cover bg-center rounded-r-lg"
          style={{ backgroundImage: `url(${homeServiceBg.src})` }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
