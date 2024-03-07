import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import ProductItem from "../product/ProductItem";
import Loader from "./Loader";

function FlavourCategory() {
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

  return (
    <>
      <div className="mt-4 pt-4 bg-alpha-liteyellow"> </div>
      <div className="flex  flex-col mt-16 ">
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
    </>
  );
}

export default FlavourCategory;
