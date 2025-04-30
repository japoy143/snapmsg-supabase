"use client";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutPage = ({
  amount,
  userId,
}: {
  amount: number;
  userId: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const planPricing: { price: number; plan: string; token: number }[] = [
    { price: 12, plan: "Business", token: 1200 },
    { price: 5, plan: "Personal", token: 450 },
  ];

  const plan = planPricing.find((item) => item.price === amount);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(amount),
        userId: userId,
        token: plan?.token ?? 40,
        plan: plan?.plan ?? "",
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return <div className=" text-white">Loading ...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <button className=" text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse">
        {!loading ? `Pay ${amount}` : "Processing..."}
      </button>
    </form>
  );
};
export default CheckoutPage;
