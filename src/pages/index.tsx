import React, { ReactElement } from "react";
import PublicLayout from "@sewa/site_layouts/publicLayout";
import Layout from "@sewa/components/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextPageWithLayout } from "@sewa/pages/_app";
import Landing from "@sewa/components/landing";
import Card from "@sewa/components/card";
import VendorRecommendation from "@sewa/components/vendorRecommendation";

// const inter = Inter({ subsets: ["latin"] });

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Layout>
        <Landing />
        <Card />
        <VendorRecommendation />
      </Layout>
      <ToastContainer />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
export default Home;
