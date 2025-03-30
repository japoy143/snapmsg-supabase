import { FormWrapper, LogoHeader } from "@/app/_components";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className=" h-screen w-screen bg-[var(--forms-background-color)] flex flex-col items-center justify-center">
      <FormWrapper>
        {/* heading  */}
        <div className=" w-full flex items-center justify-center">
          <LogoHeader />
        </div>
        <div className=" mt-4">
          <h1 className=" text-3xl text-[var(--primary-color)] text-center">
            Login to your account
          </h1>
          <p className=" text-sm w-full text-black/40 text-center px-6">
            Respond quickly to your client with Ai assisted response and
            accuracy.
          </p>
        </div>

        <form className="flex-1 flex flex-col min-w-64">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
            <SubmitButton pendingText="Signing In..." formAction={signInAction}>
              Sign in
            </SubmitButton>
            <p className="text-sm w-4/5 text-black/40">
              Doesn't have an{" "}
              <Link className="text-[var(--secondary-color)]" href={"/sign-up"}>
                account?
              </Link>
            </p>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </FormWrapper>
    </div>
  );
}
