import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { caluclateOrderCost } from "../../helpers/helpers";
import {
  useCreateNewOrderMutation,
  useRazorpayCheckoutSessionMutation,
  useValidateCouponQuery,
} from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);

  const [method, setMethod] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalTotalPrice, setFinalTotalPrice] = useState(totalPrice);

  const navigate = useNavigate();

  const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();
  const [
    razorpayCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useRazorpayCheckoutSessionMutation();

  const { data: couponData, error: couponError } = useValidateCouponQuery(
    couponCode,
    {
      skip: !couponCode,
    }
  );

  useEffect(() => {
    if (couponError) {
      toast.error(couponError.data.message);
      setDiscount(0);
    } else if (couponData) {
      toast.success("Coupon applied successfully");
      setDiscount(couponData.discount);
    }
  }, [couponData, couponError]);

  useEffect(() => {
    if (discount > 0) {
      setFinalTotalPrice(totalPrice - (totalPrice * discount) / 100);
    } else {
      setFinalTotalPrice(totalPrice);
    }
  }, [discount, totalPrice]);

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess]);

  const applyCouponHandler = (e) => {
    e.preventDefault();
    // Coupon validation logic will be handled automatically by useValidateCouponQuery
  };

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
      totalAmount: finalTotalPrice,
      paymentMethod: method,
      couponCode,
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
            color: "#3399cc",
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
              <span className="order-summary-values">
                &#8377;{finalTotalPrice?.toFixed(2) || "Calculating..."}
              </span>
            </p>

            <hr />
            <form onSubmit={applyCouponHandler}>
              <div>
                <label>Coupon Code</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="submit">Apply Coupon</button>
              </div>
            </form>
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
                <button
                  name="payment_mode"
                  value="COD"
                  onClick={(e) => setMethod("Card")}
                  id="checkout_btn"
                  type="submit"
                  className="h-12 text-white font-semibold w-100 "
                >
                  Pay-UPI/CARD/NET-BANKING
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
