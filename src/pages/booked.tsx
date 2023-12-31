import { ReactElement, useEffect, useState } from "react";
import PublicLayout from "@sewa/site_layouts/publicLayout";
import { IconMail, IconPhoneCall } from "@tabler/icons-react";
import { useRouter } from "next/router";
import CustomDialog from "./dialog-page";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";

function Booked() {
  const navigate = useRouter();
  const { id } = navigate.query;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [vendor, setVendor] = useState<any>({});
  const [user_id, setUser_id] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      const userInfo = JSON.parse(userData);
      console.log(userInfo);
      setUser_id(userInfo.user_Id);
      axios
        .get(`${BASEURL}/vendor/detail`, {
          params: { userId: userInfo.user_Id, vendorId: id },
        })
        .then((response) => {
          setVendor(response.data);
        })
        .catch((error) => {
          toast.error(error.response?.data?.message);
        });
    }
  }, [BASEURL]);
  const openDialog = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };
  return (
    <div>
      <div className="container p-8 md:py-32 md:px-16">
        <div className="space-y-12 ">
          <div className="space-y-2">
            <p className="text-2xl font-bold"> {vendor.name} </p>
            <p className="text-custom-blue font-semibold">
              {vendor.service_type}
            </p>
            <p className="max-w-xl">{vendor.description}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-xl">Skills</p>
            <p className="list-inside list-disc font-semibold">
              <li> SKills no 1</li>
            </p>
          </div>
          <div className="sm:flex space-y-6 sm:space-y-0  gap-12">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 border-custom-blue  border rounded-full flex items-center justify-center">
                <IconPhoneCall />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Call Now:</p>
                <p>{vendor.contact}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 border-custom-blue border rounded-full flex items-center justify-center">
                <IconMail />
              </div>
              <div className="leading-tight">
                <p className="text-sm  font-semibold">Email us :</p>
                <p>{vendor.email}</p>
              </div>
            </div>
          </div>
          <button
            className="button rounded-md text-white text-base bg-teal-600 py-3 px-5 tracking-wider mt-5 md:mt-10"
            onClick={openDialog}
          >
            Book Now
          </button>
          <CustomDialog
            isOpen={isDialogOpen}
            onClose={closeDialog}
            vendor={vendor.id}
            user={user_id}
          />
        </div>
      </div>
    </div>
  );
}

Booked.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
export default Booked;
