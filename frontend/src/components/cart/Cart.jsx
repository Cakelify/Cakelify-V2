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
          <div className="row d-flex justify-content-between pt-40">
            <div>
              <p className="ml-2 font-semibold flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  className="offersV2-base-discountIcon"
                >
                  <g fill="#000" fill-rule="evenodd">
                    <path d="M15.292 10.687v.001c-.198.742.076 1.454.296 2.026l.045.12-.137.021c-.602.094-1.352.211-1.892.75-.538.54-.655 1.288-.748 1.89l-.022.138a22.096 22.096 0 0 1-.12-.045c-.443-.171-.946-.364-1.49-.364-.185 0-.366.023-.536.068-.728.194-1.198.78-1.577 1.249-.032.04-.07.088-.111.137l-.112-.138c-.378-.47-.848-1.054-1.575-1.248a2.092 2.092 0 0 0-.537-.068c-.543 0-1.046.193-1.49.364l-.12.045-.022-.138c-.093-.602-.21-1.35-.749-1.89-.539-.539-1.289-.656-1.891-.75l-.137-.022a15 15 0 0 1 .045-.118c.22-.573.494-1.286.296-2.027-.194-.728-.78-1.199-1.25-1.577L1.323 9l.137-.11c.47-.38 1.055-.85 1.249-1.577.198-.742-.076-1.455-.296-2.028l-.045-.118.137-.022c.602-.094 1.352-.211 1.891-.75.54-.539.656-1.289.75-1.891l.022-.137.119.045c.443.171.947.365 1.49.365.186 0 .367-.024.537-.07.727-.193 1.198-.778 1.576-1.248L9 1.322l.111.137c.379.47.85 1.055 1.576 1.249.17.045.352.069.537.069.544 0 1.047-.194 1.491-.365l.119-.045.022.137c.094.602.21 1.353.75 1.891.538.539 1.288.656 1.89.75l.138.022-.046.119c-.22.572-.494 1.285-.295 2.026.194.728.778 1.199 1.248 1.577.04.033.088.07.137.111l-.137.11c-.47.38-1.054.85-1.249 1.577M18 9c0-.744-1.459-1.286-1.642-1.972-.19-.71.797-1.907.437-2.529-.364-.63-1.898-.372-2.41-.884-.511-.511-.253-2.045-.883-2.41a.647.647 0 0 0-.33-.08c-.585 0-1.403.542-1.998.542a.778.778 0 0 1-.201-.025C10.286 1.46 9.743 0 9 0c-.744 0-1.286 1.459-1.972 1.642a.78.78 0 0 1-.2.025c-.596 0-1.414-.542-2-.542a.647.647 0 0 0-.33.08c-.63.365-.37 1.898-.883 2.41-.512.512-2.046.254-2.41.884-.36.62.627 1.819.437 2.529C1.46 7.714 0 8.256 0 9s1.459 1.286 1.642 1.972c.19.71-.797 1.908-.437 2.53.364.63 1.898.371 2.41.883.511.512.253 2.045.884 2.41.097.056.208.08.33.08.585 0 1.403-.542 1.998-.542a.78.78 0 0 1 .201.025C7.714 16.54 8.256 18 9 18s1.286-1.46 1.973-1.642a.774.774 0 0 1 .2-.025c.595 0 1.413.542 1.998.542a.647.647 0 0 0 .33-.08c.631-.365.373-1.898.884-2.41.512-.512 2.046-.254 2.41-.884.36-.62-.627-1.819-.437-2.529C16.54 10.286 18 9.744 18 9"></path>
                    <path d="M10.897 6.34l-4.553 4.562a.536.536 0 0 0 .76.758l4.552-4.562a.536.536 0 0 0-.76-.758M6.75 7.875a1.126 1.126 0 0 0 0-2.25 1.126 1.126 0 0 0 0 2.25M11.25 10.125a1.126 1.126 0 0 0 0 2.25 1.126 1.126 0 0 0 0-2.25"></path>
                  </g>
                </svg>
                &nbsp; Available Offers
              </p>
              <ul>
                <li className="f text-gray-500">
                  Enjoy &#8377;30 cashback when you pay online!{" "}
                </li>
              </ul>
            </div>
            <div className="h-4 bg-bg-grey  w-full "></div>
            <div className="col-12 col-lg-8 ">
              {cartItems?.map((item) => (
                <>
                  <div className="p-1" data-key="product1">
                    <div className="row ">
                      <div className="flex">
                        <div className="col-4 col-lg-3 mt-2">
                          <img
                            src={item?.image}
                            alt=""
                            height="100"
                            width="80"
                          />
                        </div>
                        <div className="pl-2 pt-2 text-base font-medium ">
                          <Link
                            className=" text-black no-underline"
                            to={`/products/${item?.product}`}
                          >
                            {" "}
                            {item?.name}{" "}
                          </Link>
                          <br />
                          <div className="">
                            {item && item.discount ? (
                              <p className="mt-1 p-1 text-xs text-white text-center font-extrabold bg-alpha-red w-16 rounded-sm">
                                ({item?.discount}% off)
                              </p>
                            ) : null}
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
                    </div>{" "}
                    <div className="h-4 bg-bg-grey  w-full "></div>
                  </div>

                  <div className="h-28 w-full  absolute bottom-0 buttonBG1 bg-white left-0">
                    {" "}
                    <p className="text-center h-7 bg-beta-yellow text-sm pt-1 font-semibold">
                      Delivery within 2 hour of Purchase
                    </p>
                    <button
                      id=""
                      className="bg-beta-pink text-sm text-white text-center w-80 h-12 rounded-md font-medium mb-8 buttonBG1 ml-8"
                      onClick={checkoutHandler}
                    >
                      PROCEED TO BUY :{" "}
                      <span className="">
                        {cartItems?.reduce(
                          (acc, item) => acc + item?.quantity,
                          0
                        )}{" "}
                        (Item)
                      </span>
                    </button>
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="h-56 buttonBG">
            <div className="px-2">
              <p className="font-bold pt-2 PlayfairDisplay">
                PRICE DETAILS ({cartItems?.length} items)
              </p>
            </div>
            <hr />
            <div className="flex justify-between px-2">
              <div>Total MRP</div>
              <div>
                {" "}
                &#8377;
                {cartItems
                  ?.reduce((acc, item) => acc + item?.quantity * item.price, 0)
                  .toFixed(2)}
              </div>
            </div>
            <div className="flex justify-between px-2">
              <div>Platform Fee</div>
              <div className="text text-green-500">FREE</div>
            </div>
            <div className="flex justify-between px-2">
              <div>Shipping Fee</div>
              <div className="text text-green-500">FREE</div>
            </div>
            <hr />
            <div className="flex justify-between px-2">
              <div className=" font-semibold">Total Amount</div>
              <div className=" font-semibold">
                {" "}
                &#8377;
                {cartItems
                  ?.reduce((acc, item) => acc + item?.quantity * item.price, 0)
                  .toFixed(2)}
              </div>
            </div>
          </div>
          <div className="h-4 bg-bg-grey  w-full "></div>
        </>
      )}
    </div>
  );
};

export default Cart;
