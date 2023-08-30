import React, {ReactElement} from "react";
import SiteLayout from "@sewa/site_layouts/siteLayout";
import {IconBriefcase, IconSearch} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import Card from "@sewa/components/card";

function Landing({icons}:any){
    interface IconsProps{
        name:string;
        icon:any;
    }
    const items:IconsProps[]=[ {
        icon:<Link href=""><Image height={100} width={100} src='/assets/faucet.svg' className="w-12 h-12" alt="Handy Man"/></Link>,
        name:"Plumber",
    },
        {
            icon:<Link href=""><Image height={100} width={100} src='/assets/gardener.svg' className="w-12 h-12" alt="Handy Man"/></Link>,
            name:"Gardener",
        },
        {
            icon:<Link href=""><Image height={100} width={100} src='/assets/bulb.svg' className="w-12 h-12" alt="Handy Man"/></Link>,
            name:"Electrician",
        },
        {
            icon:<Link href=""><Image height={100} width={100} src='/assets/cleaner.svg' className="w-12 h-12" alt="Handy Man"/></Link>,
            name:"Cleaner",
        },{
            icon:<Link href=""><Image height={100} width={100} src='/assets/wood.svg' className="w-12 h-12" alt="Handy Man"/></Link>,
            name:"Carpentar",
        },
        {
            icon:<Link  href=""> <Image height={100} width={100} src='/assets/painter.svg' className="w-12 h-12" alt="Handy Man"/></Link>,
            name:"Painter",
        },
    ]
    return(
        <>
            <div className="w-full flex justify-center py-8">
                <div className="container  px-8 md:px-16  top-40 space-y-16">
                    <div className="justify-center flex">
                        <p className=" text-center text-5xl font-bold max-w-lg text-black pt-16">Find the
                            <span className="text-custom-tale pl-3">Best Service </span> pros near you.</p>
                    </div>
                    <div className="flex justify-center gap-4 ">
                        <div className="flex items-center relative left-8 ">
                            <IconSearch className="w-8 h-8 absolute text-gray-800"/>
                        </div>
                        <input type="text" placeholder="How can we help ?" className="max-w-lg w-full h-14  px-14 rounded-lg bg-white border border-gray-400"/>
                        <button className="bg-custom-tale text-white px-5 font-medium text-xl rounded-lg">Search</button>
                    </div>
                    <div className="flex justify-center gap-14 ">

                        {items.map((item:any)=>{
                            return(
                                <div className="flex flex-col items-center">
                                    {item.icon}
                                    <span className="mt-2">{item.name}</span>
                                </div>
                            )
                        })}
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