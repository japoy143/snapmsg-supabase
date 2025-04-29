import PaymentGateway from "@/app/_components/payment/payment-gateway";
import { createClient } from "@/utils/supabase/server";
import { error } from "console";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ amount: string }>;
}) {
  const amount = (await params).amount;

  async function getUserEmail(): Promise<any> {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return "no email";
    }

    return user;
  }

  const user = await getUserEmail();

  const amountValue: { price: string; plan: string }[] = [
    { price: "12", plan: "Business" },
    { price: "5", plan: "Personal" },
  ];

  const planExist = amountValue.find((item) => item.price === amount);

  if (planExist?.plan === undefined) {
    redirect("/protected/upgrade");
  }

  return (
    <>
      <PaymentGateway
        amount={parseInt(amount)}
        user={user}
        plan={planExist?.plan}
      />
    </>
  );
}
