import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Order", "AdminOrders", "Coupons"],
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: "/orders/new",
          method: "POST",
          body,
        };
      },
    }),
    myOrders: builder.query({
      query: () => `/me/orders`,
    }),
    orderDetails: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ["Order"],
    }),
    razorpayCheckoutSession: builder.mutation({
      query(body) {
        return {
          url: "/orders/checkout_session",
          method: "POST",
          body,
        };
      },
    }),

    getDashboardSales: builder.query({
      query: ({ startDate, endDate }) =>
        `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
    }),
    getAdminOrders: builder.query({
      query: () => `/admin/orders`,
      providesTags: ["AdminOrders"],
    }),
    updateOrder: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/orders/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query(id) {
        return {
          url: `/admin/orders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminOrders"],
    }),
    createCoupon: builder.mutation({
      query(body) {
        return {
          url: "/admin/coupons",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Coupons"],
    }),
    validateCoupon: builder.query({
      query: (code) => `/coupons/${code}`,
    }),
    getAllCoupons: builder.query({
      query: () => ` /admin/coupons`,
      providesTags: ["Coupons"],
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useRazorpayCheckoutSessionMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useLazyGetDashboardSalesQuery,
  useGetAdminOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useCreateCouponMutation,
  useValidateCouponQuery,
  useGetAllCouponsQuery,
} = orderApi;
