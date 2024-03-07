import React from "react";
import "./Header.css";

export default function MarqueeAnnouncement() {
  return (
    <div className="marqueeContainer fixed">
      <div className="marquee text-white w-full">
        <p className="marqueePara text">
          {" "}
          &#x2022;&nbsp; 💜 Free Delivery 💜&nbsp; &#x2022;
        </p>
        <p className="marqueePara2">
          {" "}
          &#x2022;&nbsp; 💜 Free Delivery 💜&nbsp; &#x2022;
        </p>
        <p className="marqueePara3">
          {" "}
          &#x2022;&nbsp; 💜 Free Delivery 💜&nbsp; &#x2022;
        </p>
        <p className="marqueePara4">
          {" "}
          &#x2022;&nbsp; 💜 Free Delivery 💜&nbsp; &#x2022;
        </p>
        <p className="marqueePara5">
          {" "}
          &#x2022;&nbsp; 💜 Free Delivery 💜&nbsp; &#x2022;
        </p>
      </div>
    </div>
  );
}
