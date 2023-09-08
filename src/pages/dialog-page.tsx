import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconCircleChevronRight } from "@tabler/icons-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { router } from "next/client";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";
import { useNotification } from "@sewa/site_layouts/publicLayout";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: any;
  user: any;
}

const CustomDialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  vendor,
  user,
}) => {
  if (!isOpen) return null;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const cancelButtonRef = useRef(null);
  const { getBookings } = useNotification();
  const handle_description = (e: any) => {
    setDescription(e.target.value);
  };
  const bookVendor = () => {
    const data = {
      user_id: user,
      vendor_id: vendor,
      booked_date: startDate,
      description: description,
    };
    console.log(data);
    axios
      .post(`${BASEURL}/bookings`, data)
      .then((response) => {
        toast.success(response?.data.msg);
        getBookings();
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error?.response?.data?.message);
      });
    router.push("/");
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        static
        onClose={() => null}
      >
        <div className="flex items-end justify-center overflow-hidden min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom overflow-hidden bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:max-h-2xl sm:h-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center -mt-1 justify-center h-12 w-12 rounded-full bg-teal-200 sm:mx-0 sm:h-10 sm:w-10">
                    <IconCircleChevronRight
                      className="h-6 w-6 text-teal-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900"
                    >
                      Booking Form
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please select the dates you want to book service. please
                        provide the detail information about your problem.
                      </p>
                    </div>
                    <div className="mt-6">
                      <label className="text-lg font-semibold">
                        Select Booking Date
                      </label>
                      <div className="flex mt-6">
                        <div className="flex flex-col ">
                          <DatePicker
                            className="DatePicker border p-3 text-center text-white font-semibold rounded-md w-32"
                            minDate={new Date()}
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            selectsStart
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col bg-white mt-8">
                      <label htmlFor="detail">Description</label>
                      <textarea
                        className="bg-white border"
                        rows={5}
                        cols={50}
                        placeholder="Please enter the details of your problem"
                        onChange={handle_description}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 sm:ml-3 sm:w-auto"
                  onClick={bookVendor}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-700 sm:mt-0 sm:w-auto"
                  onClick={onClose}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CustomDialog;
