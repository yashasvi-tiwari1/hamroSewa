import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: any;
  gotoNotification: () => void;
}

const NotifyDialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  bookings,
  gotoNotification,
}) => {
  if (!isOpen) return null;
  const navigate = useRouter();
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        static
        onClose={() => null}
      >
        <div className="flex overflow-hidden min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="inline-block align-bottom overflow-hidden bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xs sm:w-full sm:max-h-2xl sm:h-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex flex-col gap-2 sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900"
                    >
                      Notifications
                    </Dialog.Title>
                  </div>
                  <div className=" w-full flex flex-col gap-2 ">
                    {bookings.map((booking: any) => {
                      const date = booking.booked_date.toString();
                      const showDate = date.slice(0, 10);
                      return (
                        <button onClick={gotoNotification}>
                          <div className="flex w-full p-2 gap-4 overflow-hidden rounded-md border-2">
                            {booking.status == "pending" ? (
                              <div className="bg-red-500 text-white w-1/3 rounded-md p-1 text-xs">
                                {booking.status}
                              </div>
                            ) : (
                              <div className="bg-teal-600 text-white w-1/3 rounded-md p-1 text-xs">
                                {booking.status}
                              </div>
                            )}
                            <div className="bg-teal-400 rounded-md w-1/3 p-1 text-xs font-semibold">
                              {booking.vendor[0].service_type}
                            </div>
                            <div className=" p-1 text-xs font-semibold">
                              {showDate}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 sm:ml-3 sm:w-auto"
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

export default NotifyDialog;
