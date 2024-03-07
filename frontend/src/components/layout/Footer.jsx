import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cakelify from "./CakelifyLogo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./Header.css";

const Footer = () => {
  return (
    <footer className="flex justify-center flex-col ">
      <img src="footer.png" className="mt-4 mb-10 boxShadow" alt="" />

      <div className=" mb-2 text-slate-950">
        <div className="ml-3 flex flex-col text-left ">
          <img className="w-36" src={Cakelify} alt="" />
        </div>

        <h6 className="mt-3 ml-4 text-alpha-grey">©️2024</h6>
        <h6 className="font-medium ml-4 mt-3 text-alpha-grey mb-3">
          Join us online for exclusive updates, ❤️ <br />
          offers and fun content!
        </h6>

        <span className="flex mb-6 ml-1">
          <a href="https://www.instagram.com/cakelify.in/">
            <InstagramIcon className="ml-2" />
          </a>
          <a href="https://wa.me/917875380727">
            {" "}
            <WhatsAppIcon className="ml-2" />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
