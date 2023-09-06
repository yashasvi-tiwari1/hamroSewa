import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useRef, useState } from "react";
import Layout from "@sewa/components/vendor_layout";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";

const Booking: NextPageWithLayout = () => {
    const services = [
        {
            id: "1",
            userName: "Yashasvi Tiwari",
            vendorName: "Sabin Tiwari",
            serviceType: "Plumbing",
            status: "active",
            description: "My house toilet outlet doesn't work properly",
        },
        {
            id: "2",
            userName: "Yashasvi Tiwari",
            vendorName: "Sabin Tiwari",
            serviceType: "Plumbing",
            status: "active",
            description: "My house toilet outlet doesn't work properly",
        },
        {
            id: "3",
            userName: "Yashasvi Tiwari",
            vendorName: "Sabin Tiwari",
            serviceType: "Plumbing",
            status: "active",

            description: "My house toilet outlet doesn't work properly",
        },
        {
            id: "4",
            userName: "Yashasvi Tiwari",
            vendorName: "Sabin Tiwari",
            serviceType: "Plumbing",
            status: "inactive",

            description: "My house toilet outlet doesn't work properly",
        },
        {
            id: "5",
            userName: "Yashasvi Tiwari",
            vendorName: "Sabin Tiwari",
            serviceType: "Plumbing",
            status: "active",

            description: "My house toilet outlet doesn't work properly",
        },
        {
            id: "6",
            userName: "Yashasvi Tiwari",
            vendorName: "Sabin Tiwari",
            serviceType: "Plumbing",
            status: "active",

            description: "My house toilet outlet doesn't work properly",
        },
        {
            id: "7",
            userName: "Yashasvi Tiwari",
            vendorName: "Sabin Tiwari",
            serviceType: "Plumbing",
            status: "inactive",

            description: "My house toilet outlet doesn't work properly",
        },
        {
            id: "8",
            userName: "Yashasvi Tiwari",
            vendorName: "Sabin Tiwari",
            serviceType: "Plumbing",
            status: "inactive",
            description: "My house toilet outlet doesn't work properly",
        },
        {
            id: "9",
            userName: "Yashasvi Tiwari",
            vendorName: "Sabin Tiwari",
            serviceType: "Plumbing",
            status: "inactive",
            description: "My house toilet outlet doesn't work properly",
        },
        {
            id: "10",
            userName: "Yashasvi Tiwari",
            vendorName: "Sabin Tiwari",
            serviceType: "Plumbing",
            status: "active",
            description: "My house toilet outlet doesn't work properly",
        },
    ];

    const router = useRouter();
    const handleEdit = (userId: string) => {
        router.push("/signup");
    };
    const handleDelete = (userId: string) => {
        console.log(`delete user ${userId}`);
    };

    return (
        <>
            <div className="bg-dashboard  p-4 rounded-lg">
                <div className="flex justify-between  items-center px-4  ">
                    <div className="flex items-center gap-6">
                        <span>Total Booking: 100 </span>
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                            <button
                                className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded font-semibold tracking-wider"
                                onClick={() => router.push("/addService")}
                            >
                                Add Services
                            </button>
                        </div>
                    </div>
                    <div className="relative user-search">
                        <input
                            type="search"
                            placeholder="Search services ..."
                            className="p-2 border rounded-lg px-12 "
                        />
                        <IconSearch className="absolute -mt-8  ml-3 text-gray-500" />
                    </div>
                </div>
                <div className="px-4 flex justify-center mx-auto container mt-10">
                    <table className="border-2 table-auto ">
                        <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="border px-4 py-2">User Name</th>
                            <th className="border px-4 py-2">Vendor Name</th>
                            <th className="border px-4 py-2">Service Type</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2"> Status </th>
                            <th className="border px-4 py-2">Edit</th>
                            <th className="border px-4 py-2">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {services.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2"> {user.id} </td>
                                <td className="border px-4 py-2"> {user.userName}</td>
                                <td className="border px-4 py-2"> {user.vendorName}</td>
                                <td className="border px-4 py-2"> {user.serviceType}</td>
                                <td className="border px-4 py-2"> {user.description} </td>
                                <td
                                    className={`border px-4 py-2 ${
                                        user.status === "active"
                                            ? " bg-green-100 text-green-600"
                                            : " bg-red-100 text-red-600"
                                    }`}
                                >
                                    {user.status}
                                </td>
                                <td className="border px-4 py-2">
                                    <IconEdit
                                        onClick={() => handleEdit(user.id)}
                                        className="w-5 h-5 text-green-600 mx-auto cursor-pointer"
                                    />
                                </td>
                                <td className="border px-4 py-2 ">
                                    <IconTrash
                                        onClick={() => handleDelete(user.id)}
                                        className="w-5 h-5 text-red-700 mx-auto cursor-pointer"
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
Booking.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
export default Booking;

// username vendorname bookingdate description status
