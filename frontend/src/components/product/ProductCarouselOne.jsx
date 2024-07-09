import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import Loader from "../layout/Loader";
import ProductCarouselItem from "./ProductCarouselItem";
import { motion } from "framer-motion";
import "./ProductCarousel.css";

function ProductCarouselOne() {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const [width, setWidth] = useState(0);
  const carousel = useRef();
  // useEffect(() => {
  //   setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  // }, []);

  const params = { page, keyword, category: "Camera" };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className=" m-1">
        <motion.div
          ref={carousel}
          className="carousel"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -2060 }}
            className="inner-carousel"
          >
            {data?.products?.map((product) => (
              <ProductCarouselItem product={product} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default ProductCarouselOne;
