import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useCallback, useEffect, useState } from "react";
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

  const fetchPayment = useCallback(() => {
    const vendorInfo = localStorage.getItem("vendorInfo");
    if (vendorInfo) {
      const vendor = JSON.parse(vendorInfo);
      axios
        .get(`${BASEURL}/vendor/payment/${vendor.vendor_id}`)
        .then((response) => {
          setVendorPayment(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    }
  }, [BASEURL]);

  useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  const payment_detail = vendorPayment.payment;
  const payments = payment_detail.filter((pay) => {
    if (pay.booking.status == "accepted") {
      return pay;
    }
  });

  const updatePayment = (payId: number, amount: string) => {
    const updateData = {
      amount,
      status: "defined",
    };

    axios
      .put(`${BASEURL}/payment/${payId}`, updateData)
      .then((response) => {
        toast.success(response?.data?.msg);
        fetchPayment();
      })
      .catch((err) => {
        console.log("sab thik xa");
        toast.error(err?.response?.data?.message);
      });
  };
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
                <th className="border px-4 py-2"> Description</th>

                <th className="border px-4 py-2"> Status</th>
                <th className="border px-4 py-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <ShowPayments
                  payment={payment}
                  val={payment.amount}
                  updateAmount={(value: any) =>
                    updatePayment(payment.id, value)
                  }
                />
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

function ShowPayments({ payment, val, updateAmount }: any) {
  const [amount, setAmount] = useState(val);

  function handleChange(e: any) {
    setAmount(e.target.value);
  }

  return (
    <tr key={payment.id}>
      <td className="border px-4 py-2"> {payment.id} </td>
      <td className="border px-4 py-2">{payment.booking.user[0].name}</td>

      <td className="border px-4 py-2">
        {payment.status != "Paid" ? (
          <input type="text" value={amount} onChange={handleChange} />
        ) : (
          amount
        )}
      </td>
      <td className="border px-4 py-2">{payment.booking.description}</td>
      <td
        className={`border px-4 py-2 text-center ${
          payment.status === "defined" || payment.status === "Paid"
            ? " bg-green-100 text-green-600"
            : " bg-red-100 text-red-600"
        }`}
      >
        {payment.status}
      </td>
      {val != amount ? (
        <td className="border px-4 py-2">
          <button
            onClick={() => updateAmount(amount)}
            className="py-2 px-4 rounded-md text-white bg-teal-400 mx-auto cursor-pointer"
          >
            Update
          </button>
        </td>
      ) : (
        <td className="border px-4 py-2">
          <button className="py-2 px-4 rounded-md text-white bg-gray-400 mx-auto ">
            Update
          </button>
        </td>
      )}
    </tr>
  );
}

export default Payment;
