import React from "react";
import MetaData from "../layout/MetaData";

import "bootstrap/dist/css/bootstrap.min.css";

const TermsAndConditions = () => {
  return (
    <div className="p-3 mt-36">
      <MetaData title={"Terms And Conditions"} />
      <h6>Terms And Conditions for Cakelify</h6>
      <h6>
        Welcome to Cakelify! These terms and conditions govern your use of our
        website and the purchase of products from us. By accessing our website
        and placing an order, you agree to be bound by these terms and
        conditions.
      </h6>
      <ol>
        <li>
          <h6>Ordering Process</h6>
          <h6>
            - To place an order, you must create an account on our website and
            provide accurate and complete information. - By placing an order,
            you are offering to purchase a product subject to these terms and
            conditions. - We reserve the right to accept or reject any order at
            our discretion.
          </h6>
        </li>
        <li>
          <h6>Product Information</h6>
          <h6>
            - We strive to provide accurate descriptions, images, and prices of
            our cakes and other products. However, variations may occur, and we
            reserve the right to correct any errors.
          </h6>
        </li>
        <li>
          <h6>Payment Terms</h6>
          <h6>
            {" "}
            - Payment for orders must be made at the time of purchase using one
            of the accepted payment methods listed on our website
          </h6>
        </li>
        <li>
          <h6>Delivery and Shipping</h6>
          <h6>
            {" "}
            It is your responsibility to provide accurate delivery information.
            We are not liable for any delays or failed deliveries resulting from
            incorrect addresses provided by you.
          </h6>
        </li>
        <li>
          <h6>Returns and Refunds</h6>
          <h6>
            {" "}
            - Refunds will be issued for returned products that are unused, in
            their original packaging, and in resalable condition, minus any
            applicable restocking fees or return shipping costs. - We reserve
            the right to refuse returns or refunds for products that have been
            customized or personalized
          </h6>
        </li>
        <li>
          <h6>Privacy Policy</h6>
          <h6>
            - Your privacy is important to us. Please review our privacy policy
            to understand how we collect, use, and protect your personal
            information.
          </h6>
        </li>
      </ol>
      <h6>
        If you have any questions or concerns please contact us <br />
        Cakelify <br />
        hello@cakelify.shop <br />
        7875380727
      </h6>
    </div>
  );
};

export default TermsAndConditions;
