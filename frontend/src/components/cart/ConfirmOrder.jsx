import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { caluclateOrderCost } from "../../helpers/helpers";
import axios from "axios";
import But from "./But";
import { useCreateNewOrderMutation } from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);

  const [method, setMethod] = useState("");

  const navigate = useNavigate();

  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      caluclateOrderCost(cartItems);

    if (method === "COD") {
      // Create COD Order
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };

      createNewOrder(orderData);
    }

    if (method === "Card") {
      // Stripe Checkout
      // alert("Card");
    }
  };

  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("/api/v1/getkey");
    const {
      data: { order },
    } = await axios.post("/api/v1/checkout", {
      amount,
    });
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Cakelify",
      description: "Tutorial of Razorpay",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ8J1P1RQRL9r7A7Mh5WqI6QZCL145mX9PXQ&s",
      order_id: order.id,
      callback_url: "/api/v1/paymentverification",
      prefill: {
        name: "Vrushali kalaskar",
        email: "vrushalikalaskarkk143@gmail.com",
        contact: "9890473307",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <>
      <MetaData title={"Confirm Order Info"} />
      <div className="row d-flex justify-content-between m-1 ">
        <div className="col-12  pt-32 col-lg-8  order-confirm ">
          <h4 className="mb-3 mt-12">Shipping Info</h4>
          <p>
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo?.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{" "}
            {shippingInfo?.zipCode}, India
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

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
                      className="text-neutral-950 text-lg no-underline"
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
              <h2 className="mb-4 mt-12 ml-4">Select Payment Method</h2>

              <div className="">
                <button
                  name="payment_mode"
                  value="COD"
                  onClick={(e) => setMethod("COD")}
                  id="checkout_btn"
                  type="submit"
                  className="h-12 text-white font-semibold w-100 "
                >
                  Cash on Delivery
                </button>
              </div>
              <div className="">
                {/* <button
                  className="h-12 text-white font-semibold w-100 "
                  type="radio"
                  name="payment_mode"
                  // id="cardradio"
                  value="Card"
                  onClick={(e) => setMethod("Card")}
                >
                </button> */}

                <But amount={totalPrice} checkoutHandler={checkoutHandler} />
                {/* <label className="form-check-label" htmlFor="cardradio">
                  Card - VISA, MasterCard
                </label> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
