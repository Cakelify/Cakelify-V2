// import React, { useEffect, useState } from "react";
// import MetaData from "../layout/MetaData";
// import { useSelector } from "react-redux";
// import { caluclateOrderCost } from "../../helpers/helpers";
// import {
//   useCreateNewOrderMutation,
//   useRazorpayCheckoutSessionMutation,
// } from "../../redux/api/orderApi";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// // import { useGetMeQuery } from "../../redux/api/userApi";

// const PaymentMethod = () => {
//   const [method, setMethod] = useState("");

//   const navigate = useNavigate();
//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);

//   const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();
//   const [
//     razorpayCheckoutSession,
//     { data: checkoutData, error: checkoutError, isLoading },
//   ] = useRazorpayCheckoutSessionMutation();

//   useEffect(() => {
//     if (error) {
//       toast.error(error.data.message);
//     }

//     if (isSuccess) {
//       navigate("/me/orders?order_success=true");
//     }
//   }, [error, isSuccess]);
//   const { user } = useSelector((state) => state.auth);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
//       caluclateOrderCost(cartItems);

//     let orderData = {
//       shippingInfo,
//       orderItems: cartItems,
//       itemsPrice,
//       shippingAmount: shippingPrice,
//       taxAmount: taxPrice,
//       totalAmount: totalPrice,
//       paymentMethod: method,
//     };

//     if (method === "COD") {
//       orderData = { ...orderData, paymentInfo: { status: "Not Paid" } };
//       createNewOrder(orderData);
//       navigate("/me/orders?order_success=true");
//     }

//     if (method === "Card") {
//       const { data: checkoutData, error: checkoutError } =
//         await razorpayCheckoutSession(orderData);
//       if (checkoutError) {
//         toast.error(checkoutError.data.message);
//       } else {
//         const options = {
//           key: "rzp_live_NLupneROI3HH01",
//           amount: checkoutData.order.amount,
//           currency: "INR",
//           name: "Cakelify",
//           description: "Test Transaction",
//           image:
//             "https://cakelify.shop/static/media/CakelifyLogo.aa42d9ff8fc4ca9b6fdc.png",
//           order_id: checkoutData.order.id,
//           handler: function (response) {
//             toast.success("Payment Successful");
//             orderData = { ...orderData, paymentInfo: { status: "Paid" } };
//             createNewOrder({
//               ...orderData,
//               paymentInfo: {
//                 id: response.razorpay_payment_id,
//                 status: "Paid",
//               },
//             });
//             navigate("/me/orders?order_success=true");
//           },
//           prefill: {
//             name: user.name,
//             email: user.email,
//             contact: user.phone,
//           },
//           notes: {
//             address: "Razorpay Corporate Office",
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };

//         const rzp1 = new window.Razorpay(options);
//         rzp1.open();
//       }
//     }
//   };

//   return (
//     <>
//       <MetaData title={"Payment Method"} />
//       <div className="row wrapper pt-36">
//         <div className="col-10 col-lg-5">
//           <form className="shadow rounded bg-body" onSubmit={submitHandler}>
//             <h2 className="mb-4">Select Payment Method</h2>

//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="payment_mode"
//                 id="codradio"
//                 value="COD"
//                 onChange={(e) => setMethod("COD")}
//               />
//               <label className="form-check-label" htmlFor="codradio">
//                 Cash on Delivery
//               </label>
//             </div>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="payment_mode"
//                 id="cardradio"
//                 value="Card"
//                 onChange={(e) => setMethod("Card")}
//               />
//               <label className="form-check-label" htmlFor="cardradio">
//                 Card - VISA, MasterCard
//               </label>
//             </div>

//             <button
//               id="shipping_btn"
//               type="submit"
//               className="btn py-2 w-100"
//               disabled={isLoading}
//             >
//               CONTINUE
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentMethod;
