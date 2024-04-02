import React from "react";
import MetaData from "../layout/MetaData";

import "bootstrap/dist/css/bootstrap.min.css";

const TermsAndConditions = () => {
  return (
    <div className="p-3 mt-36">
      <MetaData title={"Terms And Conditions"} />
      <h3>Terms And Conditions for Cakelify</h3>
      <h4>
        Welcome to Cakelify! These terms and conditions govern your use of our
        website and the purchase of products from us. By accessing our website
        and placing an order, you agree to be bound by these terms and
        conditions.
      </h4>
      <ol>
        <li>
          <h3>Ordering Process</h3>
          <h5>
            - To place an order, you must create an account on our website and
            provide accurate and complete information. - By placing an order,
            you are offering to purchase a product subject to these terms and
            conditions. - We reserve the right to accept or reject any order at
            our discretion.
          </h5>
        </li>
        <li>
          <h3>Product Information</h3>
          <h5>
            - We strive to provide accurate descriptions, images, and prices of
            our cakes and other products. However, variations may occur, and we
            reserve the right to correct any errors.
          </h5>
        </li>
        <li>
          <h3>Payment Terms</h3>
          <h5>
            {" "}
            - Payment for orders must be made at the time of purchase using one
            of the accepted payment methods listed on our website
          </h5>
        </li>
        <li>
          <h3>Delivery and Shipping</h3>
          <h5>
            {" "}
            It is your responsibility to provide accurate delivery information.
            We are not liable for any delays or failed deliveries resulting from
            incorrect addresses provided by you.
          </h5>
        </li>
        <li>
          <h3>Returns and Refunds</h3>
          <h5>
            {" "}
            - Refunds will be issued for returned products that are unused, in
            their original packaging, and in resalable condition, minus any
            applicable restocking fees or return shipping costs. - We reserve
            the right to refuse returns or refunds for products that have been
            customized or personalized
          </h5>
        </li>
        <li>
          <h3>Privacy Policy</h3>
          <h5>
            - Your privacy is important to us. Please review our privacy policy
            to understand how we collect, use, and protect your personal
            information.
          </h5>
        </li>
      </ol>
      <h5>
        If you have any questions or concerns please contact us <br />
        Cakelify <br />
        hello@cakelify.shop <br />
        7875380727
      </h5>
    </div>
  );
};

export default TermsAndConditions;
