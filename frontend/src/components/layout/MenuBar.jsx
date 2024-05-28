import React, { useEffect, useState } from "react";
import "./Header.css";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import { Link } from "react-router-dom";

export default function MenuBar() {
  const [selectedButton, setSelectedButton] = useState(null);

  // Load selected button from local storage when component mounts
  useEffect(() => {
    const storedSelectedButton = localStorage.getItem("selectedButton");
    if (storedSelectedButton) {
      setSelectedButton(parseInt(storedSelectedButton));
    }
  }, []);

  const handleButtonClick = (buttonId) => {
    if (selectedButton === buttonId) {
      setSelectedButton(null); // Deselect if the same button is clicked again
      localStorage.removeItem("selectedButton");
    } else {
      setSelectedButton(buttonId); // Select the clicked button
      localStorage.setItem("selectedButton", buttonId);
    }
  };

  return (
    <>
      <div className="w-full boxShadow h-14 bg-white absolute bottom-0 z-30 pr-2 left-0">
        <div className="flex justify-around mt-1">
          <div className="flex flex-col justify-center gap-0">
            {selectedButton === 1 && window.location.pathname === "/" ? (
              <span>
                <Link className="dropdown-item" to="/">
                  <HomeIcon className="ml-1 text-alpha-pink" />{" "}
                </Link>
                <p className="text text-sm font-bold">store</p>
              </span>
            ) : (
              <span className="">
                <Link className="dropdown-item" to="/">
                  <HomeIcon
                    className="ml-1 text-gray-400"
                    onClick={() => handleButtonClick(1)}
                  />
                </Link>
                <p className="text text-sm ">store</p>
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center gap-0">
            {selectedButton === 2 &&
            window.location.pathname === "/me/orders" ? (
              <span>
                {" "}
                <Link className="dropdown-item" to="/me/orders">
                  <LocalMallIcon className=" ml-2 text-alpha-pink" />{" "}
                </Link>
                <p className="text text-sm font-bold">orders</p>
              </span>
            ) : (
              <span className="">
                <Link className="dropdown-item" to="/me/orders">
                  <LocalMallIcon
                    className="text-gray-400 ml-2"
                    onClick={() => handleButtonClick(2)}
                  />
                </Link>
                <p className="text text-sm ">orders</p>
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center gap-0">
            {selectedButton === 3 &&
            window.location.pathname === "/me/profile" ? (
              <span>
                <Link className="dropdown-item" to="/me/profile">
                  <AccountCircleIcon className=" text-alpha-pink ml-4 " />{" "}
                </Link>{" "}
                <p className="text text-sm font-bold">account</p>
              </span>
            ) : (
              <span className="">
                <Link className="dropdown-item" to="/me/profile">
                  <AccountCircleIcon
                    className="text-gray-400 ml-3"
                    onClick={() => handleButtonClick(3)}
                  />
                </Link>
                <p className="text text-sm ">account</p>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
