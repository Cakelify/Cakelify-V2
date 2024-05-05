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

const Header = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();

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
          {user ? (
            <div className="mt-2">
              <button
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropDownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={
                      user?.avatar
                        ? user?.avatar?.url
                        : "/images/default_avatar.jpg"
                    }
                    alt="User Avatar"
                    className="rounded-circle"
                  />
                </figure>
              </button>
              <div
                className="dropdown-menu w-100"
                aria-labelledby="dropDownMenuButton"
              >
                <span
                  className="dropdown-item"
                  style={{ fontFamily: "cursive" }}
                >
                  Hello {user.name}😊
                </span>
                {user?.role === "admin" && (
                  <Link className="dropdown-item" to="/admin/dashboard">
                    {" "}
                    Dashboard{" "}
                  </Link>
                )}

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  {" "}
                  Logout{" "}
                </Link>
              </div>
            </div>
          ) : (
            !isLoading && (
              <Link to="/login" className="avatar avatar-nav">
                {" "}
                <img src="/images/default_avatar.jpg" id="login_btn" alt="" />
              </Link>
            )
          )}

          <a style={{ textDecoration: "none" }} href="/">
            <img src={CakelifyLogo} className="w-36 mr-5 z-50" alt="" />
          </a>

          <a
            href="/cart"
            className="a-cart mt-3"
            style={{ textDecoration: "none" }}
          >
            <span id="cart" className="ms-3">
              {" "}
              <ShoppingCartRoundedIcon className="cartIcon" />
              <span className="cart_count" id="cart_count">
                {cartItems?.length}
              </span>{" "}
            </span>
          </a>
          {/* <div className="mr-2 mt-2.5">
            <MenuIcon />
          </div> */}
        </div>

        <div className="mx-2 mb-1">
          <Search />
        </div>
      </nav>
    </div>
  );
};

export default Header;

// import { Fragment, useState } from "react";
// import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
// import {
//   Bars3Icon,
//   MagnifyingGlassIcon,
//   ShoppingBagIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";

// export default function NavigationBar() {
//   const [open, setOpen] = useState(false);

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
//       <Transition.Root show={open} as={Fragment}>
//         <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
//           <Transition.Child
//             as={Fragment}
//             enter="transition-opacity ease-linear duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="transition-opacity ease-linear duration-300"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 z-40 flex">
//             <Transition.Child
//               as={Fragment}
//               enter="transition ease-in-out duration-300 transform"
//               enterFrom="-translate-x-full"
//               enterTo="translate-x-0"
//               leave="transition ease-in-out duration-300 transform"
//               leaveFrom="translate-x-0"
//               leaveTo="-translate-x-full"
//             >
//               <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
//                 <div className="flex px-4 pb-2 pt-5">
//                   <button
//                     type="button"
//                     className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
//                     onClick={() => setOpen(false)}
//                   >
//                     <span className="absolute -inset-0.5" />
//                     <span className="sr-only">Close menu</span>
//                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </div>

//                 {/* Links */}

//                 <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//                   <div className="flow-root">
//                     <a
//                       href="#"
//                       className="-m-2 block p-2 font-medium text-gray-900"
//                     >
//                       Sign in
//                     </a>
//                   </div>
//                   <div className="flow-root">
//                     <a
//                       href="#"
//                       className="-m-2 block p-2 font-medium text-gray-900"
//                     >
//                       Create account
//                     </a>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 px-4 py-6">
//                   <a href="#" className="-m-2 flex items-center p-2">
//                     <img
//                       src="https://tailwindui.com/img/flags/flag-canada.svg"
//                       alt=""
//                       className="block h-auto w-5 flex-shrink-0"
//                     />
//                     <span className="ml-3 block text-base font-medium text-gray-900">
//                       CAD
//                     </span>
//                     <span className="sr-only">, change currency</span>
//                   </a>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition.Root>

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
//               <button
//                 type="button"
//                 className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
//                 onClick={() => setOpen(true)}
//               >
//                 <span className="absolute -inset-0.5" />
//                 <span className="sr-only">Open menu</span>
//                 <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//               </button>

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
