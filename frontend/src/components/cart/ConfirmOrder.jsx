import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { caluclateOrderCost } from "../../helpers/helpers";
import {
  useCreateNewOrderMutation,
  useRazorpayCheckoutSessionMutation,
} from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);
  const [method, setMethod] = useState("");

  const navigate = useNavigate();

  const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();
  const [
    razorpayCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useRazorpayCheckoutSessionMutation();

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      caluclateOrderCost(cartItems);

    let orderData = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice,
      shippingAmount: shippingPrice,
      taxAmount: taxPrice,
      totalAmount: totalPrice,
      paymentMethod: method,
    };

    if (method === "COD") {
      orderData = { ...orderData, paymentInfo: { status: "Not Paid" } };
      createNewOrder(orderData);
      navigate("/me/orders?order_success=true");
    }

    if (method === "Card") {
      const { data: checkoutData, error: checkoutError } =
        await razorpayCheckoutSession(orderData);
      if (checkoutError) {
        toast.error(checkoutError.data.message);
      } else {
        const options = {
          key: "rzp_live_NLupneROI3HH01",
          amount: checkoutData.order.amount,
          currency: "INR",
          name: "Cakelify",
          description: "Test Transaction",
          image:
            "https://cakelify.shop/static/media/CakelifyLogo.aa42d9ff8fc4ca9b6fdc.png",
          order_id: checkoutData.order.id,
          handler: function (response) {
            toast.success("Payment Successful");
            orderData = { ...orderData, paymentInfo: { status: "Paid" } };
            createNewOrder({
              ...orderData,
              paymentInfo: {
                id: response.razorpay_payment_id,
                status: "Paid",
              },
            });
            navigate("/ordersuccess");
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: shippingInfo.phoneNo,
          },
          notes: {
            name: user.name,
            address: shippingInfo.address,
          },
          theme: {
            color: "#f42e9f",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    }
  };

  return (
    <>
      <MetaData title={"Confirm Order Info"} />
      <div className="row d-flex justify-content-between m-1 ">
        <div className="col-12  pt-32 col-lg-8  order-confirm ">
          <h5 className="mb-3 mt-12">Shipping Info</h5>
          <p>
            <b>Name:</b> {user?.name} <br />
            <b>Phone:</b> {shippingInfo?.phoneNo}
            <br />
            <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{" "}
            {shippingInfo?.zipCode}, India
          </p>

          <hr />
          <h5 className="mt-4">Your Cart Items:</h5>

          {cartItems?.map((item) => (
            <>
              <div className="">
                <div className="flex justify-around">
                  <div className="pr-0">
                    <img
                      src={item?.image}
                      alt="Laptop"
                      height="55"
                      width="65"
                    />
                  </div>

                  <div className="pl-5 text-neutral-950">
                    <Link
                      className="text-neutral-950 text-base no-underline text"
                      to={`/product/${item.product}`}
                    >
                      {item?.name}
                    </Link>
                  </div>

                  <div className="text-center">
                    <p>
                      {item?.quantity} x &#8377;{item?.price} ={" "}
                      <b>&#8377;{(item?.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">&#8377;{itemsPrice}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">
                &#8377;{shippingPrice}
              </span>
            </p>
            <p>
              Tax:{" "}
              <span className="order-summary-values">&#8377;{taxPrice}</span>
            </p>

            <hr />

            <p>
              Total:{" "}
              <span className="order-summary-values">&#8377;{totalPrice}</span>
            </p>

            <hr />
            <form className="" onSubmit={submitHandler}>
              <div className="h-28 w-full  absolute bottom-0 buttonBG1 bg-white left-0">
                {" "}
                <p className="text-center h-7 bg-beta-yellow text-sm pt-1 font-semibold">
                  Enjoy ₹30 cashback when you pay online!
                </p>
                <div className="flex justify-around">
                  <button
                    name="payment_mode"
                    value="COD"
                    onClick={(e) => setMethod("COD")}
                    id="checkout_btn"
                    type="submit"
                    className="bg-beta-pink text-sm text-white text-center w-44 h-12 rounded-md font-medium  buttonBG1 mt-2"
                  >
                    Cash on Delivery
                  </button>
                  <button
                    name="payment_mode"
                    value="COD"
                    onClick={(e) => setMethod("Card")}
                    id="checkout_btn"
                    type="submit"
                    className="bg-beta-pink text-sm text-white text-center w-44 h-12 rounded-md font-medium  buttonBG1 mt-2"
                  >
                    Pay-UPI/CARD/
                    <br />
                    NET-BANKING
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
