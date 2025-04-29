"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "@/app/_components/payment/checkoutpage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PaymentGateway({
  amount,
  user,
  plan,
}: {
  amount: number;
  user: any;
  plan: string;
}) {
  return (
    <main className="  mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-600 to-purple-500 overflow-y-scroll">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">{user.email}</h1>
        <h2 className=" text-2xl">
          Upgrading to {plan} Plan <span className="font-bold">${amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} userId={user.id} />
      </Elements>
    </main>
  );
}
