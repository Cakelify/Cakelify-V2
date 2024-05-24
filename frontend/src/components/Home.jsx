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
import WB1 from "./WB1.jpg";
import WB2 from "./WB2.jpg";
import WB3 from "./WB3.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import MenuBar from "./layout/MenuBar";
import CatSlider from "./catSlider";
import MarqueeFC from "./layout/MarqueeFC";

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
      link: "/?keyword=Jar%20Cakes",
      name: "JarCake",
      review:
        "data:image/jpeg;base64,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",
    },
    {
      link: "/?keyword=Pastry",
      name: "Pastries",
      review:
        "data:image/jpeg;base64,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",
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
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide className="-z-50">
                <img src={WB1} alt="" className="-z-50" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={WB2} alt="" className="-z-50" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={WB3} alt="" className="-z-50" />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="pt-2">
            <h2 className="mt-8 mb-3 ml-2 text-lg font-bold">
              Eventful Indulgences
            </h2>
            <CatSlider />
          </div>
          <MarqueeFC />
          <h5 className="mt-6 mb-3 ml-2 text-lg font-bold"> Offers for you</h5>
          <div className="Offer m-2 rounded-md text-white mt-3 max-w-46">
            <h6 className="font-black text-xl mb-1">
              Up to &#8377;60 Cashback
            </h6>
            <p className="text-lg mb-0 font-medium">
              Get 20% off up to &#8377;60 on orders of &#8377;300
            </p>
          </div>
          <div className="divCategory ">
            <h5 className="mt-12 mb-3 text-lg font-bold ml-2 ">
              What &nbsp;<span style={textStyle}>tantalizing</span> &nbsp;treat
              is on your mind?
            </h5>
            <div className="flex justify-around mb-12 ">
              {sata.map((d) => (
                <div className="border-1 border-gray-200 rounded-md">
                  <Link to={d.link} className="no-underline text-black">
                    {" "}
                    <img
                      className="h-36 w-40 rounded-t-lg object-cover"
                      src={d.review}
                      alt=""
                    />
                    <p className="text-center mt-1 font-semibold">{d.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <MenuBar />
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
        <div className="flex justify-center mt-6 mr-3">
          <a
            href="/flavourfulCategory"
            id="view_btn"
            className="btn btn-primary d-inline ms-4 buttonBG "
          >
            View All
          </a>
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
