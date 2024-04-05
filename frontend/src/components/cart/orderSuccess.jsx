import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import { caluclateOrderCost } from "../../helpers/helpers";
import { useSelector } from "react-redux";
import { useCreateNewOrderMutation } from "../../redux/api/orderApi";

function OrderSuccess() {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);

  //   const [method, setMethod] = useState("");

  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();

  const navigate = useNavigate(); // Initialize useHistory

  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, []);

  useEffect(() => {
    navigate("/me/orders?order_success=true");
  });

  useEffect(() => {
    // Function to execute when the component mounts

    // Redirect to the next page after 5 seconds (5000 milliseconds)
    const redirectTimeout = setTimeout(() => {
      navigate("/me/orders"); // Replace '/next-page' with your desired route
    }, 1000);

    // Clear the timeout to prevent memory leaks when the component unmounts
    return () => clearTimeout(redirectTimeout);
  }, [navigate]); // Include history in the dependency array to prevent unnecessary re-renders

  const submitHandler = (e) => {
    e.preventDefault();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      caluclateOrderCost(cartItems);

    // Stripe Checkout
    const orderData = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice,
      shippingAmount: shippingPrice,
      taxAmount: taxPrice,
      totalAmount: totalPrice,
      paymentInfo: {
        status: "Successful",
      },
      paymentMethod: "Online",
    };

    createNewOrder(orderData);
  };

  return (
    <div>
      {/* Your JSX for buttons */}

      <button ref={buttonRef} onClick={submitHandler}>
        Button 1
      </button>
    </div>
  );
}

export default OrderSuccess;
