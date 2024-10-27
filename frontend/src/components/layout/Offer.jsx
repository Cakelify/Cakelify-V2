import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import CakelifyGiveawayModal from "./Venom.jsx";
function Offer() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  const gradientStyle = {
    background: "linear-gradient(to bottom, #FF8C00, #FFA500)",
    minWidth: "18.5rem",
  };

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
            dragConstraints={{ right: 0, left: -300 }}
            className="inner-carousel"
          >
            {" "}
            <div
              style={gradientStyle}
              className="Offer m-2 p-2 rounded-md text-white h-20"
            >
              <div className="flex justify-between">
                {" "}
                <p className="font-bold text-base mb-0">
                  Venom The Last Dance
                </p>{" "}
                <button
                  onClick={openModal}
                  className="border-2 border-white rounded-md py-0.5 px-1 text-sm mr-3"
                >
                  View
                </button>
                <CakelifyGiveawayModal
                  isOpen={isOpen}
                  closeModal={closeModal}
                />
              </div>

              <p className="text-sm mb-0 font-medium">
                Win Big with Every Jar! 🍰 Venom Movie Night on Us at Cinepolis!
              </p>
            </div>
            <div
              style={{ minWidth: "20rem" }}
              className="Offer m-2 p-2 rounded-md text-white h-20"
            >
              <p className="font-bold text-base mb-0">Get &#8377;30 Off</p>
              <p className="text-sm mb-0 font-medium">
                Use code SAVE30 on Order above &#8377;350 <br />
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
