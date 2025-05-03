"use client";
import React, { useEffect, useState } from "react";
import DashboardButton from "./dashboard/dashboard_button";
import { provideCompanyDetails } from "@/utils/supabase/dashboard";
import FormErrors from "./formerrors";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserDetails, getUserId } from "@/utils/supabase/users";

type errorField = {
  company_name?: string[] | undefined;
  company_details?: string[] | undefined;
};
interface ShowModalProps {
  id: string;
}

export default function ShowModal() {
  const [statusState, setStatusState] = useState<{
    success?: boolean;
    error?: errorField;
  }>();
  const [isCompanySet, setIsCompanySet] = useState(true);
  function close() {
    setIsCompanySet(true);
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ state, formData }: { state: any; formData: FormData }) =>
      provideCompanyDetails(state, formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });

      toast("Successfully provided company details", { type: "success" });
      setIsCompanySet(true);
    },
  });

  const {
    isPending: isUserIdPending,
    isError: isUserIdError,
    data: userId,
    error: userIdError,
  } = useQuery({
    queryKey: ["getuserid"],
    queryFn: getUserId,
  });

  const { isPending, isError, data, error } = useQuery({
    queryFn: () => getUserDetails(userId ?? ""),
    queryKey: ["userDetails"],
    enabled: !!userId,
  });

  useEffect(() => {
    if (data?.isCompanySet !== undefined) {
      setIsCompanySet(data.isCompanySet);
    }
  }, [data?.isCompanySet]);

  if (isPending) {
    return null; // or a spinner
  }

  /*
  Functions
  */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      await mutation.mutateAsync({ state: statusState, formData });
    } catch (e) {
      setStatusState({ success: false });
    }
  }

  return (
    <>
      {!isCompanySet && (
        <div className=" z-50 h-full w-full   flex  justify-center items-center absolute ">
          <form
            className="p-4 bg-slate-50 shadow-lg h-[400px] w-[600px] flex flex-col space-y-2"
            onSubmit={handleSubmit}
          >
            <h1 className=" font-medium text-lg">Company background </h1>
            <input type="hidden" name="id" value={userId} />
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
                  statusState?.error?.company_name &&
                  statusState?.error?.company_name[0]
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
                  statusState?.error?.company_details &&
                  statusState?.error?.company_details[0]
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
