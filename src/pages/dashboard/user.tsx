import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import Layout from "@sewa/components/dashboard_layout";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { BASEURL } from "@sewa/pages/api/apiContent";
import axios from "axios";
import { toast } from "react-toastify";

interface user {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  contact: string;
  state: string;
  city: string;
  postal_code: string;
  street: string;
  locationID: number;
  location: Location;
}

interface Location {
  id: number;
  createdAt: string;
  updatedAt: string;
  longitude: number;
  latitude: number;
}

const User: NextPageWithLayout = () => {
  const [users, setUsers] = useState<user[]>([]);

  const fetchVendors = useCallback(() => {
    axios
      .get(`${BASEURL}/user`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error(error.response.message[0]);
      });
  }, []);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const router = useRouter();
  const handleEdit = (userId: number) => {
    router.push("/signup");
  };
  const handleDelete = (userId: number) => {
    axios
      .delete(`${BASEURL}/user/id`)
      .then((response) => {
        fetchVendors();
        toast.success(response.data.message, { position: "bottom-center" });
      })
      .catch((error) => {
        toast.error(error.response.message);
      });
  };

  return (
    <>
      <div className="bg-dashboard  p-4 rounded-lg">
        <div className="flex justify-between  items-center px-4  ">
          <div className="flex items-center gap-6">
            <span>Total Users: 350 </span>
          </div>
          <div className="relative user-search">
            <input
              type="search"
              placeholder="Search User ..."
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
                <th className="border px-4 py-2"> Postal_Code</th>
                <th className="border px-4 py-2">Edit</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2"> {user.id} </td>
                  <td className="border px-4 py-2"> {user.name}</td>
                  <td className="border px-4 py-2"> {user.contact} </td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2"> {user.street} </td>
                  <td className="border px-4 py-2"> {user.city} </td>
                  <td className="border px-4 py-2"> {user.state} </td>
                  <td className="border px-4 py-2"> {user.postal_code} </td>
                  <td className="border px-4 py-2">
                    <IconEdit
                      // onClick={() => handleEdit()}
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
User.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default User;
