"use client";
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import SectionHead from "@/components/shared/SectionHead/SectionHead";
import MyButton from "@/components/ui/MyButton/MyButton";
import { useCreatePaymentMutation } from "@/redux/features/payment/payment.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { CheckCircle, CreditCard, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CheckoutPage = () => {
  const [createPayment] = useCreatePaymentMutation();
  const router = useRouter();

  const handlePayment = async () => {
    const res = await handleAsyncWithToast(async () => {
      return createPayment(undefined);
    }, "Payment proceeding");
    if (res?.data?.success) {
      router.push(res?.data?.data);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100/90 py-12">
      <MyContainer>
        {/* Header */}
        <div className="text-center mb-10">
          <SectionHead title="Complete Your Purchase" className="!text-2xl" />
          <div className="flex items-center justify-center text-primary mt-2">
            <Lock className="w-4 h-4 mr-1" />
            <span className="text-sm">Secure checkout</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-6">
            <CreditCard className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-lg md:text-xl font-semibold">
              Payment Information
            </h2>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Premium Membership</span>
                <span className="font-medium">999 BDT/lifetime</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-600">Price</span>
                <span className="font-medium">999 BDT</span>
              </div>
            </div>

            <div className="text-green-600 flex items-center text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              Lifetime Access
            </div>
            <p className="text-xs text-gray-500">
              You won&apos;t be charged again.
            </p>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>999 BDT</span>
              </div>
            </div>

            <MyButton
              onClick={handlePayment}
              className="w-full bg-primary hover:bg-amber-700 py-3 text-lg font-bold"
              label="Complete Purchase"
            />

            <p className="text-xs justify-center text-gray-500 mt-4 flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Your payment is secure and encrypted
            </p>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default CheckoutPage;
