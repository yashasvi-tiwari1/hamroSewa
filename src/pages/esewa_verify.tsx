import React, { ReactElement } from "react";
import SiteLayout from "@sewa/site_layouts/siteLayout";
import { useRouter } from "next/router";

function EsewaVerify() {
  const navigate = useRouter();

  const { q } = navigate.query;
  const { oid } = navigate.query;
  const { amt } = navigate.query;
  const { refId } = navigate.query;
  console.log(refId);
  return (
    <>
      <form action="https://uat.esewa.com.np/epay/transrec" method="GET">
        <input name="amt" type="hidden" value={amt} />
        <input name="scd" type="hidden" value="EPAYTEST" />
        <input name="pid" type="hidden" value={oid} />
        <input name="rid" type="hidden" value={refId} />

        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
EsewaVerify.getLayout = function getLayout(page: ReactElement) {
  return <SiteLayout>{page}</SiteLayout>;
};

export default EsewaVerify;
