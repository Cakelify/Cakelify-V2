import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./button.css";

const ProductCarouselItemTwo = ({ product }) => {
  return (
    <div className="w-32 mx-2">
      <a href={`/product/${product?._id}`}>
        <img
          className="h-32 w-36 rounded-lg"
          src={product?.images[0]?.url || "/images/default_product.png"}
          alt={product?.name}
        />
      </a>

      <div className="ml-4 mt-1 flex justify-between">
        <div>
          <h5 className="flex text-sm font-medium Montserrat">
            <a
              className="no-underline text-black"
              href={`/product/${product?._id}`}
            >
              {product?.name}
            </a>
          </h5>

          <div className="flex items-center mt-1">
            <p className="text-base font-semibold mx-2">
              &#8377;{product?.price}
            </p>
            <a
              href={`/product/${product?._id}`}
              id="view_btn"
              className="button-7 buttonBG mb-2"
            >
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarouselItemTwo;
