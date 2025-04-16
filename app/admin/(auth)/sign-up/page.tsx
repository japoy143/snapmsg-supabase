import { FormWrapper, LogoHeader } from "@/app/_components";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { signUpAdmin } from "@/utils/supabase/admin/auth";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

import React from "react";

export default function page() {
  return (
    <div className=" h-screen w-screen bg-[var(--forms-background-color)] flex flex-col items-center justify-center">
      <FormWrapper>
        {/* heading  */}
        <div className=" w-full flex items-center justify-center">
          <LogoHeader />
        </div>
        <div className=" mt-4">
          <h1 className=" text-3xl text-center text-[var(--primary-color)]">
            Sign up Admin account
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
            <SubmitButton formAction={signUpAdmin} pendingText="Signing up...">
              Sign up
            </SubmitButton>
            <p className="text-sm w-4/5 text-black/40">
              Already have an{" "}
              <Link
                className="text-[var(--secondary-color)]"
                href={"/admin/sign-in"}
              >
                account?
              </Link>
            </p>
          </div>
        </form>
      </FormWrapper>
    </div>
  );
}
