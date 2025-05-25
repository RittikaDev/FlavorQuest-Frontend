import VerifyPaymentPage from "@/components/pages/common/verify-payment/VerifyPaymentPage";
import WithAuth from "@/role-wrappers/WithAuth";
import React from "react";

const VerifyPayment = () => {
  return (
    <div>
      <WithAuth>
        <VerifyPaymentPage />
      </WithAuth>
    </div>
  );
};

export default VerifyPayment;
