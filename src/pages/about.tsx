import React, { ReactElement } from "react";
import PublicLayout from "@sewa/site_layouts/publicLayout";

function About() {
  return <></>;
}
About.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default About;
