import React, { useEffect, useRef, useState } from "react";
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { Link, useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";
import "./Home.css";
import Cake from "./Category/Cakes.png";
import JarCakes from "./Category/JarCakes.png";
import Pastry from "./Category/pastry.png";
import "./Category/Category.css";
import FAQ from "./layout/FAQ";
import ReviewSlider from "./layout/ReviewSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import ringImage from "./ringImage.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword };

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

  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />;

  const textStyle = {
    fontFamily: "Sacramento",
    fontSize: "36px",
  };

  return (
    <>
      <MetaData title={"Buy Best Cakes Online"} />
      <div className="ForDesktop">
        <div className="row">
          {keyword && (
            <div className="col-6 col-md-3 mt-5">
              <Filters />
            </div>
          )}
          <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
            <h1 id="products_heading" className="text-secondary">
              {keyword
                ? `${data?.products?.length} Products found with keyword: ${keyword}`
                : "Latest Products"}
            </h1>

            <section id="products" className="mt-5">
              <div className="row">
                {data?.products?.map((product) => (
                  <ProductItem product={product} columnSize={columnSize} />
                ))}
              </div>
            </section>

            <CustomPagination
              resPerPage={data?.resPerPage}
              filteredProductsCount={data?.filteredProductsCount}
            />
          </div>
        </div>
      </div>

      {/* For Mobile Version */}

      <div className="ForMobile bg-bg-grey">
        <div className="mt-16">
          {keyword && (
            <div className="">
              <Filters />
            </div>
          )}
          <div className="pt-20">
            <h2 className="mt-6 mb-3 ml-2 text-lg font-bold">
              Eventful Indulgences
            </h2>
            <div className="flex flex-wrap justify-around p-2 ">
              <div className="border-2 rounded-xl  py-3 w-40 text-center font-semibold">
                <Link
                  to="/flavourfulCategory/?keyword=Anniversary"
                  className="no-underline text-black"
                >
                  Anniversary 💖
                </Link>
              </div>
              <div className="border-2 rounded-xl font-semibold w-40 text-center   ml-1  flex flex-col justify-center">
                {" "}
                <Link
                  to="/flavourfulCategory/?keyword=Engagement"
                  className="no-underline text-black "
                >
                  Engagement💍
                </Link>
              </div>
            </div>
          </div>
          <h5 className="mt-6 mb-3 ml-2 text-lg font-bold"> Offers for you</h5>
          <div className="Offer m-2 rounded-md text-white mt-3 max-w-46">
            <h6 className="font-black text-xl mb-1">
              Up to &#8377;60 Cashback
            </h6>
            <p className="text-lg mb-0 font-medium">
              Get 20% off up to &#8377;60 on orders of &#8377;300
            </p>
          </div>
          <div className="divCategory">
            <h5 className="mt-12 mb-3 text-lg font-bold ml-2">
              What &nbsp;<span style={textStyle}>tantalizing</span> &nbsp;treat
              is on your mind?
            </h5>
            <div className="productCategory ml-2 mb-4">
              <div className="Cake">
                <Link to="/?keyword=Cake" className="no-underline text-black">
                  <img src={Cake} alt="Cake" className="CategoryCake" />
                  <p className="categoryPara ">Cakes</p>
                </Link>
              </div>
              <div className="JarCake">
                <Link
                  to="/?keyword=Jar%20Cakes"
                  className="no-underline text-black"
                >
                  {" "}
                  <img
                    src={JarCakes}
                    alt="JarCakes"
                    className="CategoryJarCakes"
                  />
                  <p className="categoryPara">Jar Cakes</p>
                </Link>
              </div>
              <div className="Pastry">
                <Link to="/?keyword=Pastry" className="no-underline text-black">
                  <img src={Pastry} alt="Pastry" className="CategoryPastry" />
                  <p className="categoryPara">Pastries</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  flex-col mt-2  ">
          <h1 id="" className="text-secondary text-center">
            {keyword ? `${keyword}` : "Our Best Seller"}
          </h1>
        </div>
        <div className="">
          <section id="products" className="">
            <div className="flex flex-wrap justify-evenly ">
              {data?.products?.map((product) => (
                <ProductItem product={product} columnSize={columnSize} />
              ))}
            </div>
          </section>
        </div>
        {/* <CustomPagination
          resPerPage={data?.resPerPage}
          filteredProductsCount={data?.filteredProductsCount}
        /> */}

        <div className="mt-4 pt-4 bg-alpha-liteyellow boxShadow">
          {" "}
          <h2 className="text-xl text-center mb-4 font-serif ">
            Flavourful Options
          </h2>
          <div className="flex flex-wrap justify-around mb-4 p-2 ">
            <div className="border-2  rounded-md px-4 py-3 mb-6 font-semibold">
              <Link
                to="/flavourfulCategory/?keyword=Chocolate"
                className="no-underline text-black"
              >
                Chocolate
              </Link>
            </div>
            <div className="border-2 rounded-md font-semibold px-4 py-3 mb-6 ml-1">
              <Link
                to="/flavourfulCategory/?keyword=Red%20Velvet"
                className="no-underline text-black"
              >
                Red Velvet
              </Link>
            </div>
            <div className="border-2 rounded-md px-4 py-3 mb-6 font-semibold">
              {" "}
              <Link
                to="/flavourfulCategory/?keyword=Strawberry"
                className="no-underline text-black"
              >
                Strawberry
              </Link>
            </div>
            <div className="border-2 font-semibold rounded-md px-4 py-3 mb-6">
              <Link
                to="/flavourfulCategory/?keyword=Blackforest"
                className="no-underline text-black"
              >
                Blackforest
              </Link>
            </div>
            <div className="border-2 rounded-md px-4 font-semibold py-3 mb-6">
              <Link
                to="/flavourfulCategory/?keyword=Pineapple"
                className="no-underline text-black"
              >
                Pineapple
              </Link>
            </div>
            <div className="border-2 rounded-md font-semibold px-3 py-3 mb-6">
              <Link
                to="/flavourfulCategory/?keyword=Butterscotch"
                className="no-underline text-black"
              >
                Butterscotch
              </Link>
            </div>
          </div>
        </div>

        <ReviewSlider />
        <div className="w-full">
          <div className="pl-4 pr-4">
            {" "}
            <FAQ />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
