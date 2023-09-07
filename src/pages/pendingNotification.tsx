import { ReactElement, useEffect, useState } from "react";
import PublicLayout from "@sewa/site_layouts/publicLayout";
import { useRouter } from "next/router";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";

interface Vendor {
  id: number;
  service_type: string;
  name: string;
  contact: string;
}

interface Booking {
  id: number;
  createdAt: string;
  updatedAt: string;
  booked_date: string;
  status: string;
  vendor: [Vendor];
}

function PendingNotification() {
  const navigate = useRouter();
  const [userBookings, setUserBookings] = useState<[Booking]>([
    {
      id: 0,
      createdAt: Date(),
      updatedAt: Date(),
      booked_date: Date(),
      status: "",
      vendor: [{ id: 0, service_type: "", name: "", contact: "" }],
    },
  ]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`${BASEURL}/user/userBookings/${userId}`)
      .then((response) => {
        setUserBookings(response.data);
      })
      .catch((error) => {
        toast.error(error.response);
      });
  }, [BASEURL]);
  const bookings = userBookings.filter((book) => {
    if (book.status == "pending") {
      return book;
    }
  });

  return (
    <div>
      <div className="container p-8 md:py-16 md:px-16">
        <div className="space-y-12 ">
          <div className="w-full h-fit border-2 flex overflow-hidden rounded-lg">
            <div className="w-1/2 h-fit text-center bg-teal-600 p-2 font-semibold text-white">
              Notification Pending
            </div>
            <button
              className="w-1/2 h-fit text-center p-2 font-semibold "
              onClick={() => navigate.push("/acceptedNotification")}
            >
              Notification Accepted
            </button>
          </div>
          <div className="w-full border-2 border-b-0 flex flex-col gap-4 p-4 rounded-md bg-gray-100">
            {bookings.map((booking: any) => {
              const date = booking.booked_date;
              const showDate = date.slice(0, 10);

              return (
                <div
                  key={booking.id}
                  className="flex items-center p-4 bg-white rounded-md shadow-md"
                >
                  <div className="w-1/5 text-center">
                    <h2 className="text-xl font-semibold text-teal-700">
                      {booking.vendor[0].service_type}
                    </h2>
                  </div>
                  <div className="w-1/5 text-lg font-semibold text-center">
                    <p>{booking.vendor[0].name}</p>
                  </div>
                  <div className="w-1/5 text-center">
                    <p className="text-lg font-semibold">
                      {booking.vendor[0].contact}
                    </p>
                  </div>
                  <div className="w-1/5 text-center">
                    <p className="text-lg font-semibold">{showDate}</p>
                  </div>
                  <div className="flex gap-4 w-1/5">
                    <button
                      className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                      onClick={() =>
                        navigate.push({
                          pathname: "/booked",
                          query: { id: booking.vendor[0].id },
                        })
                      }
                    >
                      Details
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

PendingNotification.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
export default PendingNotification;
