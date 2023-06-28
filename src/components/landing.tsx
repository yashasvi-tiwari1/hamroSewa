import React, {ReactElement} from "react";
import SiteLayout from "@sewa/site_layouts/siteLayout";
import Image from "next/image";

function Landing(){
    return(
        <>
            <div className="relative">
            <Image src='/assets/background.png' alt="this is background image" className="w-full h-[calc(100vh-88px)] "  height={900} width={900}/>
            <div className="w-full flex justify-center">
                <div className="container  px-8 md:px-16 absolute top-40 ">
                <p className=" text-center text-black text-5xl font-bold max-w-lg ">Find the best service pros near you.</p>
            </div>
            </div>
            </div>
        </>
    )
}
Landing.getLayout = function getLayout(page: ReactElement) {
    return <SiteLayout>{page}</SiteLayout>;
};
export default Landing;

