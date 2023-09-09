import Layout from "../../components/vendor_layout";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "@sewa/pages/_app";
import {
  IconActivity,
  IconCurrencyRupeeNepalese,
  IconSquareLetterB,
} from "@tabler/icons-react";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";

export interface Booking {
  id: number;
  booked_date: Date;
  status: string;
  description: string;
}

export interface Payment {
  id: number;
  amount: number;
  status: string;
  bookingId: number;
}

export interface Vendor {
  id: number;
  name: string;
  email: string;
  contact: string;
  balance: number;
  service_type: string;
  booking: Booking[];
  payment: Payment[];
}

const Vendor_Dashboard: NextPageWithLayout = () => {
  const [vendor, setVendor] = useState<Vendor>({
    id: 0,
    name: "",
    email: "",
    contact: "",
    balance: 0,
    service_type: "",
    payment: [],
    booking: [],
  });

  useEffect(() => {
    const vendorId = localStorage.getItem("vendorInfo");
    if (vendorId) {
      const vendorInfo = JSON.parse(vendorId);
      axios
        .get(`${BASEURL}/vendor/one/${vendorInfo.vendor_id}`)
        .then((response) => {
          setVendor(response.data);
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
        });
    }
  }, [BASEURL]);
  let totalPay = 0;
  vendor.payment.map((pay) => {
    totalPay = totalPay + pay.amount;
  });
  let activeBooking = 0;
  vendor.booking.map((book) => {
    if (book.status == "pending") {
      activeBooking = activeBooking + 1;
    }
  });

  return (
    <>
      <div className="">
        <div className="w-[980px] bg-dashboard p-6 rounded-xl">
          <span className="text-xl font-semibold "> Summary </span>
          <div className="flex justify-between mt-10 ">
            <div className="bg-orange-200 p-6 w-52 text-center rounded-lg">
              <div className="flex justify-center">
                <IconCurrencyRupeeNepalese className="w-9 h-9 text-orange-600 " />
              </div>
              <div className="font-semibold text-lg">{totalPay}</div>
              <div className="font-semibold text-lg text-gray-600">
                Total Amount
              </div>
            </div>
            <div className="bg-purple-200 p-6 rounded-lg text-center w-52 ">
              <div className="flex justify-center">
                <IconSquareLetterB className="w-9 h-9 text-purple-600" />
              </div>
              <div className="font-semibold text-lg">
                {vendor.booking.length}
              </div>
              <div className="font-semibold text-lg text-gray-600">
                Total Booking
              </div>
            </div>
            <div className="bg-red-200 p-6 rounded-lg text-center w-52 ">
              <div className="flex justify-center">
                <IconActivity className="w-9 h-9 text-red-600" />
              </div>
              <div className="font-semibold text-lg">{activeBooking}</div>
              <div className="font-semibold text-lg text-gray-600">
                Active Booking
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Vendor_Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Vendor_Dashboard;
