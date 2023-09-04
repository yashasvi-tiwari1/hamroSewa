import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function VendorRecommendation() {
  const navigate = useRouter();

  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASEURL}/vendor`)
      .then((response) => {
        setVendors(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response);
      });
  }, [BASEURL]);
  console.log(vendors);
  return (
    <div className=" container md:px-16 md:py-16 p-8 md:p-12 full-width ">
      <div className=" rounded-lg overflow-hidden flex flex-wrap w-full py-4">
        {vendors.map((vendor: any) => {
          return (
            <div className=" rounded-lg shadow-sm border overflow-hidden flex flex-col h-fit border-b-2 w-1/3 p-4">
              <div className="aspect-square flex justify-center w-full overflow-hidden border-2 border-amber-950">
                <img
                  height={350}
                  width={400}
                  src={"http://" + vendor.image_url}
                  className="w-[400px] h-[400px] object-contain"
                  alt="here is an image"
                />
              </div>
              <div className="h-50 flex flex-col  space-y-4">
                <p className="text-xl font-semibold ">{vendor.name}</p>
                <p className=" text-left ">
                  {vendor.description.slice(0, 100)}
                </p>
                <button
                  onClick={() => {
                    navigate.push({
                      pathname: "/booked",
                      query: { id: vendor.id },
                    });
                  }}
                  className="bg-custom-tale w-max mt-4 px-4 py-2 text-sm rounded-lg text-white"
                >
                  Know more
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VendorRecommendation;
