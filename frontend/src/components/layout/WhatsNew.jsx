import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import "../product/ProductCarousel.css";
import WB2 from "../WB2.jpg";
import WB3 from "../WB3.jpg";

function WhatsNew() {
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  // useEffect(() => {
  //   setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  // }, []);
  const sata = [{ img: WB2 }, { img: WB3 }];
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
            dragConstraints={{ right: 0, left: -360 }}
            className="inner-carousel"
          >
            {" "}
            {sata.map((d) => (
              <img
                className=" h-56 w-76 rounded-3xl py-4 px-2 mx-1d"
                src={d.img}
                alt=""
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default WhatsNew;
