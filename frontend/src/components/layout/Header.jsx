import React from "react";
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
import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

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

  const textStyle = {
    fontFamily: "Allura",
    fontSize: "3.2rem",
    fontWeight: "900",
    letterSpacing: "2.7px",
    color: "red",
  };
  return (
    <div>
      <MarqueeAnnouncement />

      <nav className="pt-1 p-0 mt-4 boxShadow bg-transparent-grey fixed top-3 w-full z-50 ">
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

                    {/* Links */}

                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                      <ul className="m-0 p-0">
                        <h3>
                          <li className="mb-3">
                            <a
                              className="no-underline text-black"
                              href="/aboutus"
                            >
                              About Us
                            </a>
                          </li>
                          <hr />
                          <li className="mb-3">
                            <a
                              className="no-underline text-black"
                              href="/shippinganddelivery"
                            >
                              Shipping And Delivery
                            </a>
                          </li>
                          <hr />
                          <li className="mb-3">
                            <a
                              className="no-underline text-black"
                              href="/privacypolicy"
                            >
                              Privacy Policy
                            </a>
                          </li>
                          <hr />
                          <li className="mb-3">
                            <a
                              className="no-underline text-black"
                              href="/termsandconditions"
                            >
                              Terms &amp; Conditions
                            </a>
                          </li>
                          <hr />
                          <li className="mb-3">
                            <a
                              className="no-underline text-black"
                              href="/contactus"
                            >
                              Contact Us
                            </a>
                          </li>
                          <hr />
                          <li>
                            <a
                              className="no-underline text-black"
                              href="/cancellationandrefund"
                            >
                              Cancellation and Refund
                            </a>
                          </li>
                          <hr />
                        </h3>
                      </ul>

                      {user ? (
                        <div>
                          <div>
                            <h5 className="" style={{ fontFamily: "cursive" }}>
                              Hello {user.name}😊
                            </h5>

                            <Link
                              to="/"
                              className="-m-2 block p-2 font-medium text-gray-900"
                              onClick={logoutHandler}
                            >
                              {" "}
                              Logout{" "}
                            </Link>
                          </div>
                        </div>
                      ) : (
                        !isLoading && (
                          <div className="flow-root">
                            <Link
                              to="/login"
                              className="-m-2 block p-2 font-medium text-gray-900"
                            >
                              {" "}
                              Sign in
                            </Link>
                          </div>
                        )
                      )}

                      {user?.role === "admin" && (
                        <div className="flow-root">
                          <Link
                            className="-m-2 block p-2 font-medium text-gray-900"
                            to="/admin/dashboard"
                          >
                            {" "}
                            Dashboard{" "}
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
            className="a-cart mt-3 "
            style={{ textDecoration: "none" }}
          >
            <span id="cart" className="">
              {" "}
              <ShoppingCartRoundedIcon className="cartIcon ml-3" />
              <span className="cart_count" id="cart_count">
                {cartItems?.length}
              </span>{" "}
            </span>
          </a>
        </div>

        <div className="mx-2 mb-1">
          <Search />
        </div>
      </nav>
    </div>
  );
};

export default Header;

// export default function NavigationBar() {

//   const navigate = useNavigate();
//   const { isLoading } = useGetMeQuery();

//   const [logout] = useLazyLogoutQuery();

//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.cart);

//   const logoutHandler = () => {
//     logout();
//     navigate(0);
//   };

//   const textStyle = {
//     fontFamily: "Allura",
//     fontSize: "3.2rem",
//     fontWeight: "900",
//     letterSpacing: "2.7px",
//     color: "red",
//   };

//   return (
//     <div className="bg-white">
//       {/* Mobile menu */}

//       <header className="relative bg-white">
//         <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
//           Get free delivery on orders over $100
//         </p>

//         <nav
//           aria-label="Top"
//           className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
//         >
//           <div className="border-b border-gray-200">
//             <div className="flex h-16 items-center">

//               {/* Logo */}
//               <div className="ml-4 flex lg:ml-0">
//                 <a style={{ textDecoration: "none" }} href="/">
//                   <img src={CakelifyLogo} className="w-36 mr-5 z-50" alt="" />
//                 </a>
//               </div>

//               {/* Flyout menus */}

//               <div className="ml-auto flex items-center">
//                 <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
//                   <a
//                     href="#"
//                     className="text-sm font-medium text-gray-700 hover:text-gray-800"
//                   >
//                     Sign in
//                   </a>
//                   <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
//                   <a
//                     href="#"
//                     className="text-sm font-medium text-gray-700 hover:text-gray-800"
//                   >
//                     Create account
//                   </a>
//                 </div>

//                 <div className="hidden lg:ml-8 lg:flex">
//                   <a
//                     href="#"
//                     className="flex items-center text-gray-700 hover:text-gray-800"
//                   >
//                     <img
//                       src="https://tailwindui.com/img/flags/flag-canada.svg"
//                       alt=""
//                       className="block h-auto w-5 flex-shrink-0"
//                     />
//                     <span className="ml-3 block text-sm font-medium">CAD</span>
//                     <span className="sr-only">, change currency</span>
//                   </a>
//                 </div>

//                 {/* Search */}
//                 {/* <div className="flex lg:ml-6">
//                   <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
//                     <span className="sr-only">Search</span>
//                     <MagnifyingGlassIcon
//                       className="h-6 w-6"
//                       aria-hidden="true"
//                     />
//                   </a>
//                 </div> */}

//                 {/* Cart */}
//                 <div className="ml-4 flow-root lg:ml-6">
//                   {/* <a href="#" className="group -m-2 flex items-center p-2">
//                     <ShoppingBagIcon
//                       className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                       aria-hidden="true"
//                     />
//                     <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
//                       0
//                     </span>
//                     <span className="sr-only">items in cart, view bag</span>
//                   </a> */}
//                   <a
//                     href="/cart"
//                     className="a-cart mt-3"
//                     style={{ textDecoration: "none" }}
//                   >
//                     <span id="cart" className="ms-3">
//                       {" "}
//                       <ShoppingBagIcon
//                         className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                         aria-hidden="true"
//                       />
//                       <span className="cart_count" id="cart_count">
//                         {cartItems?.length}
//                       </span>{" "}
//                     </span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// }
