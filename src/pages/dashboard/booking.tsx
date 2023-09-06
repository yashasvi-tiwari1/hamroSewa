import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import Layout from "@sewa/components/dashboard_layout";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { BASEURL } from "@sewa/pages/api/apiContent";
import axios from "axios";
import { toast } from "react-toastify";
import error = toast.error;

interface booking {
  id: number;
  user_name: string;
  vendor_name: string;
  service_type: string;
  description: string;
  status: string;
}
const Booking: NextPageWithLayout = () => {
  const [booking, setBooking] = useState<booking[]>([]);

  const fetchBooking = useCallback(() => {
    axios
      .get(`${BASEURL}/booking`)
      .then((response) => {
        setBooking(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data[0]);
      });
  }, []);

  useEffect(() => {
    fetchBooking();
  }, []);

  const router = useRouter();
  const handleEdit = (userId: string) => {
    router.push("/signup");
  };
  const handleDelete = (paymentId: number) => {
    axios
      .delete(`${BASEURL}/booking`)
      .then((response) => {
        fetchBooking();
        toast.success(response.data);
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
              {booking.map((bookings) => (
                <tr key={bookings.id}>
                  <td className="border px-4 py-2"> {bookings.id} </td>
                  <td className="border px-4 py-2"> {bookings.user_name}</td>
                  <td className="border px-4 py-2"> {bookings.vendor_name}</td>
                  <td className="border px-4 py-2"> {bookings.service_type}</td>
                  <td className="border px-4 py-2"> {bookings.description} </td>
                  <td
                    className={`border px-4 py-2 ${
                      bookings.status === "active"
                        ? " bg-green-100 text-green-600"
                        : " bg-red-100 text-red-600"
                    }`}
                  >
                    {bookings.status}
                  </td>
                  <td className="border px-4 py-2">
                    <IconEdit
                      // onClick={() => handleEdit(bookings.id)}
                      className="w-5 h-5 text-green-600 mx-auto cursor-pointer"
                    />
                  </td>
                  <td className="border px-4 py-2 ">
                    <IconTrash
                      onClick={() => handleDelete(bookings.id)}
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
