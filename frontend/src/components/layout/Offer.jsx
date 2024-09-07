import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
function Offer() {
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  return (
    <>
      <div className="mt-0 pt-0">
        <motion.div
          ref={carousel}
          className="carousel"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -320 }}
            className="inner-carousel"
          >
            {" "}
            <div className="Offer m-2 rounded-md text-white mt-2 min-w-84 p-3 h-28">
              <p className="font-bold text-lg mb-0">Happy Ganesh Chaturthi</p>
              <p className="text-base mb-0 font-medium">
                Use code GANESHA on Orders above &#8377;350 and get &#8377;30
                Off
              </p>
            </div>
            <div className="Offer m-2 rounded-md text-white mt-2 min-w-84 h-28">
              <p className="font-bold text-lg mb-0">Get &#8377;30 Off</p>
              <p className="text-base mb-0 font-medium">
                Use code SAVE30 on Orders above &#8377;350 <br />
                Today
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default Offer;
