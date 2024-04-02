import React from "react";
import MetaData from "../layout/MetaData";

import "bootstrap/dist/css/bootstrap.min.css";

const CancellationAndRefund = () => {
  return (
    <div className="p-3 mt-36">
      <MetaData title={"Cancellation and Refund"} />
      <h5>Cancellation and Refund Policy</h5>
      <ol>
        <li>
          <h6>Cancellation</h6>
          <h6>
            You may cancel your order for a full refund , as long as the order
            has not yet been processed or shipped. - To cancel your order,
            please contact us immediately at 7875380727 with your order number
            and reason for cancellation. - Once an order has been processed or
            shipped, it cannot be cancelled.
          </h6>
        </li>
        <li>
          <h6>Damaged or Defective Products</h6>
          <h6>
            {" "}
            - If you receive a damaged or defective product, please contact us
            immediately at 7875380727 to arrange for a replacement or refund.
          </h6>
        </li>
        <li>
          <h6>Non-Refundable Items</h6>{" "}
          <h6>
            - Certain items may not be eligible for refunds, including: -
            Perishable products that have been opened or consumed.
          </h6>
        </li>
        <li>
          <h6>Late or Missing Refunds</h6>
          <h6>
            - If you have not received your refund within the expected
            timeframe, please first check your bank account or credit card
            statement. - If you still have not received your refund, please
            contact your bank or credit card company to inquire about the status
            of the refund. - If you need further assistance, please contact us
            at 7875380727.
          </h6>
        </li>
      </ol>
      <h6>
        If you have any questions or concerns about our privacy practices,
        please contact us <br />
        Cakelify <br />
        hello@cakelify.shop <br />
        7875380727
      </h6>
    </div>
  );
};

export default CancellationAndRefund;
