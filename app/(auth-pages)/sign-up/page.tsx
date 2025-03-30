import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import FormWrapper from "../../_components/formwrapper";
import { LogoHeader } from "@/app/_components";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className=" h-screen w-screen bg-[var(--forms-background-color)] flex flex-col items-center justify-center">
      <FormWrapper sizes="lg">
        {/* heading  */}
        <div className=" w-full flex items-center justify-center">
          <LogoHeader />
        </div>
        <div className=" mt-4">
          <h1 className=" text-3xl text-center text-[var(--primary-color)]">
            Welcome Back
          </h1>
          <p className=" text-sm w-full text-black/40 text-center px-6">
            Respond quickly to your client with Ai assisted response and
            accuracy.
          </p>
        </div>
        <form>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
            />
            <SubmitButton formAction={signUpAction} pendingText="Signing up...">
              Sign up
            </SubmitButton>
            <p className="text-sm w-4/5 text-black/40">
              Already have an{" "}
              <Link className="text-[var(--secondary-color)]" href={"/sign-in"}>
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
