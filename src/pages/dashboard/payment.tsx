import { NextPageWithLayout } from "@sewa/pages/_app";
import { ReactElement, useCallback, useEffect, useState } from "react";
import Layout from "@sewa/components/dashboard_layout";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { BASEURL } from "@sewa/pages/api/apiContent";

interface payment {
  id: number;
  user_name: string;
  vendor_name: string;
  amount: number;
  description: string;
  status: string;
}

const Payment: NextPageWithLayout = () => {
  const [payments, setPayments] = useState<payment[]>([]);

  const fetchPayment = useCallback(() => {
    axios
      .get(`${BASEURL}/payement`)
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => toast.error(error.response.message));
  }, []);

  useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  const router = useRouter();
  const handleEdit = (userId: string) => {
    router.push("/signup");
  };
  const handleDelete = (paymentId: number) => {
    axios
      .delete(`${BASEURL}/payment/id`)
      .then((response) => {
        fetchPayment();
        toast.success(response.data.message);
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
            <span>Total Amount: 100 </span>
          </div>
          <div className="relative user-search">
            <input
              type="search"
              placeholder="Search Payment ..."
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
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2"> Status</th>
                <th className="border px-4 py-2">Edit</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment: any) => (
                <tr key={payment.id}>
                  <td className="border px-4 py-2"> {payment.id} </td>
                  <td className="border px-4 py-2"> {payment.userName}</td>
                  <td className="border px-4 py-2"> {payment.vendorName}</td>
                  <td className="border px-4 py-2"> {payment.amount}</td>
                  <td className="border px-4 py-2"> {payment.description} </td>
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
                    <IconEdit
                      onClick={() => handleEdit(payment.id)}
                      className="w-5 h-5 text-green-600 mx-auto cursor-pointer"
                    />
                  </td>
                  <td className="border px-4 py-2 ">
                    <IconTrash
                      onClick={() => handleDelete(payment.id)}
                      className="w-5 h-5 text-red-700 mx-auto cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </>
  );
};
Payment.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Payment;
