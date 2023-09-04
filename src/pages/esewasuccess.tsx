import React, { ReactElement } from "react";
import SiteLayout from "@sewa/site_layouts/siteLayout";
import { useRouter } from "next/router";

function EsewaSuccess() {
  const navigate = useRouter();

  const { q } = navigate.query;
  const { oid } = navigate.query;
  const { amt } = navigate.query;
  const { refid } = navigate.query;
  var path = "https://uat.esewa.com.np/epay/transrec";
  var params = {
    amt: amt,
    rid: refid,
    pid: oid,
    scd: "EPAYTEST",
  };

  // function post(path: any, params: any) {
  //   let form = document.createElement("form");
  //   form.setAttribute("method", "POST");
  //   form.setAttribute("action", path);
  //
  //   for (let key in params) {
  //     let hiddenField = document.createElement("input");
  //     hiddenField.setAttribute("type", "hidden");
  //     hiddenField.setAttribute("name", key);
  //     hiddenField.setAttribute("value", params[key]);
  //     form.appendChild(hiddenField);
  //   }
  //
  //   document.body.appendChild(form);
  //   form.submit();
  // }
  // post(path, params);

  return <div className="container p-8 md:py-32 md:px-16"></div>;
}
EsewaSuccess.getLayout = function getLayout(page: ReactElement) {
  return <SiteLayout>{page}</SiteLayout>;
};

export default EsewaSuccess;
