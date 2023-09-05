import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useRef } from "react";
import Layout from "@sewa/components/dashboard_layout";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";

const Vendor: NextPageWithLayout = () => {
    const vendors = [
        {
            id: "1",
            name: "Yashasvi Tiwari",
            contact: "9806682290",
            email: "yashasvi.tiwari.4648@gmail.com",
            street: "pkr-32 Malmul",
            city: "Pokhara",
            state: "Gandaki",
            service_type: "337700",
        },
        {
            id: "2",
            name: "Yashasvi Tiwari",
            contact: "9806682290",
            email: "yashasvi.tiwari.4648@gmail.com",
            street: "pkr-32 Malmul",
            city: "Pokhara",
            state: "Gandaki",
            service_type: "337700",
        },
        {
            id: "3",
            name: "Yashasvi Tiwari",
            contact: "9806682290",
            email: "yashasvi.tiwari.4648@gmail.com",
            street: "pkr-32 Malmul",
            city: "Pokhara",
            state: "Gandaki",
            service_type: "337700",
        },
        {
            id: "4",
            name: "Yashasvi Tiwari",
            contact: "9806682290",
            email: "yashasvi.tiwari.4648@gmail.com",
            street: "pkr-32 Malmul",
            city: "Pokhara",
            state: "Gandaki",
            service_type: "337700",
        },
        {
            id: "5",
            name: "Yashasvi Tiwari",
            contact: "9806682290",
            email: "yashasvi.tiwari.4648@gmail.com",
            street: "pkr-32 Malmul",
            city: "Pokhara",
            state: "Gandaki",
            service_type: "337700",
        },
        {
            id: "6",
            name: "Yashasvi Tiwari",
            contact: "9806682290",
            email: "yashasvi.tiwari.4648@gmail.com",
            street: "pkr-32 Malmul",
            city: "Pokhara",
            state: "Gandaki",
            service_type: "337700",
        },
        {
            id: "7",
            name: "Yashasvi Tiwari",
            contact: "9806682290",
            email: "yashasvi.tiwari.4648@gmail.com",
            street: "pkr-32 Malmul",
            city: "Pokhara",
            state: "Gandaki",
            service_type: "337700",
        },
        {
            id: "8",
            name: "Yashasvi Tiwari",
            contact: "9806682290",
            email: "yashasvi.tiwari.4648@gmail.com",
            street: "pkr-32 Malmul",
            city: "Pokhara",
            state: "Gandaki",
            service_type: "337700",
        },
        {
            id: "9",
            name: "Yashasvi Tiwari",
            contact: "9806682290",
            email: "yashasvi.tiwari.4648@gmail.com",
            street: "pkr-32 Malmul",
            city: "Pokhara",
            state: "Gandaki",
            service_type: "337700",
        },
        {
            id: "10",
            name: "Yashasvi Tiwari",
            contact: "9806682290",
            email: "yashasvi.tiwari.4648@gmail.com",
            street: "pkr-32 Malmul",
            city: "Pokhara",
            state: "Gandaki",
            service_type: "337700",
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
                        <span>Total Vendors: 100 </span>
                        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                            <button
                                className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded font-semibold tracking-wider"
                                onClick={() => router.push("/signup")}
                            >
                                Add Vendor
                            </button>
                        </div>
                    </div>
                    <div className="relative user-search">
                        <input
                            type="search"
                            placeholder="Search vendors ..."
                            className="p-2 border rounded-lg px-12 "
                        />
                        <IconSearch className="absolute -mt-8  ml-3 text-gray-500" />
                    </div>
                    <div>
                        <button className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded font-semibold tracking-wider">
                            Export Users Excel
                        </button>
                    </div>
                </div>
                <div className="px-4 flex justify-center mx-auto container mt-10">
                    <table className="border-2 table-auto ">
                        <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Contact</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Street</th>
                            <th className="border px-4 py-2">City</th>
                            <th className="border px-4 py-2">State</th>
                            <th className="border px-4 py-2"> Service_Type</th>
                            <th className="border px-4 py-2">Edit</th>
                            <th className="border px-4 py-2">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {vendors.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2"> {user.id} </td>
                                <td className="border px-4 py-2"> {user.name}</td>
                                <td className="border px-4 py-2"> {user.contact} </td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2"> {user.street} </td>
                                <td className="border px-4 py-2"> {user.city} </td>
                                <td className="border px-4 py-2"> {user.state} </td>
                                <td className="border px-4 py-2"> {user.service_type} </td>
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
Vendor.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
export default Vendor;
