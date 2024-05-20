import React from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";
import EmptyCart from "./EmptyCart.png";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const increseQty = (item, quantity) => {
    const newQty = quantity + 1;

    if (newQty > item?.stock) return;

    setItemToCart(item, newQty);
  };

  const decreseQty = (item, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    setItemToCart(item, newQty);
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
      discount: item?.discount,
    };

    dispatch(setCartItem(cartItem));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <div className="m-1">
      <MetaData title={"Your Cart"} />
      {cartItems?.length === 0 ? (
        <div className="flex flex-col justify-center pt-4 text-center">
          <h2 className="fontStyle font-semibold mt-36">Your Cart is Empty </h2>
          <p className="font-serif tracking-wider mt-5">
            "Your cart is currently empty. Time to fill it with sweetness! 🍰✨
            Explore our delectable treats and start adding joy to your cart.
            #Cakelify"
          </p>
          <img className="imgEmptyCart" src={EmptyCart} alt="" />
        </div>
      ) : (
        <>
          <hr />
          <h4 className="mt-36 text-beta-pink font-bold">
            My Cart(<>{cartItems?.length} items)</>
          </h4>

          <div className="row d-flex justify-content-between">
            <div className="">
              <div id="">
                <hr />
                <h4>
                  Subtotal{" "}
                  <span className="">
                    &#8377;
                    {cartItems
                      ?.reduce(
                        (acc, item) => acc + item?.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </h4>

                <button
                  id=""
                  className="bg-alpha-yellow text-center w-100 h-12 rounded-md font-medium mb-8 buttonBG"
                  onClick={checkoutHandler}
                >
                  Proceed to Buy :{" "}
                  <span className="">
                    {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)}{" "}
                    (Item)
                  </span>
                </button>
              </div>
            </div>

            <hr />
            <div className="col-12 col-lg-8">
              {cartItems?.map((item) => (
                <>
                  <div className="cart-item" data-key="product1">
                    <div className="row card_style">
                      <div className="img_title_gap">
                        <div className="col-4 col-lg-3 mt-2">
                          <img
                            src={item?.image}
                            alt=""
                            height="50"
                            width="75"
                          />
                        </div>
                        <div className="pl-2 pt-2 text-left text-base font-medium ">
                          <Link
                            className=" text-black no-underline"
                            to={`/products/${item?.product}`}
                          >
                            {" "}
                            {item?.name}{" "}
                          </Link>
                          <br />
                          <div className="bg-alpha-red w-16 rounded-sm">
                            <p className="mt-1 p-1 text-xs text-white text-center font-extrabold">
                              {item?.discount} off
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <div className="div_border p-1 buttonBG mb-2">
                            <span
                              className="symbol_minus pr-2 "
                              onClick={() => decreseQty(item, item.quantity)}
                            >
                              {" "}
                              -{" "}
                            </span>
                            <input
                              type="number"
                              className="count d-inline rounded-md"
                              value={item?.quantity}
                              readonly
                            />
                            <span
                              className="symbol_plus pl-2"
                              onClick={() => increseQty(item, item.quantity)}
                            >
                              {" "}
                              +{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-4  text-neutral-900 font-semibold text-2xl">
                        <p> &#8377;{item?.price}</p>
                      </div>

                      <div className="col-4  mt-4 ">
                        <i
                          id="delete_cart_item"
                          className="text-black rounded-md buttonBG font-medium not-italic div_border"
                          onClick={() => removeCartItemHandler(item?.product)}
                        >
                          Delete
                        </i>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
