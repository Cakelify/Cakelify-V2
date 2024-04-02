import React from "react";
import MetaData from "../layout/MetaData";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import EmailTemplate from "./email-icon.svg";

import "bootstrap/dist/css/bootstrap.min.css";

const ContactUs = () => {
  return (
    <div className="p-3 mt-36">
      <MetaData title={"Contact Us"} />
      <p className="h6">
        If you have any questions or concerns please contact us <br /> <br />
        Cakelify <br />
        <div className="flex gap-1">
          <img src={EmailTemplate} className="mb-2" alt="" />
          <p>&nbsp;hello@cakelify.shop</p>{" "}
        </div>
        <HeadphonesOutlinedIcon /> 7875380727 <br />
        <LocationOnOutlinedIcon />
        &nbsp;Senapati Nagar, Dighori, Nagpur &nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;440034
      </p>
    </div>
  );
};

export default ContactUs;
