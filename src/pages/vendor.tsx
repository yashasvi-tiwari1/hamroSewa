import { ReactElement, useState } from "react";
import SiteLayout from "@sewa/site_layouts/siteLayout";
import Booked from "@sewa/pages/booked";
import { NextPageWithLayout } from "@sewa/pages/_app";
import {IconEye, IconEyeOff} from "@tabler/icons-react";

interface FormData {
    fullName: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type FormErrors = {
    fullName: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
};

function Vendor() {

    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState<boolean>(false); // Declare showPassword and initialize it


    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    function validateEmail(email:string) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{6,64}$/;
        return passwordRegex.test(password);
    };

        const handleSubmit = (e:any) => {
        e.preventDefault();


            const newErrors: FormErrors = {
                fullName: "",
                address: "",
                phoneNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
            };

            // Helper function to set an error message for a field
            const setError = (field: string, message: string) => {
                (newErrors as any)[field] = message;
            };


            // Validate full name
            if (formData.fullName.trim() === "") {
                setError("fullName", "Full Name is required");
            }

            // Validate address
            if (formData.address.trim() === "") {
                setError("address", "Address is required");
            }

            // Validate phone number
            if (formData.phoneNumber.trim() === "") {
                setError("phoneNumber", "Phone Number is required");
            }

            // Validate email
            if (formData.email.trim() === "") {
                setError("email", "Email is required");
            } else if (!validateEmail(formData.email)) {
                setError("email", "Please enter a valid email address");
            }

            // Validate password
            if (formData.password.trim() === "") {
                setError("password", "Password is required");
            } else if (!validatePassword(formData.password)) {
                setError("password", "Password must meet the specified requirements");
            }

            // Validate confirm password
            if (formData.confirmPassword.trim() === "") {
                setError("confirmPassword", "Confirm Password is required");
            } else if (formData.password !== formData.confirmPassword) {
                setError("confirmPassword", "Passwords do not match");
            }

            // Set the newErrors object, which will update error messages in the UI
            setErrors(newErrors);

            // If there are no errors, you can submit the form or perform further actions.
        };
    return (
        <div className="md:py-20 flex justify-center md:px-16 p-8 space-y-4">
            <div className="w-full max-w-md">
                <div className="text-center">
                    <p className="text-xl font-semibold">Create an account</p>
                    <p>Please fill out the form to create your account.</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="fullName" className="label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`input_field ${
                                errors.fullName ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="label">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address/location"
                            className={`input_field ${
                                errors.address ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="label">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={(e) => {
                                const input = e.target as HTMLInputElement; // Cast to HTMLInputElement
                                const numericInput = input.value.replace(/\D/g, ''); // Remove non-numeric characters
                                const limitedInput = numericInput.substring(0, 10); // Limit to 10 digits
                                setFormData({ ...formData, phoneNumber: limitedInput });
                            }}
                            placeholder="Enter your phone number"
                            className={`input_field ${errors.phoneNumber ?"border-red-500" : "border-gray-300" }`}
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="label">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email "
                            className={`input_field ${errors.email ?"border-red-500" : "border-gray-300" }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pass" className="label">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a new strong password"
                                className={`input_field ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                            >
                                {showPassword ? (
                                    <IconEye className="h-5 w-5 text-gray-500"/>
                                ) : (
                                    <IconEyeOff className="h-5 w-5 text-gray-500"/>

                                    )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="label">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Create a new strong password"
                                className={`input_field ${
                                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                            >
                                {showPassword ? (
                                    <IconEye className="h-5 w-5 text-gray-500"/>
                                ) : (
                                    <IconEyeOff className="h-5 w-5 text-gray-500"/>

                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Vendor.getLayout = function getLayout(page: ReactElement) {
    return <SiteLayout>{page}</SiteLayout>;
};

export default Vendor;
