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
import MenuIcon from "@mui/icons-material/Menu";

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

      <nav className="pt-1 p-0 mt-4 boxShadow bg-transparent-grey fixed top-3 w-full ">
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

                <Link className="dropdown-item" to="/">
                  {" "}
                  Home{" "}
                </Link>

                <Link className="dropdown-item" to="/me/orders">
                  {" "}
                  Orders{" "}
                </Link>

                <Link className="dropdown-item" to="/me/profile">
                  {" "}
                  Profile{" "}
                </Link>

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
            <img src={CakelifyLogo} className="w-40 mr-5" alt="" />
          </a>

          <a
            href="/cart"
            className="a-cart mt-2"
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
