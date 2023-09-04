import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconBell, IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";
import NotifyDialog from "@sewa/pages/notify";

interface Vendor {
  id: number;
  service_type: string;
  name: string;
  contact: string;
}

interface Booking {
  id: number;
  createdAt: string;
  updatedAt: string;
  booked_date: string;
  status: string;
  vendor: Vendor;
}

interface Location {
  id: number;
  createdAt: string;
  updatedAt: string;
  longitude: number;
  latitude: number;
}
interface userType {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  password: string;
  contact: string;
  state: string;
  city: string;
  postal_code: string;
  street: string;
  number: string;
  locationId: number;
  booking: Booking[];
  location: Location;
}

function Navbar() {
  const navigate = useRouter();
  const [bookings, setBookings] = useState<[Booking]>([
    {
      id: 0,
      createdAt: Date(),
      updatedAt: Date(),
      booked_date: Date(),
      status: "",
      vendor: { id: 0, service_type: "", name: "", contact: " " },
    },
  ]);

  useEffect(() => {
    console.log("hello");
    localStorage.setItem("userId", "1");
    const userId = localStorage.getItem("userId");

    axios
      .get(`${BASEURL}/user/userBookings/${userId}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        toast.error(error.response);
      });
  }, [BASEURL]);
  console.log(bookings);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const openNotification = () => {
    setIsNotificationOpen(true);
  };
  const closeNotification = () => {
    setIsNotificationOpen(false);
  };
  const goNotification = () => {
    navigate.push("/pendingNotification");
    setIsNotificationOpen(false);
  };

  return (
    <nav className="bg-gray-50 border h-max">
      <div className="container md:px-16 px-8 flex flex-wrap items-center justify-between mx-auto p-3  ">
        <Link href="/" className="flex items-center">
          <Image
            height={150}
            width={150}
            src="/assets/logo.svg"
            className="mr-3 w-40 "
            alt="hamro sewa logo"
          />
        </Link>
        <div className="block sm:hidden"></div>
        <div className="flex md:hidden">
          <button
            name="menu"
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-search"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <span className="sr-only">
              {isMenuOpen ? "Close menu" : "Open menu"}
            </span>
            {isMenuOpen ? (
              <IconX className="w-6 h-6" />
            ) : (
              <IconMenu2 className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-search"
        >
          <div className="flex text-black flex-col p-4 md:p-0 mt-4 font-medium  md:flex-row md:space-x-8 md:mt-0 md:border-0  content-center">
            <NavbarLink name="Home" href="/" />
            <NavbarLink name="Our Services" href="/services" />
            <NavbarLink name="Contact" href="/contact" />
            <NavbarLink name="About" href="/about" />
            <div className="relative">
              <button onClick={openNotification}>
                <div className="relative">
                  <IconBell className="w-6 h-6 flex z-20"></IconBell>
                  <div className="absolute text-red-600 ml-3 -mt-9 rounded-full flex items-center p-1 w-5 h-5 bg-red-100">
                    <span className="font-semibold">{bookings.length}</span>
                  </div>
                </div>
              </button>
              <NotifyDialog
                isOpen={isNotificationOpen}
                onClose={closeNotification}
                bookings={bookings}
                gotoNotification={goNotification}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavbarLinkProps {
  href: string;
  name: string;
}

function NavbarLink({ href, name }: NavbarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`${isActive ? "text-custom-tale " : ""}`}>
      {name}
    </Link>
  );
}

export default Navbar;
//
// interface DialogProps {
//   isOpen: boolean;
//   onClose: () => void;
// }
//
// const NotifyDialog: React.FC<DialogProps> = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [handleDescription, setHandleDescription] = useState("");
//   const cancelButtonRef = useRef(null);
//
//   return (
//     <Transition.Root show={isOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed inset-0 z-10 overflow-y-auto"
//         static
//         onClose={() => null}
//       >
//         <div className="flex items-end justify-center overflow-hidden min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//           </Transition.Child>
//
//           <span
//             className="hidden sm:inline-block sm:align-middle sm:h-screen"
//             aria-hidden="true"
//           >
//             &#8203;
//           </span>
//
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             enterTo="opacity-100 translate-y-0 sm:scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//           >
//             <div className="inline-block align-bottom overflow-hidden bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:max-h-2xl sm:h-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <div className="sm:flex sm:items-start">
//                   <div className="mx-auto flex-shrink-0 flex items-center -mt-1 justify-center h-12 w-12 rounded-full bg-teal-200 sm:mx-0 sm:h-10 sm:w-10">
//                     <IconCircleChevronRight
//                       className="h-6 w-6 text-teal-700"
//                       aria-hidden="true"
//                     />
//                   </div>
//                   <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                     <Dialog.Title
//                       as="h3"
//                       className="text-2xl font-semibold leading-6 text-gray-900"
//                     >
//                       Booking Form
//                     </Dialog.Title>
//                     <div className="mt-2">
//                       <p className="text-sm text-gray-500">
//                         Please select the dates you want to book service. please
//                         provide the detail information about your problem.
//                       </p>
//                     </div>
//                     <div className="mt-4">
//                       <label className="text-lg">Select Booking Date</label>
//                       <div className="flex mt-4">
//                         <div className="flex flex-col">
//                           <DatePicker
//                             className="DatePicker border p-2 rounded-md w-32"
//                             minDate={new Date()}
//                             selected={startDate}
//                             onChange={(date: Date) => setStartDate(date)}
//                             selectsStart
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                 <button
//                   type="button"
//                   className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-800 sm:ml-3 sm:w-auto"
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   type="button"
//                   className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-700 sm:mt-0 sm:w-auto"
//                   onClick={onClose}
//                   ref={cancelButtonRef}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };
