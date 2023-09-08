import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";
import PublicLayout, { useNotification } from "@sewa/site_layouts/publicLayout";
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

function AcceptedNotification() {
  const navigate = useRouter();

  const [userPayment, setUserPayment] = useState<Payment[]>([]);
  const { getBookings } = useNotification();

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
      openInfo();
      const payId = oid?.slice(3, oid?.length);
      const payData = {
        amount: amt,
        status: "Paid",
      };
      axios
        .put(`${BASEURL}/payment/${payId}`, payData)
        .then((response) => {
          getBookings();

          openInfo();
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
  }, [q]);

  useEffect(() => {
    const userId = localStorage.getItem("userInfo");
    if (userId) {
      const userInfo = JSON.parse(userId);
      axios
        .get(`${BASEURL}/user/userPayment/${userInfo.user_Id}`)
        .then((response) => {
          setUserPayment(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    }
  }, [BASEURL]);
  console.log(userPayment);

  return (
    <div>
      <div className="container p-8 md:py-16 md:px-16">
        <div className="space-y-12 ">
          <div className="w-full h-fit border-2 flex overflow-hidden rounded-lg">
            <button
              className="w-1/2 h-fit text-center p-2 font-semibold "
              onClick={() => navigate.push("/pendingNotification")}
            >
              Bookings
            </button>
            <button
              className="w-1/2 h-fit text-center p-2 bg-teal-500 font-semibold text-white "
              onClick={() => navigate.push("/acceptedNotification")}
            >
              Payments
            </button>
          </div>
          <div className="w-full grid  border-2 grid-cols-3 border-b-0 flex gap-5 h-fit p-10 rounded-md ">
            {userPayment.map((pay, index) => {
              const date = pay.booking.booked_date.toString();
              const showDate = date.slice(0, 10);

              function getRandomNumber(min: number, max: number) {
                const randomFraction = Math.random();
                const randomInRange = randomFraction * (max - min + 1) + min;
                return Math.floor(randomInRange);
              }

              const small = getRandomNumber(1, 12);
              const big = getRandomNumber(17, 31);
              const pid_source = "oZWCHgndhLFFAVUGMbpdIlLTOzaOwvDT";
              const pid_fixed = pid_source.slice(small, big);
              const pid = pid_fixed.slice(0, 3) + pay.id;
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
                    {pay.status != "Paid" ? (
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
                            <button className="bg-teal-600 text-white px-2 py-2 rounded-md hover:bg-teal-500 ml-4">
                              Esewa Pay
                            </button>
                          </form>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-semibold rounded-md bg-red-300 p-2  text-center">
                          Rs: {pay.amount}
                        </div>
                        <div className="bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-600 ml-4">
                          Paid
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
