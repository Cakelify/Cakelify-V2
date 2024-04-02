import React from "react";
import MetaData from "../layout/MetaData";

import "bootstrap/dist/css/bootstrap.min.css";

const PrivacyPolicy = () => {
  return (
    <div className="p-3 mt-36">
      <MetaData title={"Privacy Policy"} />
      <h3>Privacy Policy for Cakelify</h3>
      <h5>
        At Cakelify, we value your privacy and are committed to protecting your
        personal information. This Privacy Policy outlines how we collect, use,
        and safeguard your information when you visit our website or make a
        purchase from us
      </h5>
      <ol>
        <li>
          Information We Collect: - When you visit our website, we may collect
          personal information such as your name, email address, shipping
          address, and payment information.
        </li>
        <li>
          How We Use Your Information: - We use the personal information you
          provide to process your orders, communicate with you about your
          orders, and provide customer support.
        </li>
        <li>
          Information Sharing: - We do not sell, trade, or rent your personal
          information to third parties. - We may also release your information
          when we believe it is appropriate to comply with the law, enforce our
          site policies, or protect ours or others' rights, property, or safety.
        </li>
        <li>
          {" "}
          Data Security: - We take reasonable measures to protect your personal
          information from unauthorized access, disclosure, alteration, or
          destruction. - Your payment information is encrypted using secure
          socket layer technology (SSL).
        </li>
        <li>
          Cookies: - We use cookies to enhance your browsing experience and
          track website usage. You can disable cookies in your browser settings,
          but this may affect your ability to use certain features of our
          website.
        </li>
        <li>
          Changes to This Privacy Policy: - We may update this Privacy Policy
          from time to time. Any changes will be posted on this page, and the
          updated policy will be effective when posted. By using our website,
          you consent to the terms of this Privacy Policy.
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

export default PrivacyPolicy;
