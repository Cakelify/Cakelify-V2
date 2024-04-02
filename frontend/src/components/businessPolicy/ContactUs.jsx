import React from "react";
import MetaData from "../layout/MetaData";

import "bootstrap/dist/css/bootstrap.min.css";

const ContactUs = () => {
  return (
    <div className="p-3 mt-36">
      <MetaData title={"Contact Us"} />
      <h5>
        If you have any questions or concerns please contact us <br />
        Cakelify <br />
        hello@cakelify.shop <br />
        7875380727
      </h5>
    </div>
  );
};

export default ContactUs;
