import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useCallback, useEffect, useState } from "react";
import Layout from "@sewa/components/dashboard_layout";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";

export interface Vendors {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  password: string;
  contact: string;
  service_type: string;
  state: string;
  city: string;
  postal_code: string;
  street: string;
  description: string;
  number: string;
  locationId: number;
  rating: number;
  visited_frequency: number;
  location: Location;
}

export interface Location {
  id: number;
  createdAt: string;
  updatedAt: string;
  longitude: number;
  latitude: number;
}

const Vendor: NextPageWithLayout = () => {
  const router = useRouter();

  const [vendors, setVendors] = useState<Vendors[]>([]);

  const fetchVendors = useCallback(() => {
    axios
      .get(`${BASEURL}/vendor`)
      .then((response) => {
        setVendors(response.data.data);
        // console.log(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message[0]);
      });
  }, [BASEURL]);
  console.log(vendors);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const handleDelete = (vendorId: number) => {
    axios
      .delete(`${BASEURL}/vendors/${vendorId}`)
      .then((response) => {
        fetchVendors();
        toast.success(response.data.message, { position: "bottom-center" });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleEdit = (userId: number) => {
    router.push("/signup");
  };

  return (
    <>
      <div className="bg-dashboard  p-4 rounded-lg">
        <div className="flex justify-between  items-center px-4  ">
          <div className="flex items-center gap-6">
            <span>Total Vendors: 100 </span>
          </div>
          <div className="relative user-search">
            <input
              type="search"
              placeholder="Search Vendors ..."
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
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="border px-4 py-2"> {vendor.id} </td>
                  <td className="border px-4 py-2"> {vendor.name}</td>
                  <td className="border px-4 py-2"> {vendor.contact} </td>
                  <td className="border px-4 py-2">{vendor.email}</td>
                  <td className="border px-4 py-2"> {vendor.street} </td>
                  <td className="border px-4 py-2"> {vendor.city} </td>
                  <td className="border px-4 py-2"> {vendor.state} </td>
                  <td className="border px-4 py-2"> {vendor.service_type} </td>
                  <td className="border px-4 py-2">
                    <IconEdit
                      onClick={() => handleEdit(vendor.id)}
                      className="w-5 h-5 text-green-600 mx-auto cursor-pointer"
                    />
                  </td>
                  <td className="border px-4 py-2 ">
                    <IconTrash
                      onClick={() => handleDelete(vendor.id)}
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
