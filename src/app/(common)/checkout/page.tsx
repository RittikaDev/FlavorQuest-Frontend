import CheckoutPage from "@/components/pages/common/checkout/CheckoutPage";
import WithAuth from "@/role-wrappers/WithAuth";
import React from "react";

const Checkout = () => {
  return (
    <div>
      <WithAuth>
        <CheckoutPage />
      </WithAuth>
    </div>
  );
};

export default Checkout;
