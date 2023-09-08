import Layout from "../../components/vendor_layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "@sewa/pages/_app";
import {
  IconActivity,
  IconCurrencyRupeeNepalese,
  IconSquareLetterB,
} from "@tabler/icons-react";

const Vendor_Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <div className="">
        <div className="w-[980px] bg-dashboard p-6 rounded-xl">
          <span className="text-xl font-semibold "> Summary </span>
          <div className="flex justify-between mt-10 ">
            <div className="bg-orange-200 p-6 w-52 text-center rounded-lg">
              <div className="flex justify-center">
                <IconCurrencyRupeeNepalese className="w-9 h-9 text-orange-600 " />
              </div>
              <div className="font-semibold text-lg">3</div>
              <div className="font-semibold text-lg text-gray-600">
                Total Amount
              </div>
            </div>
            <div className="bg-purple-200 p-6 rounded-lg text-center w-52 ">
              <div className="flex justify-center">
                <IconSquareLetterB className="w-9 h-9 text-purple-600" />
              </div>
              <div className="font-semibold text-lg">100</div>
              <div className="font-semibold text-lg text-gray-600">
                Total Booking
              </div>
            </div>
            <div className="bg-red-200 p-6 rounded-lg text-center w-52 ">
              <div className="flex justify-center">
                <IconActivity className="w-9 h-9 text-red-600" />
              </div>
              <div className="font-semibold text-lg">100</div>
              <div className="font-semibold text-lg text-gray-600">
                Active Booking
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Vendor_Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Vendor_Dashboard;
