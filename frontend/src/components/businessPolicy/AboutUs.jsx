import React from "react";
import MetaData from "../layout/MetaData";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import EmailTemplate from "./email-icon.svg";

import "bootstrap/dist/css/bootstrap.min.css";

const AboutUs = () => {
  return (
    <div className="p-3 mt-36">
      <MetaData title={"About Us"} />
      <h3>About Us</h3>
      <h6 className="h6">
        Welcome to Cakelify, where we bring joy and sweetness to life's special
        moments with our delicious cakes and desserts! <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;At Cakelify, we're passionate about baking
        and creating delectable treats that delight the senses and create
        lasting memories. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; What sets us apart is our commitment to
        quality, creativity, and customer satisfaction. We use only the finest
        ingredients to craft our cakes, from rich chocolates and velvety creams
        to fresh fruits and delicate spices. Each cake is made with love and
        attention to detail, ensuring a delicious and memorable experience with
        every bite. Whether you're celebrating a birthday, wedding, anniversary,
        or any other special occasion, we have a cake for every moment. From
        elegant tiered cakes adorned with intricate decorations to whimsical
        cupcakes bursting with flavor, our menu offers a variety of options to
        suit your taste and style. <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For inquiries, custom orders, or just to
        say hello, feel free to contact us. <br />
        Sincerely, The Cakelify Team
      </h6>
    </div>
  );
};

export default AboutUs;
