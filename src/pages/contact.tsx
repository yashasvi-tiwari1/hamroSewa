import { ReactElement, useState } from "react";
import PublicLayout from "@sewa/site_layouts/publicLayout";
import Layout from "@sewa/components/layout";
import axios from "axios";
import { BASEURL } from "@sewa/pages/api/apiContent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function Contact() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useRouter();

  const handleFN = (e: any) => {
    setFname(e.target.value);
  };

  const handleLN = (e: any) => {
    setLname(e.target.value);
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e: any) => {
    setPhone(e.target.value);
  };

  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };

  async function AddContact() {
    console.log(email, phone, fname, lname, message);
    if (email && phone && fname && lname && message) {
      if (email.match(/(^\w{0,100}@gmail.com$|^\w{0,100}@outlook.com$)/g)) {
        if (phone.match(/(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/)) {
          let contactus = {
            firstName: fname,
            lastName: lname,
            email,
            phone,
            message,
          };

          axios
            .post(`${BASEURL}/items/contact_user`, JSON.stringify(contactus), {
              headers: {
                "content-type": "Application/json",
              },
            })
            .then((response) => {
              toast("successful", {
                position: "bottom-center",
              });
              console.log(response.data);
              navigate.push("/");
            })
            .catch((error) => {
              toast(error.message);
            });
        } else {
          toast.error("Please Enter Valid Email", {
            position: "bottom-center",
          });
        }
      } else {
        toast.error("please enter the valid phone number", {
          position: "bottom-center",
        });
      }
    } else {
      toast.error("Please fill-up the form !", {
        position: "bottom-center",
      });
    }
  }

  return (
    <Layout>
      <div className="md:py-20 md:px-16 p-8 space-y-4">
        <div className="md:text-3xl text-2xl md:px-16 container">
          <p className="text-custom-black dark:text-white">
            Love to hear from you,{" "}
          </p>
          <div className="flex">
            <p className="text-custom-blue dark:text-blue-600">Get in touch</p>
            <img
              height={400}
              width={400}
              src="/assets/hy.png"
              className="h-10 w-10 ml-4"
            />
          </div>
        </div>
        <div className="lg:flex items-start container">
          <div className="md:block hidden">
            <img
              src="/assets/contact.png"
              alt="contac us png"
              className="w-11/12"
            />
          </div>
          <div className="md:w-2/5 border shadow rounded-3xl md:ml-32 md:-mt-20 container ">
            <div className="md:p-10 p-5">
              <div className="md:flex gap-10 space-y-4 ">
                <div className="flex flex-col md:flex-row gap-4">
                  <div>
                    <label htmlFor="name">
                      <span className="font-semibold">First Name</span> <br />
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        id="name"
                        className="border-2 mt-2 p-2 w-full"
                        onChange={handleFN}
                      />
                    </label>
                  </div>
                  <div className="">
                    <label htmlFor="cast">
                      <span className="font-semibold"> Last Name</span>
                      <br />
                      <input
                        type="text"
                        placeholder="Enter your Last Name"
                        id="cast"
                        className="border-2 mt-2 p-2 w-full "
                        onChange={handleLN}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <label htmlFor="email">
                <div className="mt-5 font-semibold">Email</div>
                <input
                  type="text"
                  placeholder="Enter your email"
                  id="email"
                  className="border-2 mt-2 p-2 w-full"
                  onChange={handleEmail}
                />
              </label>
              <label htmlFor="phone">
                <div className="mt-5 font-semibold">Phone Number</div>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  id="phone"
                  className="border-2 mt-2 p-2 w-full"
                  onChange={handlePhone}
                />
              </label>
              <label htmlFor="message">
                <div className="mt-5 font-semibold">Message</div>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Enter your message"
                  rows={3}
                  className="border-2 mt-2 p-2 w-full"
                  onChange={handleMessage}
                />
              </label>
              <button
                onClick={AddContact}
                className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded font-semibold mt-4"
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

Contact.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
export default Contact;
