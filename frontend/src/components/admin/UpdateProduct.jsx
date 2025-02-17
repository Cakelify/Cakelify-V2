import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";

import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../../constants/constants";
import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/api/productsApi";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    beforePrice: "",
    discount: "",
    cakeFlavour: "",
    cakeShape: "",
    typeOfCake: "",
    cakeSponge: "",
    typeOfCream: "",
    cakeFilling: "",
    cakeToppings: "",
  });

  const {
    name,
    price,
    category,
    stock,
    beforePrice,
    discount,
    cakeFlavour,
    cakeShape,
    typeOfCake,
    cakeSponge,
    typeOfCream,
    cakeFilling,
    cakeToppings,
  } = product;

  const [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductMutation();

  const { data } = useGetProductDetailsQuery(params?.id);

  useEffect(() => {
    if (data?.product) {
      setProduct({
        name: data?.product?.name,
        description: data?.product?.description,
        price: data?.product?.price,
        category: data?.product?.category,
        stock: data?.product?.stock,
        seller: data?.product?.seller,
      });
    }

    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product updated");
      navigate("/admin/products");
    }
  }, [error, isSuccess, data]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateProduct({ id: params?.id, body: product });
  };

  return (
    <AdminLayout>
      <MetaData title={"Update Product"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-10 mt-5 mt-lg-0">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Update Product</h2>
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                {" "}
                Name{" "}
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="price_field" className="form-label">
                  {" "}
                  Price{" "}
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>

              <div className="mb-3 col">
                <label htmlFor="stock_field" className="form-label">
                  {" "}
                  Stock{" "}
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col">
                <label htmlFor="category_field" className="form-label">
                  {" "}
                  Category{" "}
                </label>
                <select
                  className="form-select"
                  id="category_field"
                  name="category"
                  value={category}
                  onChange={onChange}
                >
                  {PRODUCT_CATEGORIES?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {" "}
                  Discount{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="discount"
                  value={discount}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {" "}
                  Before Price{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="beforePrice"
                  value={beforePrice}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {" "}
                  Cake Flavour{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="cakeFlavour"
                  value={cakeFlavour}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {" "}
                  Shape{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="cakeShape"
                  value={cakeShape}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {" "}
                  Type Of Cake{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="typeOfCake"
                  value={typeOfCake}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {" "}
                  Type of Sponge{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="cakeSponge"
                  value={cakeSponge}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {" "}
                  Type of Cream{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="typeOfCream"
                  value={typeOfCream}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {" "}
                  Filling in Layer{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="cakeFilling"
                  value={cakeFilling}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3 col">
                <label htmlFor="seller_field" className="form-label">
                  {" "}
                  Toppings{" "}
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="cakeToppings"
                  value={cakeToppings}
                  onChange={onChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "UPDATE"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateProduct;
