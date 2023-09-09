import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useCallback, useEffect, useState } from "react";
import Layout from "@sewa/components/vendor_layout";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { enqueueSnackbar } from "notistack";
import { toast } from "react-toastify";

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
  const [search, setSearch] = useState("");

  const fetchBookings = useCallback(() => {
    const vendorInfo = localStorage.getItem("vendorInfo");
    if (vendorInfo) {
      const vendor = JSON.parse(vendorInfo);
      axios
        .get(`${BASEURL}/vendor/booking/${vendor.vendor_id}`)
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
    }
  }, [BASEURL]);
  console.log(bookings);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    if (e.target.value != "") {
      axios
        .get(`${BASEURL}//search/${e.target.value}`)
        .then((response) => {
          setBookings(response.data);
        })
        .catch((err) => toast.error(err?.response?.data?.message));
    } else {
      fetchBookings();
    }
  };
  const acceptBooking = (bookingId: number) => {
    axios
      .patch(`${BASEURL}/bookings/accept/${bookingId}`, { status: "accepted" })
      .then((response) => {
        enqueueSnackbar(response?.data.message, {
          variant: "success",
        });
        fetchBookings();
      })
      .catch((err) => {
        console.log(err.response);
        enqueueSnackbar(err.response?.data?.message, {
          variant: "error",
        });
      });
  };
  const cancelBooking = (bookingId: number) => {
    axios
      .patch(`${BASEURL}/bookings/cancel/${bookingId}`, { status: "canceled" })
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

  return (
    <>
      <div className="bg-dashboard  p-4 rounded-lg">
        <div className="flex justify-between  items-center px-4  ">
          <div className="flex items-center gap-6">
            <span>Total Booking: {bookings.length} </span>
          </div>
          <div className="relative user-search">
            <input
              type="search"
              placeholder="Search services ..."
              className="p-2 border rounded-lg px-12 "
              onChange={handleSearch}
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
                <th className="border px-4 py-2"> Status</th>
                <th className="border px-4 py-2"> Date</th>
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
                  <td className="border px-4 py-2">{booking.user[0].street}</td>

                  <td
                    className={`border px-4 py-2 ${
                      booking.status === "accepted"
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
                    {booking.status == "pending" ? (
                      <button
                        onClick={() => acceptBooking(booking.id)}
                        className="w-full h-full text-white font-bold  p-2 bg-teal-400 mx-auto cursor-pointer rounded-md"
                      >
                        Accept
                      </button>
                    ) : booking.status == "accepted" ? (
                      <div className="py-2 px-6 bg-gray-400 rounded-md ">
                        Accepted
                      </div>
                    ) : (
                      booking.status == "canceled" && (
                        <div className="p-2 bg-gray-400 rounded-md">
                          Not Accepted
                        </div>
                      )
                    )}
                  </td>
                  <td className="border px-4 py-2 ">
                    {booking.status == "pending" ? (
                      <button
                        onClick={() => acceptBooking(booking.id)}
                        className="w-full h-full text-white font-bold  p-2 bg-red-500 mx-auto cursor-pointer rounded-md"
                      >
                        Cancel
                      </button>
                    ) : booking.status == "accepted" ? (
                      <div className="px-4  py-2 bg-gray-400 rounded-md">
                        Cancel
                      </div>
                    ) : (
                      booking.status == "canceled" && (
                        <div className="p-2 bg-gray-400 rounded-md">
                          Canceled
                        </div>
                      )
                    )}
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
