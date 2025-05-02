"use client";
import React, { useActionState, useEffect, useState } from "react";
import DashboardButton from "./dashboard/dashboard_button";
import { provideCompanyDetails } from "@/utils/supabase/dashboard";
import FormErrors from "./formerrors";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/utils/supabase/users";

interface ShowModalProps {
  id: string;
}

export default function ShowModal({ id }: ShowModalProps) {
  const [state, action] = useActionState(provideCompanyDetails, null);
  const [isCompanySet, setIsCompanySet] = useState(false);
  function close() {
    setIsCompanySet(true);
  }

  //toastlisteners
  useEffect(() => {
    if (state?.success) {
      toast("Successfully provided company details", { type: "success" });
      setIsCompanySet(true);
    }
  }, [state?.success]);

  const { isPending, isError, data, error } = useQuery({
    queryFn: () => getUserDetails(id),
    queryKey: ["userDetails"],
  });

  useEffect(() => {
    if (data?.isCompanySet !== undefined) {
      setIsCompanySet(data.isCompanySet);
    }
  }, [data?.isCompanySet]);

  if (isPending) {
    return null; // or a spinner
  }

  return (
    <>
      {!isCompanySet && (
        <div className=" z-50 h-full w-full   flex  justify-center items-center absolute ">
          <form
            action={action}
            className="p-4 bg-slate-50 shadow-lg h-[400px] w-[600px] flex flex-col space-y-2"
          >
            <h1 className=" font-medium text-lg">Company background </h1>
            <input type="hidden" name="id" value={id} />
            <div>
              <label htmlFor="company name" className=" font-medium  text-sm">
                Company Name
              </label>
              <input
                className=" block border-2 border-black/60 h-[40px] w-full px-2 rounded "
                type="text"
                id="company name"
                name="company_name"
                placeholder="provide company name"
              />
              <FormErrors
                error={
                  state?.error?.company_name && state?.error?.company_name[0]
                }
              />
            </div>

            <div className=" flex-1 w-full h-full flex flex-col">
              <label
                htmlFor="company details"
                className=" font-medium  text-sm"
              >
                Company Details
              </label>
              <textarea
                className="flex-1 w-full h-full  border-2 border-black/60 rounded p-2"
                name="company_details"
                id="company details"
                placeholder=" please provide company details for more detailed response"
              ></textarea>
              <FormErrors
                error={
                  state?.error?.company_details &&
                  state?.error?.company_details[0]
                }
              />
            </div>

            <div className=" flex space-x-2 mt-2 justify-end">
              <DashboardButton
                type="custom"
                buttonName="Cancel"
                action={close}
              />

              <DashboardButton
                type="submit"
                buttonName="Save"
                action={() => {}}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
