import React from "react";
import MetaData from "../layout/MetaData";

import "bootstrap/dist/css/bootstrap.min.css";

const ShippingAndDelivery = () => {
  return (
    <div className="p-3 mt-36">
      <MetaData title={"Shipping and Delivery"} />
      <h3>Shipping and Delivery Policy</h3>
      <h5>- We offer shipping to addresses within Nagpur</h5>
      <ol>
        <li>
          <h4>Shipping Times</h4>
          <h5>
            {" "}
            - While we make every effort to deliver your order within the
            estimated timeframe, please note that delivery times are not
            guaranteed and may be affected by factors beyond our control, such
            as weather conditions or carrier delays.
          </h5>
        </li>
        <li>
          <h4>Delivery Issues</h4>
          <h5>
            - If you encounter any issues with your delivery, such as delays or
            damaged packages, please contact us immediately.
          </h5>
        </li>
      </ol>
      <h5>
        If you have any questions or concerns about our privacy practices,
        please contact us <br />
        Cakelify <br />
        hello@cakelify.shop <br />
        7875380727
      </h5>
    </div>
  );
};

export default ShippingAndDelivery;
