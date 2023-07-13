import { ReactElement, useEffect } from "react";
import SiteLayout from "@sewa/site_layouts/siteLayout";
import { IconMail, IconPhoneCall } from "@tabler/icons-react";
import {router} from "next/client";
import {useRouter} from "next/router";

function Booked() {
    const navigate = useRouter();
    const next = () => {
        navigate.push({
            pathname: "/book-a",
            query: { id: "1" },
        });
    };
    return (
        <div>
            <div className="container p-8 md:py-32 md:px-16">
                <div className="space-y-12">
                    <div className="space-y-2">
                        <p className="text-2xl font-bold"> Vendors Name </p>
                        <p className="text-custom-blue font-semibold"> Vendors Faculty</p>
                        <p className="max-w-xl">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
                            earum harum ullam voluptate? Commodi corporis et at libero odio,
                            recusandae rem sapiente tempora. Debitis ea et eveniet molestias
                            numquam, placeat in the books quod?
                        </p>
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
                                <p>phone Number</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 border-custom-blue border rounded-full flex items-center justify-center">
                                <IconMail />
                            </div>
                            <div className="leading-tight">
                                <p className="text-sm font-semibold">Email us :</p>
                                <p>personal mail</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="button rounded-md text-white text-base bg-custom-tale py-3 px-5 tracking-wider mt-5 md:mt-10"
                        onClick={next}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}

Booked.getLayout = function getLayout(page: ReactElement) {
    return <SiteLayout>{page}</SiteLayout>;
};
export default Booked;
