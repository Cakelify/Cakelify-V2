import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import Loader from "../layout/Loader";
import ProductCarouselItemTwo from "./ProductItem";
import { motion } from "framer-motion";
import "./ProductCarousel.css";

function ProductCarouselThree() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const carousel = useRef();

  const params = {
    page,
    keyword,
    category: "Decoration",
    ...(min && { min }),
    ...(max && { max }),
    ...(category && { category }),
    ...(ratings && { ratings }),
  };

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;

  return (
    <div className="m-1">
      <motion.div
        ref={carousel}
        className="carousel"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -1140 }}
          className="inner-carousel"
        >
          {data?.products?.map((product) => (
            <ProductCarouselItemTwo key={product._id} product={product} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ProductCarouselThree;
