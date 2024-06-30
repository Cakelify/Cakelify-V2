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

    // Coupon validation logic will be handled automatically by useValidateCouponQuery
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
          <div className="mt-32">
            <form onSubmit={applyCouponHandler}>
              <label>Coupon Code</label>
              <input
                type="text"
                value={couponCode}
                className="p-3 rounded-md border-1 border-gray-300 bg-white w-100 font-normal w-full my-2"
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button>Apply Coupon</button>
            </form>
          </div>
          <form className="" onSubmit={submiHandler}>
            <div className="mb-3">
              <label htmlFor="address_field" className="font-medium mb-1">
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

            <h2 className="mb-4 mt-4">Shipping Info</h2>

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
              <label htmlFor="address_field" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="p-3 rounded-md border-1 border-gray-300 bg-white w-100 font-normal"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zip_code_field" className="form-label">
                Pin Code
              </label>
              <input
                type="number"
                id="zip_code_field"
                className="form-control"
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
                required
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
                required
              />
            </div>
            <div>{latitude && longitude && <div></div>}</div>

            <button
              onClick={getLocation}
              className="border-3 p-2 ml-6 mt-4 mb-2 bg-blue-500 text-white rounded-lg buttonBG"
            >
              Get My Location 📌
            </button>
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
