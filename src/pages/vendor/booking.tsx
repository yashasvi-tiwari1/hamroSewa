import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useCallback, useEffect, useState } from "react";
import Layout from "@sewa/components/vendor_layout";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { enqueueSnackbar } from "notistack";

interface User {
  id: number;
  service_type: string;
  name: string;
  contact: string;
  street: string;
}
interface Booking {
  id: number;
  createdAt: string;
  updatedAt: string;
  booked_date: string;
  status: string;
  description: string;
  user: [User];
}
const Booking: NextPageWithLayout = () => {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = useCallback(() => {
    localStorage.setItem("vendorId", "2");
    const vendorId = localStorage.getItem("vendorId");

    axios
      .get(`${BASEURL}/vendor/booking/${vendorId}`)
      .then((response) => {
        setBookings(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        enqueueSnackbar(err.response.data.message, {
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          variant: "error",
        });
      });
  }, [BASEURL]);
  console.log(bookings);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const acceptBooking = (bookingId: number) => {
    axios
      .post(`${BASEURL}/booking/accept/${bookingId}`, { status: "accepted" })
      .then((response) => {
        enqueueSnackbar(response.data.message, {
          variant: "success",
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
        });
        fetchBookings();
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
        });
      });
  };
  const cancelBooking = (userId: number) => {};

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
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2"> Date </th>
                <th className="border px-4 py-2"> Status </th>
                <th className="border px-4 py-2">Accept</th>
                <th className="border px-4 py-2">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="border px-4 py-2"> {booking.id} </td>
                  <td className="border px-4 py-2"> {booking.user[0].name}</td>
                  <td className="border px-4 py-2 w-fit">
                    {booking.description}
                  </td>
                  <td className="border px-4 py-2">
                    {" "}
                    {booking.user[0].street}
                  </td>

                  <td
                    className={`border px-4 py-2 ${
                      booking.status === "active"
                        ? " bg-green-100 text-green-600"
                        : " bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.status}
                  </td>
                  <td className="border px-4 py-2">
                    {booking.booked_date.toString().slice(0, 10)}
                  </td>

                  <td className="border px-4 py-2">
                    <button
                      onClick={() => acceptBooking(booking.id)}
                      className="w-full h-full text-white font-bold  p-2 bg-teal-400 mx-auto cursor-pointer rounded-md"
                    >
                      Accept
                    </button>
                  </td>
                  <td className="border px-4 py-2 ">
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="w-full h-full text-white font-bold  p-2 bg-red-500 mx-auto cursor-pointer rounded-md"
                    >
                      Cancel
                    </button>
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
