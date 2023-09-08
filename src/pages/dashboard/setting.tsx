// components/Settings.js
import React, { ReactElement, useState } from "react";
import Layout from "@sewa/components/dashboard_layout";
import { NextPageWithLayout } from "@sewa/pages/_app";

const Settings: NextPageWithLayout = () => {
  // Initialize state for form fields
  const [formData, setFormData] = useState({
    name: "Yashasvi Tiwari",
    email: "yashasvi.tiwari.4648@gmail.com",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Handle form input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (you can add your logic here)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Send the updated data to your server or perform other actions
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="bg-white py-16 px-28 rounded shadow-md">
      <h1 className="text-2xl font-semibold">Dashboard Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-10">
          <div className="w-full md:w-1/2 px-2 mt-4">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mt-4">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex gap-10 ">
          <div className="w-full md:w-1/2 px-2 mt-4">
            <label htmlFor="current_password" className="block font-medium">
              Current Password
            </label>
            <input
              type="text"
              id="current_password"
              name="current_password"
              value={formData.current_password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mt-4">
            <label htmlFor="email" className="block font-medium">
              New Password
            </label>
            <input
              type="email"
              id="new_password"
              name="new_password"
              value={formData.new_password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-full md:w-1/2 px-2 mt-4">
            <label htmlFor="confirm_password" className="block font-medium">
              Confirm Password
            </label>
            <input
              type="email"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mt-4"></div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded font-semibold"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Settings;
