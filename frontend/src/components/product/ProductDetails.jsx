import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";
import MetaData from "../layout/MetaData";
import NewReview from "../reviews/NewReview";
import ListReviews from "../reviews/ListReviews";
import NotFound from "../layout/NotFound";
import "./button.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";
import PV from "./PureVeg.png";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [activeTabs, setActiveTabs] = useState(0);

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    setActiveImg(
      product?.images[0]
        ? product?.images[0]?.url
        : "/images/default_product.png"
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const increseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product?.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const handleButtonClick = () => {
    if (buttonText === "Add to Cart") {
      setItemToCart();
      setButtonText("Go to Cart");
    }
  };

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
      discount: product?.discount,
    };

    dispatch(setCartItem(cartItem));
    toast.success("Item added to Cart");
  };

  if (isLoading) return <Loader />;

  if (error && error?.status === 404) {
    return <NotFound />;
  }

  return (
    <>
      <MetaData title={product?.name} />
      <div className="row d-flex justify-content-around pt-36" id="top">
        <div className="col-12 col-lg-5 img-fluid" id="">
          <div className="p-3">
            <img
              className="d-block w-100 rounded-lg"
              src={activeImg}
              alt={product?.name}
              width="340"
              height="390"
            />
          </div>
          <div className="flex mt-2">
            {product?.images?.map((img) => (
              <div className="ml-2" key={img.url}>
                <a role="button">
                  <img
                    className={`d-block border rounded p-3 cursor-pointer buttonBG ${
                      img.url === activeImg ? "border-warning" : ""
                    } `}
                    height="100"
                    width="100"
                    src={img?.url}
                    alt={img?.url}
                    onClick={() => setActiveImg(img.url)}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3">
          <div className="col-12 col-lg-5 mt-3 ">
            <div className="flex justify-between">
              <h3 className="pl-1 fontHeading text-xl">{product?.name}</h3>
              <img className=" w-4 h-4 mt-2 mr-2  " src={PV} alt="" />
            </div>

            <p className="pl-1" id="product_id">
              Product # {product?._id}
            </p>

            <hr />

            <div className="d-flex">
              <StarRatings
                rating={product?.ratings}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="24px"
                starSpacing="1px"
              />
              <span id="no-of-reviews" className="pt-1 ps-2">
                {" "}
                ({product?.numOfReviews} Reviews){" "}
              </span>
            </div>
            <hr />

            <p className="pl-1 fontHeading text-beta-pink" id="product_price">
              &#8377;{product?.price}
            </p>

            <div className="addCartSection pt-4 pb-4 d-flex align-items-center ml-1 flex ">
              <div className="counterSec flex">
                <input
                  type="number"
                  className="form-control count d-inline pt-2"
                  value={quantity}
                  readOnly
                />
                <div className="mr-2">
                  <span className="arrow plus" onClick={increseQty}>
                    <KeyboardArrowUpIcon />
                  </span>
                  <span className="arrow minus" onClick={decreseQty}>
                    <KeyboardArrowDownIcon />
                  </span>
                </div>
              </div>

              {buttonText === "Add to Cart" ? (
                <button
                  type="button"
                  className="buttonBG ml-6 p-2.5 rounded-md bg-beta-pink text-white font-semibold"
                  disabled={product?.stock <= 0}
                  onClick={handleButtonClick}
                >
                  {buttonText}
                </button>
              ) : (
                <a
                  href="/cart" // Replace '/cart' with the actual URL of your cart page
                  className="buttonBG ml-6 p-2.5 rounded-md bg-white text-beta-pink border-beta-pink border-2 font-semibold no-underline"
                >
                  {buttonText}
                </a>
              )}
            </div>
            <hr />

            <p className="pl-1">
              Status:{" "}
              <span
                id="stock_status"
                className={product?.stock > 0 ? "greenColor" : "redColor"}
              >
                {product?.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <hr />

            <div className="card mt-3 p-3 detailsPageTabs">
              <div className="customTabs">
                <ul className="list list-inline">
                  <li className="list-inline-item">
                    <Button
                      className={`${activeTabs === 0 && "active"}`}
                      onClick={() => setActiveTabs(0)}
                    >
                      Description
                    </Button>
                  </li>
                  <li className="list-inline-item">
                    <Button
                      className={`${activeTabs === 1 && "active"}`}
                      onClick={() => setActiveTabs(1)}
                    >
                      {" "}
                      Reviews
                    </Button>
                  </li>
                </ul>
                <br />
                {activeTabs === 0 && (
                  <div className="tabContent">
                    <p className="pl-1 font-sans tracking-normal wordSpacing text-slate-100p-2">
                      {product?.description}
                    </p>
                  </div>
                )}

                {activeTabs === 1 && (
                  <div className="tabContent">
                    {product?.reviews?.length > 0 && (
                      <ListReviews reviews={product?.reviews} />
                    )}
                  </div>
                )}
              </div>
            </div>

            {isAuthenticated ? (
              <NewReview productId={product?._id} />
            ) : (
              <div className="alert alert-danger my-5" type="alert">
                Login to post your review.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
