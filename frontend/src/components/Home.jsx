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
import "./Category/Category.css";
import FAQ from "./layout/FAQ";
import ReviewSlider from "./layout/ReviewSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import WB1 from "./WB1.jpg";
import Crown from "./Crown.jpg";
import WB2 from "./WB3.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import MenuBar from "./layout/MenuBar";
import CatSlider from "./catSlider";
import MarqueeFC from "./layout/MarqueeFC";
import WhatsNew from "./layout/WhatsNew";
import ProductCarousel from "./product/ProductCarousel";
import ProductCarouselOne from "./product/ProductCarouselOne";
import ProductCarouselTwo from "./product/ProductCarouselTwo";
import Offer from "./layout/Offer";
import ProductCarouselThree from "./product/ProductCarouselThree";

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

  const sata = [
    {
      link: "/flavourfulCategory/?keyword=Jar%20Cake",
      name: "JarCake",
      review:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjMyHds7vLSoiw4yPLmqVN8-yLpm1xISG97w&s",
    },
    {
      link: "/flavourfulCategory/?keyword=Pastry",
      name: "Pastries",
      review:
        "https://bakewithshivesh.com/wp-content/uploads/2021/07/IMG_0745-scaled.jpg",
    },
    {
      link: "/flavourfulCategory/?keyword=Cup%20Cake",
      name: "Cup Cake",
      review:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5SOEC9jypaD84nmE-ruTPJVh7AA3HPZLdg&s",
    },
  ];

  return (
    <>
      <MetaData title={"Buy Best Cakes Online"} />
      <div className="ForDesktop">
        <div className="row">
          {keyword && (
            <div className="col-6 col-md-3 mt-5">{/* <Filters /> */}</div>
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

      <div className="ForMobile ">
        <div className="mt-16 -z-50 ">
          {keyword && <div className="">{/* <Filters /> */}</div>}
          <div className="mt-40 -z-50">
            <SwiperSlide className="-z-50 p-2">
              <img src={WB1} alt="" className="-z-50 rounded-md" />
            </SwiperSlide>
          </div>
          {/* <MarqueeFC /> */}
          <h5 className="mt-4 mb-3 ml-2 PlayfairDisplay"> Offers for you</h5>
          <Offer />
          <div className="divCategory">
            <h5 className="mt-2 mb-3 PlayfairDisplay ml-2  pt-4">
              What &nbsp;<span style={textStyle}>tantalizing</span> &nbsp;treat
              is on your mind?
            </h5>
            <div className="flex justify-around  pb-4">
              {sata.map((d) => (
                <div className=" border-gray-200 rounded-md">
                  <a href={d.link} className="no-underline text-black">
                    {" "}
                    <img
                      className=" h-24 w-24 rounded-full"
                      src={d.review}
                      alt=""
                    />
                    <p className="text-center mt-1 font-semibold text-gray-500 ">
                      {d.name}
                    </p>
                  </a>
                </div>
              ))}
            </div>
            <CatSlider />
          </div>

          <h5 className="mt-4  ml-2 PlayfairDisplay">What's New</h5>
          <WhatsNew />
          <div className="">
            <MenuBar />
          </div>
          <div className="h-2 bg-bg-grey  w-full "></div>
        </div>
        <div className="productCarousel">
          <div className="flex  flex-col mt-1">
            <img src={Crown} alt="" />
            <h1 className="PlayfairDisplay text-center text-alpha-gold mt-1 mb-0">
              {keyword ? `${keyword}` : "Top 10 Bestsellers"}
            </h1>
          </div>
          <section>
            <ProductCarousel />
          </section>
        </div>
        <h5 className="mt-6 mb-0 PlayfairDisplay ml-2  pt-4">
          Exclusive Offer
        </h5>
        <SwiperSlide className="-z-50 p-2">
          <img src={WB2} alt="" className="-z-50 rounded-md" />
        </SwiperSlide>
        <section>
          {" "}
          <h5 className="mt-2 mb-0 PlayfairDisplay ml-2  pt-4">🍰 Desserts</h5>
          <ProductCarouselOne />
        </section>
        <section>
          <h5 className="mt-2 mb-0 PlayfairDisplay ml-2  pt-4">
            🤩 Popular Delights
          </h5>
          <ProductCarouselTwo />
        </section>
        {/* <div className="flex justify-center mt-6 mr-3">
          <a
            href="/flavourfulCategory"
            id="view_btn"
            className="btn btn-primary d-inline ms-4 buttonBG "
          >
            View All
          </a>
        </div> */}
        {/* <CustomPagination
          resPerPage={data?.resPerPage}
          filteredProductsCount={data?.filteredProductsCount}
        /> */}

        <div className="mt-4 pt-4 bg-alpha-liteyellow boxShadow">
          {" "}
          <h2 className="text-xl text-center mb-4 PlayfairDisplay ">
            Flavourful Options
          </h2>
          <div className="flex flex-wrap justify-around mb-4 p-2 ">
            <div className="border-2  rounded-md px-4 py-3 mb-6 font-semibold">
              <a
                href="/flavourfulCategory/?keyword=Chocolate"
                className="no-underline text-black"
              >
                Chocolate
              </a>
            </div>
            <div className="border-2 rounded-md font-semibold px-4 py-3 mb-6 ml-1">
              <a
                href="/flavourfulCategory/?keyword=Red%20Velvet"
                className="no-underline text-black"
              >
                Red Velvet
              </a>
            </div>
            <div className="border-2 rounded-md px-4 py-3 mb-6 font-semibold">
              {" "}
              <a
                href="/flavourfulCategory/?keyword=Strawberry"
                className="no-underline text-black"
              >
                Strawberry
              </a>
            </div>
            <div className="border-2 font-semibold rounded-md px-4 py-3 mb-6">
              <a
                href="/flavourfulCategory/?keyword=Blackforest"
                className="no-underline text-black"
              >
                Blackforest
              </a>
            </div>
            <div className="border-2 rounded-md px-4 font-semibold py-3 mb-6">
              <a
                href="/flavourfulCategory/?keyword=Pineapple"
                className="no-underline text-black"
              >
                Pineapple
              </a>
            </div>
            <div className="border-2 rounded-md font-semibold px-3 py-3 mb-6">
              <a
                href="/flavourfulCategory/?keyword=Butterscotch"
                className="no-underline text-black"
              >
                Butterscotch
              </a>
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
