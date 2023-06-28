import React, {ReactElement} from "react";
import SiteLayout from "@sewa/site_layouts/siteLayout";

function About(){
    return(
        <>
        </>
    )
}
About.getLayout = function getLayout(page: ReactElement) {
    return <SiteLayout>{page}</SiteLayout>
};

export default About;