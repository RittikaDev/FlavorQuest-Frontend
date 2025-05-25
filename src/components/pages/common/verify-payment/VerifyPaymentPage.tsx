/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/components/shared/Loading/Loading";
import MyButton from "@/components/ui/MyButton/MyButton";
import { useVerifyPaymentMutation } from "@/redux/features/payment/payment.api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyPaymentPage = () => {
  const searchParams = useSearchParams();
  const sp_order_id = searchParams.get("order_id");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [verifyPayment] = useVerifyPaymentMutation();
  const [subscriptionData, setSubscriptionData] = useState<any>(null);

  useEffect(() => {
    if (sp_order_id === null) return; // Wait until search param is available

    if (!sp_order_id) {
      router.push("/");
      return;
    }

    verifyPayment({ sp_order_id })
      .unwrap()
      .then((res: any) => {
        setSubscriptionData(res?.data);
        setIsLoading(false);
      })
      .catch(() => {
        setSubscriptionData(null);
        setIsLoading(false);
      });
  }, [sp_order_id, verifyPayment, router]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(subscriptionData);

  return (
    <div className="mt-8 md:mt-16 w-[90%] md:w-[88%] mx-auto mb-16">
      <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Details */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <dl className="grid grid-cols-2 gap-2">
            <dt className="font-semibold">Order ID:</dt>
            <dd>{subscriptionData?.order_id}</dd>
            <dt className="font-semibold">Amount:</dt>
            <dd>
              {subscriptionData?.currency}{" "}
              {subscriptionData?.amount?.toFixed(2)}
            </dd>
            <dt className="font-semibold">Status:</dt>
            <dd>
              <span
                className={`px-2 py-1 text-sm rounded ${
                  subscriptionData?.bank_status === "Success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {subscriptionData?.bank_status}
              </span>
            </dd>
            <dt className="font-semibold">Date:</dt>
            <dd>{new Date(subscriptionData?.date_time).toLocaleString()}</dd>
          </dl>
        </div>

        {/* Payment Info */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <dl className="grid grid-cols-2 gap-2">
            <dt className="font-semibold">Method:</dt>
            <dd>{subscriptionData?.method}</dd>
            <dt className="font-semibold">Transaction ID:</dt>
            <dd>{subscriptionData?.bank_trx_id}</dd>
            <dt className="font-semibold">Invoice No:</dt>
            <dd>{subscriptionData?.invoice_no}</dd>
            <dt className="font-semibold">SP Code:</dt>
            <dd>{subscriptionData?.sp_code}</dd>
            <dt className="font-semibold">SP Message:</dt>
            <dd>{subscriptionData?.sp_message}</dd>
          </dl>
        </div>

        {/* Customer Info */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <dl className="grid grid-cols-2 gap-2">
            <dt className="font-semibold">Name:</dt>
            <dd>{subscriptionData?.name}</dd>
            <dt className="font-semibold">Email:</dt>
            <dd>{subscriptionData?.email}</dd>
            <dt className="font-semibold">Phone:</dt>
            <dd>{subscriptionData?.phone_no}</dd>
            <dt className="font-semibold">Address:</dt>
            <dd>{subscriptionData?.address}</dd>
            <dt className="font-semibold">City:</dt>
            <dd>{subscriptionData?.city}</dd>
          </dl>
        </div>

        {/* Verification Status */}
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Verification Status</h2>
          {/* <div className="flex items-center gap-2">
            {subscriptionData?.is_verify === 1 ? (
              <>
                <CheckCircle className="text-green-500" />
                <span>Verified</span>
              </>
            ) : (
              <>
                <AlertCircle className="text-yellow-500" />
                <span>Not Verified</span>
              </>
            )}
          </div> */}
          <div className="mt-4">
            <Link href="/user">
              <MyButton label="Dashboard" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPaymentPage;
