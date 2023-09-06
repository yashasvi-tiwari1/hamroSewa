import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useEffect, useState } from "react";
import Layout from "@sewa/components/dashboard_layout";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";

interface Services {
  id: number;
  name: string;
  description: string;
}
const Service: NextPageWithLayout = () => {
  const router = useRouter();
  const [services, setServices] = useState<Services[]>([]);
  useEffect(() => {
    axios
      .get(`${BASEURL}/services`)
      .then((response) => {
        setServices(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message[0]);
      });
  }, [BASEURL]);
  const handleEdit = (serviceId: number) => {
    router.push("/signup");
  };
  const handleDelete = (serviceId: number) => {
    axios
      .delete(`${BASEURL}/services/${serviceId}`)
      .then((response) => {
        setServices(response.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message[0]);
      });
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
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="border px-4 py-2"> {service.id} </td>
                  <td className="border px-4 py-2"> {service.name}</td>
                  <td className="border px-4 py-2"> {service.description} </td>
                  <td className="border px-4 py-2">
                    <IconEdit
                      onClick={() => handleEdit(service.id)}
                      className="w-5 h-5 text-green-600 mx-auto cursor-pointer"
                    />
                  </td>
                  <td className="border px-4 py-2 ">
                    <IconTrash
                      onClick={() => handleDelete(service.id)}
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
