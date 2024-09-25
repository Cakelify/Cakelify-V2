import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Cart.css";
import {
  useCreateNewOrderMutation,
  useRazorpayCheckoutSessionMutation,
  useValidateCouponQuery,
} from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [cakeMessage, setCakeMessage] = useState(null);

  const { data: couponData, error: couponError } = useValidateCouponQuery(
    couponCode,
    {
      skip: !couponCode,
    }
  );

  useEffect(() => {
    if (submitted) {
      if (couponError) {
        toast.error(couponError.data.message);
      } else if (couponData) {
        toast.success("Coupon applied successfully");
      }
      setSubmitted(false); // Reset submission state after handling
    }
  }, [couponData, couponError, submitted]);

  const applyCouponHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const { shippingInfo } = useSelector((state) => state.cart);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo?.address);
      setCity(shippingInfo?.city);
      setZipCode(shippingInfo?.zipCode);
      setPhoneNo(shippingInfo?.phoneNo);
      setLatitude(shippingInfo?.latitude);
      setLongitude(shippingInfo?.longitude);
      setCakeMessage(shippingInfo?.cakeMessage);
      setCouponCode(shippingInfo?.couponCode);
    }
  }, [shippingInfo]);

  const submiHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({
        address,
        city,
        phoneNo,
        zipCode,
        latitude,
        longitude,
        cakeMessage,
        couponCode,
      })
    );
    navigate("/confirm_order");
  };

  return (
    <>
      <MetaData title={"Shipping Info"} />

      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5 shadow rounded bg-body">
          <div className="mt-40">
            <div className="my-3">
              {/* <div className="mx-2 flex">
                <svg className="h-4 w-6 mt-1 mr-2">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.626 1.5A4.007 4.007 0 0018.5 4.374v5.252a4.007 4.007 0 00-2.874 2.874H4.374A4.007 4.007 0 001.5 9.626V4.374A4.007 4.007 0 004.374 1.5h11.252zM17.05 1a2.503 2.503 0 002.45 2c.26 0 .5.193.5.453v7.094c0 .26-.24.453-.5.453a2.503 2.503 0 00-2.5 2.5c0 .26-.193.5-.453.5H3.453c-.26 0-.453-.24-.453-.5A2.503 2.503 0 00.5 11c-.26 0-.5-.193-.5-.453V3.453C0 3.193.24 3 .5 3A2.503 2.503 0 003 .5c0-.26.193-.5.453-.5h13.094c.26 0 .453.24.453.5 0 .171.017.338.05.5zM6.5 4.5c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm.75 6c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l5.5-5.5c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-5.5 5.5c-.15.15-.34.22-.53.22zm5.25 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                    fill="#282C3F"
                  ></path>
                </svg>
                <p className=" font-bold PlayfairDisplay">Have a Coupon</p>
              </div> */}
              {/* <div className="border-1 rounded-md  border-alpha-green ">
                <div>
                  {" "}
                  <form onSubmit={applyCouponHandler}>
                    <label className="PlayfairDisplay mb-1">Coupon Code</label>
                    <div className="flex justify-evenly gap-2">
                      <input
                        type="text"
                        placeholder="Coupon Code"
                        value={couponCode}
                        className="p-3 rounded-md border-1 border-gray-300 bg-white w-100 font-normal w-full "
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button className="border-2 border-alpha-pink text-alpha-pink  rounded-sm p-2 font-bold">
                        APPLY COUPON
                      </button>
                    </div>
                  </form>
                </div>
              </div> */}
            </div>
          </div>
          <hr />
          <form className="" onSubmit={submiHandler}>
            <div className="mb-3">
              <label
                htmlFor="address_field"
                className="font-medium mb-1 PlayfairDisplay"
              >
                Cake Message
              </label>
              <input
                type="text"
                className="p-3 rounded-md border-1 border-gray-300 bg-white w-100 font-normal w-full"
                name="cakeMessage"
                placeholder="Enter message on Cake "
                onChange={(e) => setCakeMessage(e.target.value)}
              />
            </div>
            <hr />
            <h2 className="mb-4 mt-4 PlayfairDisplay ">Shipping Info</h2>

            <div className="mb-3 hidden">
              <label htmlFor="address_field" className="form-label">
                Coupon Code
              </label>
              <input
                type="text"
                id="address_field"
                className="p-3 rounded-md border-1 border-gray-300 bg-white w-100 font-normal"
                name="address"
                value={couponCode}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="address_field"
                className="form-label PlayfairDisplay"
              >
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="p-3 rounded-md border-1 border-gray-300 bg-white w-100 font-normal "
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="city_field"
                className="form-label PlayfairDisplay"
              >
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="p-3 rounded-md border-1 border-gray-300 bg-white w-100 font-normal"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="phone_field"
                className="form-label PlayfairDisplay"
              >
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                className="p-3 rounded-md border-1 border-gray-300 bg-white w-100 font-normal"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="zip_code_field"
                className="form-label PlayfairDisplay"
              >
                Pin Code
              </label>
              <input
                type="number"
                id="zip_code_field"
                className="p-3 rounded-md border-1 border-gray-300 bg-white w-100 font-normal"
                name="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zip_code_field" className="form-label hidden">
                Latitude
              </label>
              <input
                type="string"
                id="zip_code_field"
                className="hidden"
                name="latitude"
                value={latitude}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zip_code_field" className="form-label hidden">
                Longitude
              </label>
              <input
                type="string"
                id="zip_code_field"
                className="hidden"
                name="longitude"
                value={longitude}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div>{latitude && longitude && <div></div>}</div>
            <div className="flex justify-center">
              {" "}
              <button
                onClick={getLocation}
                className="border-3 p-2 bg-blue-500 text-white rounded-lg buttonBG"
              >
                Get My Location 📌
              </button>
            </div>

            <div className="h-28 w-full  absolute bottom-0 buttonBG1 bg-white left-0">
              {" "}
              <p className="text-center h-7 bg-beta-yellow text-sm pt-1 font-semibold">
                Delivery within 2 hour of Purchase
              </p>
              <button
                id=""
                className="bg-beta-pink text-sm text-white text-center w-80 h-12 rounded-md font-medium mb-8 buttonBG1 ml-8"
              >
                CONTINUE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
