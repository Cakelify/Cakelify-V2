import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./button.css";
import PureVeg from "./PureVeg.png";

const ProductCarouselItem = ({ product, columnSize }) => {
  return (
    <>
      {" "}
      <div className={``}>
        {product && product.discount ? (
          <div className="flex justify-between">
            {" "}
            <p className="bg-alpha-red h-6 w-16 rounded-sm p-1 text-xs text-white text-center font-extrabold -mb-2 relative top-10 left-5">
              {product?.discount}% off
            </p>
            <img
              className="w-4 h-4  -mb-2 relative top-10 right-6"
              src={PureVeg}
              alt=""
            />
          </div>
        ) : (
          <div>
            <p className="  h-6 w-16 rounded-sm p-1 text-xs text-white text-center font-extrabold -mb-2 relative top-10 left-5"></p>
            <img
              className="w-4 h-4  -mb-2 relative top-10 left-64"
              src={PureVeg}
              alt=""
            />
          </div>
        )}
        <div className="w-72 mx-2">
          <a href={`/product/${product?._id}`}>
            <img
              className=" h-72 w-72 rounded-lg"
              src={
                product?.images[0]
                  ? product?.images[0]?.url
                  : "/images/default_product.png"
              }
              alt={product?.name}
            />
          </a>

          <div className="max-w-72 ml-4 mt-1 flex justify-between">
            <div>
              {" "}
              <h5 className=" mt-0 flex Montserrat">
                <a
                  className="no-underline text-black text-lg leading-none"
                  href={`/product/${product?._id}`}
                >
                  {product?.name}
                </a>
              </h5>
              <div className="flex">
                <p className="card-text font-semibold text-lg">
                  &#8377;{product?.price}
                </p>
                {product && product?.beforePrice ? (
                  <p className="card-text font-semibold text-lg text-alpha-grey  ml-3 line-through">
                    &#8377;{product?.beforePrice}
                  </p>
                ) : null}
              </div>
            </div>
            <a
              href={`/product/${product?._id}`}
              id="view_btn"
              className="button-6 buttonBG "
            >
              View
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCarouselItem;
