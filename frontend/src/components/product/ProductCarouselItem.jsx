import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StarRatings from "react-star-ratings";
import "./button.css";
import PureVeg from "./PureVeg.png";

const ProductCarouselItem = ({ product, columnSize }) => {
  return (
    <>
      {" "}
      <div
        className={`col-sm-12 col-md-6 cakeBG col-lg-${columnSize} my-3 ml-1.5`}
      >
        <div className="cardProduct">
          <a href={`/product/${product?._id}`}>
            <img
              className="card-img-top mx-auto"
              src={
                product?.images[0]
                  ? product?.images[0]?.url
                  : "/images/default_product.png"
              }
              alt={product?.name}
            />
          </a>

          <div>
            <img
              className="relative w-4 bottom-36 ml-1 mb-0 left-28"
              src={PureVeg}
              alt=""
            />
          </div>
          <p className="bg-alpha-red w-16 rounded-sm mt-1 p-1 text-xs text-white text-center font-extrabold mb-1">
            {product?.discount} off
          </p>

          <div className="max-w-72">
            <h5 className="card-title mt-0">
              <a href={`/product/${product?._id}`}>{product?.name}</a>
            </h5>

            <div className="flex  ">
              <p className="card-text font-semibold text-lg mt-2">
                &#8377;{product?.price}
              </p>
              <p className="card-text font-semibold text-lg text-alpha-grey mt-2 ml-3 line-through">
                &#8377;{product?.beforePrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCarouselItem;
