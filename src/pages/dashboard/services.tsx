import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useRef } from "react";
import Layout from "@sewa/components/dashboard_layout";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";

const Service: NextPageWithLayout = () => {
    const services = [
        {
            id: "1",
            name: "Painting",
            description:
                "The purpose of painting is to improve the appearance of a building and to protect it from damage by water, corrosion, insects and mould.",
        },
        {
            id: "2",
            name: "Painting",
            description:
                "The purpose of painting is to improve the appearance of a building and to protect it from damage by water, corrosion, insects and mould.",
        },
        {
            id: "3",
            name: "Painting",
            description:
                "The purpose of painting is to improve the appearance of a building and to protect it from damage by water, corrosion, insects and mould.",
        },
        {
            id: "4",
            name: "Painting",
            description:
                "The purpose of painting is to improve the appearance of a building and to protect it from damage by water, corrosion, insects and mould.",
        },
        {
            id: "5",
            name: "Painting",
            description:
                "The purpose of painting is to improve the appearance of a building and to protect it from damage by water, corrosion, insects and mould.",
        },
        {
            id: "6",
            name: "Painting",
            description:
                "The purpose of painting is to improve the appearance of a building and to protect it from damage by water, corrosion, insects and mould.",
        },
        {
            id: "7",
            name: "Painting",
            description:
                "The purpose of painting is to improve the appearance of a building and to protect it from damage by water, corrosion, insects and mould.",
        },
        {
            id: "8",
            name: "Painting",
            description:
                "The purpose of painting is to improve the appearance of a building and to protect it from damage by water, corrosion, insects and mould.",
        },
        {
            id: "9",
            name: "Painting",
            description:
                "The purpose of painting is to improve the appearance of a building and to protect it from damage by water, corrosion, insects and mould.",
        },
        {
            id: "10",
            name: "Painting",
            description:
                "The purpose of painting is to improve the appearance of a building and to protect it from damage by water, corrosion, insects and mould.",
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
                        <span>Total Services: 100 </span>
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
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Edit</th>
                            <th className="border px-4 py-2">Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {services.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2"> {user.id} </td>
                                <td className="border px-4 py-2"> {user.name}</td>
                                <td className="border px-4 py-2"> {user.description} </td>
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
Service.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
export default Service;
