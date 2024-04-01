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

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [activeTabs, setActiveTabs] = useState(0);

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

  if (error && error?.status == 404) {
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
              <div className="ml-2">
                <a role="button">
                  <img
                    className={`d-block border rounded p-3 cursor-pointer buttonBG ${
                      img.url === activeImg ? "border-warning" : ""
                    } `}
                    height="100"
                    width="100"
                    src={img?.url}
                    alt={img?.url}
                    onClick={(e) => setActiveImg(img.url)}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3">
          <div className="col-12 col-lg-5 mt-3 ">
            <h3 className="pl-1 fontHeading ">{product?.name}</h3>
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

            <div className="addCartSection pt-4 pb-4 d-flex align-items-center ml-1 ">
              <div className="counterSec flex">
                <input
                  type="number"
                  className="form-control count d-inline pt-2"
                  value={quantity}
                  readonly
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

              {/* <div className="stockCounter d-inline pl-1">
              <span className="btn btn-danger minus" onClick={decreseQty}>
                -
              </span>
              <input
                type="number"
                className="form-control count d-inline"
                value={quantity}
                readonly
              />
              <span className="btn btn-primary plus" onClick={increseQty}>
                +
              </span>
            </div> */}
              <button
                type="button"
                className="buttonBG ml-6 p-2.5 rounded-md bg-beta-pink text-white font-semibold"
                disabled={product?.stock <= 0}
                onClick={setItemToCart}
              >
                Add to Cart
              </button>
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

            {/* <h5 className="mt-2 pl-1 ">Description:</h5>
            <p className="pl-1 font-sans tracking-normal wordSpacing text-slate-100p-2">
              {product?.description}
            </p> */}

            {/* <p id="product_seller mb-3" className="pl-1 ">
              Sold by: <strong>{product?.seller}</strong>
            </p> */}

            {isAuthenticated ? (
              <NewReview productId={product?._id} />
            ) : (
              <div className="alert alert-danger my-5" type="alert">
                Login to post your review.
              </div>
            )}
          </div>
          <hr />
          {/* {product?.reviews?.length > 0 && (
            <ListReviews reviews={product?.reviews} />
          )} */}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
