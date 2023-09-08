import React, { RefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconBell, IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";

interface Vendor {
  id: number;
  service_type: string;
  name: string;
  contact: string;
}

export interface Booking {
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

function Navbar({ bookings }: { bookings: Booking[] }) {
  const navigate = useRouter();

  // console.log(bookings);
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
  const goNotification = (status: string) => {
    navigate.push(`/user${status}`);
    setIsNotificationOpen(false);
  };
  const buttonRef = useRef<HTMLButtonElement>(null);

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
              <button
                ref={buttonRef}
                onClick={() => setIsNotificationOpen((open) => !open)}
              >
                <IconBell className="w-6 h-6 flex z-20" />
                {bookings.length > 0 && (
                  <div className="absolute text-red-600 ml-3 -mt-9 rounded-full flex items-center p-1 w-5 h-5 bg-red-100">
                    <span className="font-semibold">{bookings.length}</span>
                  </div>
                )}
              </button>
              {isNotificationOpen && (
                <NotificationPopup
                  buttonRef={buttonRef}
                  onClose={closeNotification}
                  bookings={bookings}
                  gotoNotification={(status) => goNotification(status)}
                />
              )}
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

const NotificationPopup = React.forwardRef<
  HTMLButtonElement,
  {
    onClose: () => void;
    bookings: Booking[];
    buttonRef?: RefObject<HTMLButtonElement>;
    gotoNotification: (status: string) => void;
  }
>(({ gotoNotification, onClose, buttonRef, bookings }, ref) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const node = e.target as Node;
      if (
        divRef.current &&
        buttonRef?.current &&
        !buttonRef.current.contains(node) &&
        !divRef.current.contains(node)
      )
        onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const [visibleNotifications, setVisibleNotifications] = useState(4);
  const navigate = useRouter();
  const showMoreNotifications = () => {
    navigate.push("/userBookings");
    onClose();
  };
  return (
    <div
      ref={divRef}
      className="absolute bg-white z-50 top-10 right-0 rounded-md border p-3 shadow-md"
    >
      <div className="absolute right-5 top-0 mt-[-10px] w-0 h-0 border-4 border-solid border-transparent border-b-white ">
        {" "}
      </div>
      <div className="bg-white rounded-md border p-3 shadow-md">
        <div className="sm:flex flex-col gap-2 sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              Notifications
            </h3>
          </div>
          <div className="w-max flex flex-col gap-2">
            {bookings
              .slice(0, visibleNotifications)
              .map((booking: any, index: number) => {
                const date = booking.booked_date.toString();
                const showDate = date.slice(0, 10);
                return (
                  <button
                    key={index}
                    onClick={() =>
                      gotoNotification(
                        booking.status == "pending" ||
                          (booking.status == "accepted" &&
                            booking.payment.status == "undefined")
                          ? "Bookings"
                          : "Payments"
                      )
                    }
                    className="text-center"
                  >
                    <div className="flex w-full p-2 gap-4 overflow-hidden rounded-md border-2 items-center ">
                      {booking.status == "pending" ? (
                        <div className="bg-red-500 text-white w-1/3 rounded-md p-2 text-xs">
                          {booking.status}
                        </div>
                      ) : (
                        <div className="bg-teal-600 text-white w-1/3 rounded-md p-2 text-xs">
                          {booking.status}
                        </div>
                      )}
                      <div className="bg-teal-400 rounded-md w-1/3 p-2 text-xs font-semibold">
                        {booking.vendor[0].service_type}
                      </div>
                      <div className=" p-1 text-xs font-semibold w-full">
                        {showDate}
                      </div>
                    </div>
                  </button>
                );
              })}
            {visibleNotifications < bookings.length && (
              <button
                onClick={showMoreNotifications}
                className="text-center text-teal-700 cursor-pointer text-semibold text-base"
              >
                Show More...
              </button>
            )}
          </div>
        </div>
      </div>
      <Link href="/login">
        <div className="mt-2 text-center">Log Out</div>
      </Link>
    </div>
  );
});
