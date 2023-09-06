import Layout from "../../components/dashboard_layout";
import { ReactElement } from "react";
import { NextPageWithLayout } from "@sewa/pages/_app";
import {
  IconArrowLoopRight2,
  IconSquareLetterB,
  IconSquareLetterV,
  IconUser,
} from "@tabler/icons-react";

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <div className="">
        <div className="w-[980px] bg-dashboard p-6 rounded-xl">
          <span className="text-xl font-semibold "> Summary </span>
          <div className="flex justify-between mt-10 ">
            <div className="bg-orange-200 p-6 w-52 text-center rounded-lg">
              <div className="flex justify-center">
                <IconUser className="w-9 h-9 text-orange-600 " />
              </div>
              <div className="font-semibold text-lg">3</div>
              <div className="font-semibold text-lg text-gray-600">
                Total Users
              </div>
            </div>
            <div className="bg-green-200 flex flex-col justify-center w-52 text-center p-6 rounded-lg">
              <div className="flex justify-center">
                <IconSquareLetterV className="w-9 h-9 text-green-600" />
              </div>
              <div className="font-semibold text-lg">350</div>
              <div className="font-semibold text-lg text-gray-600">
                Total Vendors
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
                <IconArrowLoopRight2 className="w-9 h-9 text-red-600" />
              </div>
              <div className="font-semibold text-lg">100</div>
              <div className="font-semibold text-lg text-gray-600">
                Total Services
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Dashboard;
