import React, { useState } from "react";
import { useCreateCouponMutation } from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";

const CreateCouponForm = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCoupon({ code, discount, validFrom, validUntil }).unwrap();
      toast.success("Coupon created successfully");
      setCode("");
      setDiscount(0);
      setValidFrom("");
      setValidUntil("");
    } catch (error) {
      toast.error("Failed to create coupon");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-40">
        <label>Coupon Code</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Discount (%)</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Valid From</label>
        <input
          type="date"
          value={validFrom}
          onChange={(e) => setValidFrom(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Valid Until</label>
        <input
          type="date"
          value={validUntil}
          onChange={(e) => setValidUntil(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        Create Coupon
      </button>
    </form>
  );
};

export default CreateCouponForm;
