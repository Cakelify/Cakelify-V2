import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Cart.css";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

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
      })
    );
    navigate("/confirm_order");
  };

  return (
    <>
      <MetaData title={"Shipping Info"} />

      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submiHandler}>
            <h2 className="mb-4 mt-32">Shipping Info</h2>

            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="form-control"
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
