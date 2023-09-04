import { ReactElement, useEffect, useState } from "react";
import SiteLayout from "@sewa/site_layouts/siteLayout";
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
      <div className="container p-8 md:py-32 md:px-16">
        <div className="space-y-12 ">
          <div className="w-full h-fit border-2 flex overflow-hidden rounded-lg">
            <div className="w-1/2 h-fit text-center bg-teal-500 p-2 font-semibold">
              Pending
            </div>
            <button
              className="w-1/2 h-fit text-center p-2 font-semibold"
              onClick={() => navigate.push("/acceptedNotification")}
            >
              Accepted
            </button>
          </div>
          <div className="w-full border-2 border-b-0 flex flex-col gap-3 h-fit p-4 rounded-md">
            {bookings.map((booking: any) => {
              const date = booking.booked_date;
              const showDate = date.slice(0, 10);
              return (
                <div className="w-full border-2 h-fit p-1 flex gap-3">
                  <div className="w-1/5 h-fit text-2xl font-semibold text-center p-2 text-teal-700">
                    {booking.vendor[0].service_type}
                  </div>
                  <div className="w-1/5 h-fit text-lg font-semibold text-center p-3">
                    {booking.vendor[0].name}
                  </div>
                  <div className="w-1/5 h-fit text-center text-lg font-semibold p-3">
                    {booking.vendor[0].contact}
                  </div>
                  <div className="w-1/5 h-fit text-center text-lg font-semibold p-3">
                    {showDate}
                  </div>
                  <div className="flex gap-4 w-1/5">
                    <button
                      className="px-4 bg-teal-500 text-white rounded-md"
                      onClick={() =>
                        navigate.push({
                          pathname: "/booked",
                          query: { id: booking.vendor[0].id },
                        })
                      }
                    >
                      Details
                    </button>
                    <button className="px-4 bg-red-500 text-white rounded-md">
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
  return <SiteLayout>{page}</SiteLayout>;
};
export default PendingNotification;
