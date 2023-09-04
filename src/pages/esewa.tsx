import React, { ReactElement } from "react";
import SiteLayout from "@sewa/site_layouts/siteLayout";

function Esewa() {
  return (
    <div className="container p-8 md:py-32 md:px-16">
      <form action="https://uat.esewa.com.np/epay/main" method="POST">
        <input name="tAmt" type="hidden" value="100" />
        <input name="amt" type="hidden" value="90" />
        <input name="txAmt" type="hidden" value="3" />
        <input name="psc" type="hidden" value="5" />
        <input name="pdc" type="hidden" value="2" />
        <input name="scd" type="hidden" value="EPAYTEST" />
        <input name="pid" type="hidden" value="sfadfs" />
        <input name="su" type="hidden" value="http://localhost:3000/?q=su" />
        <input
          name="fu"
          type="hidden"
          value="http://merchant.com.np/page/esewa_payment_failed?q=fu"
        />
        <input type="submit" value="Esewa" />
      </form>
    </div>
  );
}
Esewa.getLayout = function getLayout(page: ReactElement) {
  return <SiteLayout>{page}</SiteLayout>;
};

export default Esewa;
