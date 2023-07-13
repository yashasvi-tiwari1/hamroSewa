import { ReactElement } from "react";
import SiteLayout from "@sewa/site_layouts/siteLayout";
import DatePicker from "react-datepicker";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconActivity } from "@tabler/icons-react";
import "react-datepicker/dist/react-datepicker.css";
import { router } from "next/client";
import Link from "next/link";

function BookConfirmation() {
    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleStartDateChange = (date: Date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date) => {
        setEndDate(date);
    };
    const next = () => {
        router.push({
            pathname: "/book-a",
            query: { id: 456 },
        });
    };

    return (
        <div className="container p-8 md:py-32 md:px-16">
            <div className="">
                <h1>Welcome to Online Booking</h1>
                <Transition.Root show={open} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        initialFocus={cancelButtonRef}
                        onClose={setOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform  h-max rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <IconActivity
                                                        className="h-6 w-6 text-blue-600"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left items-center">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-xl font-semibold leading-6 text-gray-900"
                                                    >
                                                        Booking Form
                                                    </Dialog.Title>
                                                    <div className="flex justify-between gap-4">
                                                        <DatePicker
                                                            startOpen
                                                            selected={startDate}
                                                            onChange={handleStartDateChange}
                                                            selectsStart
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={startDate}
                                                            className="border rounded-md px-4 py-2"
                                                        />
                                                        <DatePicker
                                                            selected={endDate}
                                                            onChange={handleEndDateChange}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={endDate}
                                                            className="border rounded-md px-4 py-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse gap-4 sm:px-6 text-white">
                                            <button
                                                className="button item-center rounded-md font-semibold text-base bg-custom-tale py-3 px-5 tracking-wider "
                                            >
                                                Next
                                            </button>
                                            <button
                                                type="button"
                                                className="w-full rounded-md bg-custom-tale px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-tale-300 sm:mt-0 sm:w-auto"
                                                // onClick={() => setOpen(false)}
                                                // ref={cancelButtonRef}
                                            >
                                                Previous
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </div>
    );
}

BookConfirmation.getLayout = function getLayout(page: ReactElement) {
    return <SiteLayout>{page}</SiteLayout>;
};

export default BookConfirmation;
