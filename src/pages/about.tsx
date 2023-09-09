import React, { ReactElement, useCallback, useEffect, useState } from "react";

import Image from "next/image";

import PublicLayout from "@sewa/site_layouts/publicLayout";
import Team from "@sewa/components/team";

function About() {
  let navigate;
  const [products, setProducts] = useState([]);
  return (
    <div className="container p-8 md:py-16 md:px-32">
      <div className=" flex flex-col mx-auto  ">
        <Team />
        <div className="md:flex justify-center md:pt-16  gap-6">
          <div className=" dark:border-2 rounded-md p-8 dark:bg-blue-600/75  bg-blue-400 shadow-2xl ">
            <div className="flex items-center gap-4">
              <Image
                src="/assets/mission.png"
                alt="mission icon"
                height={50}
                width={50}
              />
              <p className="text-2xl font-semibold">MISSION</p>
            </div>
            <p className="pb-6 pt-4 text-justify">
              Simplifying Lives, Connecting Communities Our mission is to
              simplify and enhance the lives of homeowners by connecting them
              with reliable service providers while creating opportunities for
              local businesses to thrive. We believe that when communities come
              together, everyone benefits.
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/assets/vision.png"
                alt="mission icon"
                height={50}
                width={50}
              />
              <p className="text-2xl font-semibold">VISION</p>
            </div>
            <p className="pt-4 text-justify">
              Here's the minimized version of your vision statement: "Our vision
              is to be the premier platform for home services, recognized for
              its reliability and positive influence on communities. We imagine
              a future where accessing home services is available to everyone."
            </p>
          </div>

          <div className=" flex flex-col gap-4 pt-4 md:pt-0">
            <div className=" dark:border-2 p-4 rounded-md w-full bg-green-600/75 shadow-2xl ">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/goal.png"
                  alt="mission icon"
                  height={50}
                  width={50}
                />
                <p className="text-2xl font-semibold">GOALS</p>
              </div>
              <p className="pt-4 text-justify">
                At HamroSewa, our goals are clear. We aim to ensure user
                satisfaction by providing top-notch service providers and
                seamless experiences. We're committed to empowering local
                service businesses to thrive, expanding the range of available
                home services, and fostering a strong community. Trust is vital
                to us, and we work to establish HamroSewa as a trusted platform.
                We prioritize efficiency, innovation, and sustainability in our
                operations.
              </p>
            </div>
            <div className=" dark:border-2 p-4  rounded-md w-full dark:bg-gray-600/75 bg-gray-400  shadow-2xl ">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/values.png"
                  alt="mission icon"
                  height={50}
                  width={50}
                />
                <p className="text-2xl font-semibold">VALUES</p>
              </div>
              <p className="pt-4 text-justify">
                Our values drive us. We put customers first, ensuring their
                satisfaction. We operate with integrity, uphold quality, embrace
                inclusivity, and support local communities. Innovation is in our
                DNA, and we prioritize reliability and sustainability in all we
                do. These values underpin our mission to simplify lives and
                support local businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
export default About;
