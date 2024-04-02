import React from "react";
import MetaData from "../layout/MetaData";

import "bootstrap/dist/css/bootstrap.min.css";

const ShippingAndDelivery = () => {
  return (
    <div className="p-3 mt-36">
      <MetaData title={"Shipping and Delivery"} />
      <h6>Shipping and Delivery Policy</h6>
      <h6>- We offer shipping to addresses within Nagpur</h6>
      <ol>
        <li>
          <p>Shipping Times</p>
          <h6> Orders are typically processed and shipped within 2 days.</h6>
        </li>
        <li>
          <p>Delivery Issues</p>
          <h6>
            - If you encounter any issues with your delivery, such as delays or
            damaged packages, please contact us immediately.
          </h6>
        </li>
      </ol>
      <h6>
        If you have any questions or concerns about our privacy practices,
        please contact us <br />
        Cakelify <br />
        hello@cakelify.shop <br />
        7875380727
      </h6>
    </div>
  );
};

export default ShippingAndDelivery;
