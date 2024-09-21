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
import PV from "./PureVeg.png";
import ProductCarousel from "./ProductCarousel";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [activeTabs, setActiveTabs] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;
  const { isAuthenticated } = useSelector((state) => state.auth);

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

  const handleButtonClick = () => {
    if (buttonText === "Add to Cart") {
      setItemToCart();
      setButtonText("Go to Cart");
    }
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

  if (error && error?.status === 404) {
    return <NotFound />;
  }
  const handleClick = (activeImg) => {
    setSelectedImage(activeImg);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <MetaData title={product?.name} />
      <div className="row d-flex justify-content-around pt-36" id="top">
        <div className="col-12 col-lg-5 img-fluid" id="">
          <div className="p-3">
            <div className="flex justify-center gap-4">
              <img
                className="d-block w-100 rounded-lg cursor-pointer border-2 border-gray-300"
                src={activeImg}
                alt={product?.name}
                width="340"
                height="390"
                onClick={() => handleClick(activeImg)}
              />
            </div>
            {isOpen && (
              <div
                className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50 cursor-pointer overflow-auto"
                onClick={closeModal}
              >
                <span className="absolute top-5 right-10 text-white text-4xl cursor-pointer">
                  &times;
                </span>
                <img
                  className="max-w-[90%] max-h-[90%] cursor-default"
                  src={selectedImage}
                  alt="full-size"
                  onClick={(e) => e.stopPropagation()} // Prevent modal close on image click
                />
              </div>
            )}
          </div>
          <div className="flex mt-2">
            {product?.images?.map((img) => (
              <div className="ml-2" key={img.url}>
                <a role="button">
                  <img
                    className={`d-block border rounded p-3 cursor-pointer buttonBG ${
                      img.url === activeImg ? "border-warning" : ""
                    } `}
                    height="100"
                    width="100"
                    src={img?.url}
                    alt={img?.url}
                    onClick={() => setActiveImg(img.url)}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3">
          <div className="col-12 col-lg-5 mt-3 ">
            <div className="flex justify-between">
              <h3 className="pl-1 fontHeading text-xl">{product?.name}</h3>
              <img className=" w-4 h-4 mt-2 mr-2  " src={PV} alt="" />
            </div>

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
            <div className="flex gap-2">
              {" "}
              {product && product?.beforePrice ? (
                <p className="card-text font-semibold text-lg text-alpha-grey mt-1 ml-3 line-through">
                  &#8377;{product?.beforePrice}
                </p>
              ) : null}
              <p className="pl-1 textStyle text-2xl mt-1 text-beta-pink">
                &#8377;{product?.price}
              </p>
              {product && product.discount ? (
                <p className="mt-2 text-base textStyle text-alpha-green">
                  ({product?.discount}% off)
                </p>
              ) : null}
              <p className="mt-2 text-xs textStyle text-black">
                (Inclusive of GST)
              </p>
            </div>

            <div className="addCartSection pt-4 pb-4 d-flex align-items-center ml-1 flex ">
              <div className="counterSec flex">
                <input
                  type="number"
                  className="form-control count d-inline pt-2"
                  value={quantity}
                  readOnly
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

              {buttonText === "Add to Cart" ? (
                <button
                  type="button"
                  className="buttonBG ml-6 p-2.5 rounded-md bg-beta-pink text-white font-semibold"
                  disabled={product?.stock <= 0}
                  onClick={handleButtonClick}
                >
                  {buttonText}
                </button>
              ) : (
                <a
                  href="/cart" // Replace '/cart' with the actual URL of your cart page
                  className="buttonBG ml-6 p-2.5 rounded-md bg-white text-beta-pink border-beta-pink border-2 font-semibold no-underline"
                >
                  {buttonText}
                </a>
              )}
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
                    <p className="pl-1 p-2  Roboto">
                      <p className="text-lg font-semibold Roboto">
                        {" "}
                        Product Details :
                      </p>
                      <div>
                        <p className="pb-0 mb-1 flex Roboto ">
                          <div className="h-2 w-2 rounded bg-alpha-grey  mt-2 mr-2"></div>
                          Cake Flavour: {product?.cakeFlavour}
                        </p>
                        <p className="pb-0 mb-1 flex">
                          {" "}
                          <div className="h-2 w-2 rounded bg-alpha-grey  mt-2 mr-2"></div>
                          Shape: {product?.cakeShape}
                        </p>
                        <p className="pb-0 mb-1 flex">
                          {" "}
                          <div className="h-2 w-2 rounded bg-alpha-grey  mt-2 mr-2"></div>
                          Type of Cake: {product?.typeOfCake}
                        </p>
                        <p className="pb-0 mb-1 flex">
                          {" "}
                          <div className="h-2 w-2 rounded bg-alpha-grey  mt-2 mr-2"></div>
                          Type of Sponge: {product?.cakeSponge}
                        </p>
                        <p className="pb-0 mb-1 flex">
                          {" "}
                          <div className="h-2 w-2 rounded bg-alpha-grey  mt-2 mr-2"></div>
                          Type of Cream: {product?.typeOfCream}
                        </p>
                        <p className="pb-0 mb-1 flex">
                          {" "}
                          <div className="h-2 w-2 rounded bg-alpha-grey  mt-2 mr-2"></div>
                          Filpng in Layers: {product?.cakeFilpng}
                        </p>
                        <p className="pb-0 mb-1 flex">
                          {" "}
                          <div className="h-2 w-2 rounded bg-alpha-grey  mt-2 mr-2"></div>
                          Toppings: {product?.cakeToppings}
                        </p>
                        <p className="pb-0 mb-1 flex">
                          {" "}
                          <div className="h-2 w-2 rounded bg-alpha-grey  mt-2 mr-2"></div>
                          Weight: {product?.cakeWeight}
                        </p>
                        <p className="mt-10">
                          {" "}
                          <p>
                            <p className="pt-4 font-semibold text-lg">
                              Delivery Information:
                            </p>
                            Our delivery boy hand-delivers the delicious cake in
                            a good quality cardboard box. Candles and knives are
                            complementary but they will deliver as per the
                            availability.
                          </p>{" "}
                          <p>
                            {" "}
                            Every cake we offer is handcrafted, and since each
                            chef has his/her way of baking and designing a cake,
                            there might be slight variation in the product in
                            terms of design and shape.{" "}
                          </p>
                          <p>
                            This product is perishable therefore delivery will
                            be attempted only once, the delivery cannot redirect
                            to any other address.
                          </p>
                          <p>
                            We promise express delivery to provide superior
                            customer services The delivery cannot redirect to
                            any other address.
                          </p>
                          <p>
                            This product is hand delivered and will not deliver
                            along with courier products
                          </p>
                          <p>
                            {" "}
                            Occasionally, substitutions of flavors/designs are
                            necessary due to temporary and regional
                            unavailability issues.
                          </p>
                          <p className="pt-4 font-semibold text-lg">
                            Care Instructions:
                          </p>
                          <p>
                            Store cream cakes in a refrigerator. Fondant cakes
                            should store in an air-conditioned environment.
                          </p>
                          <p>
                            The cake should consume within 24 hours. Slice and
                            serve the cake at room temperature and make sure it
                            is not exposed to heat.{" "}
                          </p>
                          <p>
                            Sculptural elements and figurines may contain wire
                            supports or toothpicks or wooden skewers for
                            support.
                          </p>
                        </p>
                      </div>
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

            {isAuthenticated ? (
              <NewReview productId={product?._id} />
            ) : (
              <div className="alert alert-danger my-5" type="alert">
                Login to post your review.
              </div>
            )}
          </div>
        </div>
        <div className="m-2 mt-0">
          {" "}
          <h3 className="mb-4">You may Also Like</h3>
          <ProductCarousel />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
