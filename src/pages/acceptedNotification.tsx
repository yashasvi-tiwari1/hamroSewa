import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";
import PublicLayout from "@sewa/site_layouts/publicLayout";
import PaymentSuccess from "@sewa/pages/paymentsuccess";

export interface Vendor {
  id: number;
  name: string;
  email: string;
  contact: string;
  service_type: string;
}

export interface Booking {
  id: number;
  booked_date: Date;
  status: string;
  description: string;
  vendor: Vendor[];
}

export interface Payment {
  id: number;
  amount: number;
  status: string;
  bookingId: number;
  booking: Booking;
}

export interface User {
  id: number;
  payment: Payment[];
}

function AcceptedNotification() {
  const navigate = useRouter();

  const [userPayment, setUserPayment] = useState<User>({
    id: 0,
    payment: [],
  });
  const [success, setSuccess] = useState("");

  const [isPaymentInfo, setIsPaymentInfo] = useState(false);

  const openInfo = () => {
    setIsPaymentInfo(true);
  };
  const closeInfo = () => {
    setIsPaymentInfo(false);
  };
  const { q } = navigate.query;
  const { oid } = navigate.query;
  const { amt } = navigate.query;
  const { refId } = navigate.query;

  useEffect(() => {
    if (q == "su") {
      const payId = oid?.slice(0, 1);
      const payData = {
        amount: amt,
        status: "Paid",
      };
      axios
        .put(`${BASEURL}/payment/${payId}`, payData)
        .then((response) => {
          setSuccess(response.data);
          console.log(response);
          openInfo();
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    }
  }, [q]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`${BASEURL}/user/userPayment/${userId}`)
      .then((response) => {
        setUserPayment(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }, [BASEURL]);

  console.log(userPayment);
  const payment_detail = userPayment.payment;
  const payment = payment_detail.filter((pay) => {
    if (pay.booking.status == "accepted") {
      if (pay.status != "Paid") {
        return pay;
      }
    }
  });

  const updatePayment = (pay: any) => {};

  return (
    <div>
      <div className="container p-8 md:py-16 md:px-16">
        <div className="space-y-12 ">
          <div className="w-full h-fit border-2 flex overflow-hidden rounded-lg">
            <button
              className="w-1/2 h-fit text-center p-2 font-semibold "
              onClick={() => navigate.push("/pendingNotification")}
            >
              Notification Pending
            </button>
            <button
              className="w-1/2 h-fit text-center p-2 bg-teal-500 font-semibold text-white "
              onClick={() => navigate.push("/acceptedNotification")}
            >
              Notification Accepted
            </button>
          </div>
          <div className="w-full grid  border-2 grid-cols-3 border-b-0 flex gap-5 h-fit p-10 rounded-md ">
            {payment.map((pay, index) => {
              const date = pay.booking.booked_date.toString();
              const showDate = date.slice(0, 10);

              function getRandomNumber(min: number, max: number) {
                const randomFraction = Math.random();
                const randomInRange = randomFraction * (max - min + 1) + min;
                return Math.floor(randomInRange);
              }

              const small = getRandomNumber(1, 12);
              const big = getRandomNumber(16, 31);
              const pid_source = "oZWCHgndhLFFAVUGMbpdIlLTOzaOwvDT";
              const pid_mid = pay.id + pid_source.slice(small, big);
              const pid = pid_mid.length < 6 ? pid_mid : pid_mid.slice(0, 5);
              console.log(pid);
              return (
                <div className="w-full h-fit  flex-col   items-center p-5 rounded-lg bg-gray-200">
                  <div className="font-bold text-2xl text-teal-700 mb-4">
                    Payment Details
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between bg-white p-2 w-full rounded-md shadow-lg">
                      <div className="font-semibold">Service</div>
                      <div>{pay.booking.vendor[0].service_type}</div>
                    </div>
                    <div className="flex justify-between bg-white p-2  w-full rounded-md shadow-lg">
                      <div className="font-semibold">Vendor</div>
                      <div>{pay.booking.vendor[0].name}</div>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded-md shadow-lg">
                      <div className="font-semibold">Contact</div>
                      <div>{pay.booking.vendor[0].contact}</div>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded-md shadow-lg">
                      <div className="font-semibold">Booking</div>
                      <div>{showDate}</div>
                    </div>
                  </div>

                  <div className=" flex mt-6 w-full px-12">
                    {pay.status === "undefined" ? (
                      <>
                        <div className="flex justify-between w-full">
                          <div className="font-semibold rounded-md bg-teal-700 p-2 text-center text-white">
                            {pay.booking.status}
                          </div>
                          <div className="font-semibold rounded-md bg-red-700 text-white   p-2">
                            {pay.status}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-semibold rounded-md bg-red-300 p-2  text-center">
                          Rs: {pay.amount}
                        </div>
                        <div>
                          <form
                            action="https://uat.esewa.com.np/epay/main"
                            method="POST"
                          >
                            <input
                              name="tAmt"
                              type="hidden"
                              value={pay.amount}
                            />
                            <input
                              name="amt"
                              type="hidden"
                              value={pay.amount - 10}
                            />
                            <input name="txAmt" type="hidden" value="3" />
                            <input name="psc" type="hidden" value="5" />
                            <input name="pdc" type="hidden" value="2" />
                            <input name="scd" type="hidden" value="EPAYTEST" />
                            <input
                              name="pid"
                              type="hidden"
                              value={pid.toString()}
                            />
                            <input
                              name="su"
                              type="hidden"
                              value="http://localhost:3000/acceptedNotification?q=su"
                            />
                            <input
                              name="fu"
                              type="hidden"
                              value="http://merchant.com.np/page/esewa_payment_failed?q=fu"
                            />
                            <button
                              onClick={() => updatePayment(pay)}
                              className="bg-teal-600 text-white px-8 py-2 rounded-md hover:bg-teal-500 ml-4"
                            >
                              Esewa Pay
                            </button>
                          </form>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <PaymentSuccess isOpen={isPaymentInfo} onClose={closeInfo} />
        </div>
      </div>
    </div>
  );
}

AcceptedNotification.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
export default AcceptedNotification;
