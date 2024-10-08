import React from "react";

import Icon1 from "./icon-1.svg";
import Icon2 from "./icon-2.svg";
import Icon3 from "./icon-3.svg";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <>
      <div className="footerWrapper mt-8">
        <div className="footerBoxes">
          <div className="container-fluid">
            <div className="row ">
              <div className="flex justify-center">
                <div className="flex justify-center bg-slate-100 w-80 p-2 h-24 rounded-md">
                  <span className="mt-3">
                    <img src={Icon1} className="w-12 mr-4" />
                  </span>
                  <div className="info mt-4">
                    <h4>Best prices & offers</h4>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <div className="flex justify-center bg-slate-100 w-80 p-2 h-24  rounded-md">
                  <span className="mt-3">
                    <img src={Icon2} className="w-12 mr-4" />
                  </span>
                  <div className="info mt-4">
                    <h4 className="mr-16">Free delivery</h4>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <div className="flex justify-center bg-slate-100 w-80 p-2 h-24  rounded-md">
                  <span className="mt-3">
                    <img src={Icon3} className="w-12 mr-4" />
                  </span>
                  <div className="info mt-4">
                    <h4 className="mr-5">Great daily deal</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="container-fluid">
            <div className="row">
              <div className="text-sm text-slate-800">
                <br />
                <br />
                {/* <p>
                  <LocationOnOutlinedIcon /> <strong>Address</strong>: 88
                  Senapati Nagar Dighori Nagpur
                </p> */}
                <p className="mb-1">
                  <HeadphonesOutlinedIcon className="text-beta-pink" />{" "}
                  <strong>Call Us:</strong> (+91) - 9021893678{" "}
                </p>
                <p>
                  <EmailOutlinedIcon className="text-beta-pink" />{" "}
                  <strong>Email:</strong> hello@cakelify.shop
                </p>
                {/* <p>
                  <WatchLaterOutlinedIcon /> <strong>Hours:</strong> 10:00 -
                  18:00, Mon - Sat
                </p> */}
              </div>

              <div className="">
                <div className="row">
                  <div className="col">
                    <h3 className="mt-3 mb-3 text-black ">More Info</h3>
                    <ul className="m-0 p-0">
                      <li>
                        <a className="no-underline text-black" href="/aboutus">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a
                          className="no-underline text-black"
                          href="/shippinganddelivery"
                        >
                          Shipping And Delivery
                        </a>
                      </li>

                      <li>
                        <a
                          className="no-underline text-black"
                          href="/privacypolicy"
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a
                          className="no-underline text-black"
                          href="/termsandconditions"
                        >
                          Terms &amp; Conditions
                        </a>
                      </li>
                      <li>
                        <a
                          className="no-underline text-black"
                          href="/contactus"
                        >
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a
                          className="no-underline text-black"
                          href="/cancellationandrefund"
                        >
                          Cancellation and Refund
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-3 part3 mt-3">
                <p className="mb-0 mt-3 text-black text-xl">
                  Secured Payment Gateways
                </p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b3/Razorpay_logo.webp"
                  className="w-24 h-auto"
                />
              </div>
            </div>

            <div className="row lastStrip">
              <div className="col-md-3 part3  part_3">
                <div className="d-flex align-items-center">
                  <h5 className="mb-3 mr-2">Follow Us</h5>
                  <ul className="list list-inline">
                    {/* <li className="list-inline-item">
                      <Link to={""}>
                        <FacebookOutlinedIcon className="text-beta-pink ml-2" />
                      </Link>
                    </li> */}
                    <li className="list-inline-item">
                      <Link to={"https://wa.me/+919021893678"}>
                        <WhatsAppIcon className="text-beta-pink" />
                      </Link>
                    </li>
                    {/* <li className="list-inline-item">
                      <Link to={"https://instagram.com/cakelify.in"}>
                        <InstagramIcon className="text-beta-pink" />
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div className="w-100% h-16"></div>
      </div>
    </>
  );
};

export default Footer;
