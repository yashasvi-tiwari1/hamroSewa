import React, {useCallback, useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from "swiper/modules";
import { Autoplay, Pagination} from 'swiper/modules';
import Image from "next/image";
import axios from "axios";
import {BASEURL} from "@sewa/pages/api/apiContent";
import { useRouter } from "next/router";
import {toast} from "react-toastify";
function Card() {
    const [products, setProducts] = React.useState([]);
    const navigate = useRouter();
    const [services, setServices] = useState([]);
    useEffect(()=>{
        axios.get(`${BASEURL}/services`).then((response)=>{
            setServices(response.data);
        })
            .catch((error)=>{toast.error(error.response)})
    },[BASEURL])
    // const Services = [
    //     {
    //         name:"Plumbing",
    //         image:"plumbing.png",
    //         description:"Plumbing is the solution for home appliances"
    //     },
    //     {
    //         name:"Plumbing",
    //         image:"plumbing.png",
    //         description:"Plumbing is the solution for home appliances"
    //     }, {
    //         name:"Plumbing",
    //         image:"plumbing.png",
    //         description:"Plumbing is the solution for home appliances"
    //     },
    //     {
    //         name:"Plumbing",
    //         image:"plumbing.png",
    //         description:"Plumbing is the solution for home appliances"
    //     },
    // ]
    console.log(services);
    return (
        <div className=" container md:px-16 md:py-16 p-8 md:p-12 full-width">
            <div className=" md:text-4xl p-1 text-2xl text-center  font-semibold ">
                <p> Our Products </p>
            </div>
            <Swiper
                navigation={true}
                centeredSlides={true}
                centeredSlidesBounds ={true}
            autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                }}
                modules={[Navigation,Pagination,Autoplay]}
                spaceBetween={16}
                className="myswiper"
                slidesPerView={3}
                    wrapperClass="md:py-8 py-4"

                breakpoints={{
                    // Responsive breakpoints
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
            >
                {services.map((service: any) => {
                    return (
                        <SwiperSlide key={service.name} className="p-2">
                            <ServiceCard service={service} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
const ServiceCard = ({service}: any) => {
    const navigate = useRouter();
    return (
        <div className=" rounded-lg shadow-sm border overflow-hidden flex flex-col border-b-2 w-full py-4">
            <div className="aspect-square flex justify-center w-full overflow-hidden">
                <img
                    height={296}
                    width={296}
                    src={"http://"+service.image_url}
                    className="w-[296px] h-[296px] object-contain "
                    alt="here is an image"
                />
            </div>
            <div className="h-50 flex flex-col px-4  space-y-4">
                <p className="text-xl font-semibold ">{service.name}</p>
                <p className=" text-left ">{service.description}</p>
                <button
                    onClick={() => {
                        navigate.push({
                            pathname: "/booked",
                            query: { name: service.name },
                        });
                    }}
                    className="bg-custom-tale w-max mt-4 px-4 py-2 text-sm rounded-lg text-white"
                >
                    Know more
                </button>
            </div>
        </div>
    );
};
export default Card;
