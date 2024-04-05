import React from "react";

const But = ({ amount, checkoutHandler }) => {
  return (
    <>
      <button
        id="checkout_btn"
        className="h-12 text-white font-semibold w-100"
        onClick={() => checkoutHandler(amount)}
      >
        Pay-UPI/CARD/NET-BANKING
      </button>
    </>
  );
};

export default But;
