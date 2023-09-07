import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useEffect, useState } from "react";
import Layout from "@sewa/components/vendor_layout";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";

export interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
}

export interface Booking {
  id: number;
  booked_date: Date;
  status: string;
  description: string;
  user: User[];
}

export interface Payment {
  id: number;
  amount: number;
  status: string;
  bookingId: number;
  booking: Booking;
}

export interface Vendor {
  id: number;
  payment: Payment[];
}
const Payment: NextPageWithLayout = () => {
  const [vendorPayment, setVendorPayment] = useState<Vendor>({
    id: 0,
    payment: [],
  });
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const vendorId = localStorage.getItem("vendorId");
    axios
      .get(`${BASEURL}/vendor/payment/${vendorId}`)
      .then((response) => {
        setVendorPayment(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }, [BASEURL]);

  const payment_detail = vendorPayment.payment;
  const payments = payment_detail.filter((pay) => {
    if (pay.booking.status == "accepted") {
      return pay;
    }
  });

  const router = useRouter();
  const handleEdit = (paymentId: number) => {
    router.push("/signup");
  };

  return (
    <>
      <div className="bg-dashboard  p-4 rounded-lg">
        <div className="flex justify-between  items-center px-4  ">
          <div className="flex items-center gap-6">
            <span>Total Amount: 100 </span>
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
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2"> Description </th>

                <th className="border px-4 py-2"> Status </th>
                <th className="border px-4 py-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="border px-4 py-2"> {payment.id} </td>
                  <td className="border px-4 py-2">
                    {payment.booking.user[0].name}
                  </td>

                  <td className="border px-4 py-2">
                    <input type="text" value={amount} onChange={} />
                    {payment.amount}
                  </td>
                  <td className="border px-4 py-2">
                    {payment.booking.description}
                  </td>
                  <td
                    className={`border px-4 py-2 ${
                      payment.status === "paid"
                        ? " bg-green-100 text-green-600"
                        : " bg-red-100 text-red-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(payment.id)}
                      className="py-2 px-4 rounded-md text-white bg-teal-400 mx-auto cursor-pointer"
                    >
                      Update
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
Payment.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Payment;
