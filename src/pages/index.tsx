
import React, { ReactElement } from "react";
import SiteLayout from "@sewa/site_layouts/siteLayout";
import Layout from "@sewa/components/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {NextPageWithLayout} from "@sewa/pages/_app";
import Landing from "@sewa/components/landing";
import Card from "@sewa/components/card";

// const inter = Inter({ subsets: ["latin"] });

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Layout>
                <Landing/>
                <Card/>
            </Layout>
            <ToastContainer />
        </>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <SiteLayout>{page}</SiteLayout>;
};
export default Home;
