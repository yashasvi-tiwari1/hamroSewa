import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Navbar, { Booking } from "@sewa/components/navbar";
import Footer from "@sewa//components/footer";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";

const NotificationContext = createContext<any>(null);
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used inside NotificationContext");
  }
  return { getBookings: context.getBookings as () => void };
}

function PublicLayout({ children }: { children: ReactElement }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const getBookings = useCallback(() => {
    const userId = localStorage.getItem("userInfo");
    if (userId) {
      const userInfo = JSON.parse(userId);
      axios
        .get(`${BASEURL}/user/notification/${userInfo.user_Id}`)
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          toast.error(error.response);
        });
    }
  }, [BASEURL]);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  return (
    <NotificationContext.Provider value={{ getBookings }}>
      <main>
        <Navbar bookings={bookings} />
        {children}
        <Footer />
      </main>
    </NotificationContext.Provider>
  );
}

export default PublicLayout;
