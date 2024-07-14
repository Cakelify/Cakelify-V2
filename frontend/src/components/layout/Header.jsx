import React, { Fragment, useState } from "react";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGetMeQuery } from "../../redux/api/userApi";
import CakelifyLogo from "./CakelifyLogo.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import "./Header.css";
import MarqueeAnnouncement from "./Marquee";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import Verified from "./verify.png";
import "../Home.css";

const Header = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  const [open, setOpen] = useState(false);
  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="ForMobile">
        <MarqueeAnnouncement />

        <nav className="pt-1 p-0 mt-4 boxShadow bg-transparent-grey fixed top-3 w-full z-50">
          <div className="custom-nav-div">
            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                      <div className="flex px-4 pb-2 pt-5">
                        <button
                          type="button"
                          className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                        {user ? (
                          <div>
                            <div className="flex">
                              <h6
                                className="mr-2"
                                style={{ fontFamily: "cursive" }}
                              >
                                Welcome
                              </h6>
                              <h6>{user.name}</h6>
                              <img src={Verified} className="h-6" alt="" />
                            </div>
                            <div className="bg-beta-pink w-56 h-10 rounded-md  mb-8 buttonBG1 mt-2">
                              <Link
                                to="/"
                                className="text-sm  text-center mt-0.5 -m-2 block p-2 font-medium  no-underline text-white"
                                onClick={() => {
                                  logoutHandler();
                                  handleLinkClick();
                                }}
                              >
                                Logout
                              </Link>
                            </div>
                          </div>
                        ) : (
                          !isLoading && (
                            <div className="flow-root">
                              <div className="bg-beta-pink w-56 h-10 rounded-md  mb-8 buttonBG1">
                                <Link
                                  to="/login"
                                  className="text-sm  text-center mt-0.5 -m-2 block p-2 font-medium  no-underline text-white"
                                  onClick={handleLinkClick}
                                >
                                  Log in / Register Now
                                </Link>
                              </div>
                            </div>
                          )
                        )}
                        <ul className="m-0 p-0">
                          <h6>
                            <li className="mb-3">
                              <Link
                                className="no-underline text-black"
                                to="/aboutus"
                                onClick={handleLinkClick}
                              >
                                About Us
                              </Link>
                            </li>
                            <hr />
                            <li className="mb-3">
                              <Link
                                className="no-underline text-black"
                                to="/shippinganddelivery"
                                onClick={handleLinkClick}
                              >
                                Shipping And Delivery
                              </Link>
                            </li>
                            <hr />
                            <li className="mb-3">
                              <Link
                                className="no-underline text-black"
                                to="/privacypolicy"
                                onClick={handleLinkClick}
                              >
                                Privacy Policy
                              </Link>
                            </li>
                            <hr />
                            <li className="mb-3">
                              <Link
                                className="no-underline text-black"
                                to="/termsandconditions"
                                onClick={handleLinkClick}
                              >
                                Terms & Conditions
                              </Link>
                            </li>
                            <hr />
                            <li className="mb-3">
                              <Link
                                className="no-underline text-black"
                                to="/contactus"
                                onClick={handleLinkClick}
                              >
                                Contact Us
                              </Link>
                            </li>
                            <hr />
                            <li>
                              <Link
                                className="no-underline text-black"
                                to="/cancellationandrefund"
                                onClick={handleLinkClick}
                              >
                                Cancellation and Refund
                              </Link>
                            </li>
                            <hr />
                            <li className="mb-3">
                              <Link
                                className="no-underline text-black"
                                to="/messages"
                                onClick={handleLinkClick}
                              >
                                Career
                              </Link>
                            </li>
                            <hr />
                          </h6>
                        </ul>

                        {user?.role === "admin" && (
                          <div className="flow-root">
                            <Link
                              className="-m-2 block p-2 font-medium text-gray-900"
                              to="/admin/dashboard"
                              onClick={handleLinkClick}
                            >
                              Dashboard
                            </Link>
                          </div>
                        )}
                      </div>
                      <div className="row lastStrip pl-4 pt-8">
                        <a style={{ textDecoration: "none" }} href="/">
                          <img
                            src={CakelifyLogo}
                            className="w-36 z-50 pb-2"
                            alt=""
                          />
                        </a>
                        <div className="col-md-3 part3 part_3">
                          <div className="d-flex align-items-center">
                            <h5 className="mb-3 mr-2">Follow Us</h5>
                            <ul className="list list-inline">
                              <li className="list-inline-item">
                                <Link to={"https://wa.me/+918830641796"}>
                                  <WhatsAppIcon className="text-beta-pink" />
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link to={"https://instagram.com/cakelify.in"}>
                                  <InstagramIcon className="text-beta-pink" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
            <button
              type="button"
              className="relative rounded-md ml-2 p-2 text-gray-800 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <a style={{ textDecoration: "none" }} href="/">
              <img src={CakelifyLogo} className="w-36 z-50" alt="" />
            </a>

            <a
              href="/cart"
              className="a-cart mt-3"
              style={{ textDecoration: "none" }}
            >
              <span id="cart">
                <ShoppingCartRoundedIcon className="cartIcon ml-3" />
                <span className="cart_count" id="cart_count">
                  {cartItems?.length}
                </span>
              </span>
            </a>
          </div>
          <div className="mx-2 mb-1">
            <Search />
          </div>
        </nav>
      </div>

      <div className="ForDesktop">
        <MarqueeAnnouncement />

        <nav className="pt-1 p-0 mt-4 boxShadow bg-transparent-grey fixed top-3 w-full z-50 px-2">
          <div className="flex justify-around">
            {" "}
            <a style={{ textDecoration: "none" }} href="/">
              <img src={CakelifyLogo} className="w-36 z-50" alt="" />
            </a>
            <Search />
            <div className="space-y-6 flex gap-2">
              {user ? (
                <div className="flex mt-2 gap-4">
                  <div className="">
                    <h6 className="mr-2 mb-0" style={{ fontFamily: "cursive" }}>
                      Welcome
                    </h6>
                    <div className="flex">
                      <h6>{user.name}</h6>
                      <img src={Verified} className="h-6 ml-2" alt="" />
                    </div>
                  </div>
                  <div className="bg-beta-pink w-32 h-10 rounded-md  buttonBG1 mt-1">
                    <Link
                      to="/"
                      className="text-sm  text-center mt-0.5 -m-2 block p-2 font-medium  no-underline text-white"
                      onClick={() => {
                        logoutHandler();
                        handleLinkClick();
                      }}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                !isLoading && (
                  <div className="flow-root">
                    <div className="bg-beta-pink w-56 h-10 rounded-md mt-2 buttonBG1">
                      <Link
                        to="/login"
                        className="text-sm  text-center mt-0.5 -m-2 block p-2 font-medium  no-underline text-white"
                        onClick={handleLinkClick}
                      >
                        Log in / Register Now
                      </Link>
                    </div>
                  </div>
                )
              )}

              {user?.role === "admin" && (
                <div className="flow-root">
                  <Link
                    className="-m-2 block p-2 font-medium text-gray-900"
                    to="/admin/dashboard"
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
            <a
              href="/cart"
              className="a-cart mt-3 flex "
              style={{ textDecoration: "none" }}
            >
              <p className="text-black mt-1.5 font-bold">Cart</p>
              <span id="cart">
                <ShoppingCartRoundedIcon className="cartIcon ml-3" />
                <span className="cart_count" id="cart_count">
                  {cartItems?.length}
                </span>
              </span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
