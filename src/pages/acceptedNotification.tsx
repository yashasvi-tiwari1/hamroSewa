import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";
import SiteLayout from "@sewa/site_layouts/siteLayout";
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
      console.log("update ma aaxa");
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
    if (pay.status != "Paid") {
      return pay;
    }
  });

  const updatePayment = (pay: any) => {};

  return (
    <div>
      <div className="container p-8 md:py-32 md:px-16">
        <div className="space-y-12 ">
          <div className="w-full h-fit border-2 flex overflow-hidden rounded-lg">
            <button
              className="w-1/2 h-fit text-center p-2 font-semibold"
              onClick={() => navigate.push("/pendingNotification")}
            >
              Pending
            </button>
            <button
              className="w-1/2 h-fit text-center p-2 bg-teal-500 font-semibold"
              onClick={() => navigate.push("/acceptedNotification")}
            >
              Accepted
            </button>
          </div>
          <div className="w-full border-2 border-b-0 flex gap-5 h-fit p-4 rounded-md">
            {payment.map((pay) => {
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
                <div className="w-5/12 h-fit flex flex-col items-center p-5 rounded-lg bg-gray-100">
                  <div className="font-bold text-4xl text-teal-700">
                    Payment Details
                  </div>
                  <div className="font-semibold text-lg w-full text-center flex border-2 mt-6">
                    <div className="w-1/2 border-r-2">Service</div>
                    <div className="w-1/2">
                      {pay.booking.vendor[0].service_type}
                    </div>
                  </div>
                  <div className="font-semibold flex text-center text-lg w-full border-2">
                    <div className="w-1/2 border-r-2">Vendor</div>
                    <div className="w-1/2">{pay.booking.vendor[0].name}</div>
                  </div>
                  <div className="font-semibold text-center w-full flex border-2">
                    <div className="w-1/2 border-r-2">Contact</div>
                    <div className="w-1/2">{pay.booking.vendor[0].contact}</div>
                  </div>
                  <div className="font-semibold flex w-full text-center border-2">
                    <div className="w-1/2 border-r-2">Booking</div>
                    <div className="w-1/2">{showDate}</div>
                  </div>

                  {pay.status == "undefined" ? (
                    <div className="flex gap-5">
                      <div className="font-semibold rounded-md bg-teal-200 flex p-2 text-center mt-4">
                        Booking:
                        {pay.booking.status}
                      </div>
                      <div className="font-semibold rounded-md bg-red-300 p-2 mt-4">
                        Amount:{pay.status}
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-5">
                      <div className="font-semibold rounded-md bg-red-300 py-2 px-5 mt-4 text-center">
                        Amount:{pay.amount}
                      </div>
                      <div>
                        <form
                          action="https://uat.esewa.com.np/epay/main"
                          method="POST"
                        >
                          <input name="tAmt" type="hidden" value={pay.amount} />
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
                          <button onClick={() => updatePayment(pay)}>
                            <input
                              type="submit"
                              value="Esewa Pay"
                              className=" bg-teal-600 text-white px-8 py-2 w-full rounded-md h-fit mt-4 hover:bg-teal-500"
                            />
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
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
  return <SiteLayout>{page}</SiteLayout>;
};
export default AcceptedNotification;
