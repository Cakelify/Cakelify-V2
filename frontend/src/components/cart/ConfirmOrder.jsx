import React from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { caluclateOrderCost } from "../../helpers/helpers";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);

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
            <Link
              to="/payment_method"
              id="checkout_btn"
              className="btn btn-primary w-100"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
