import React from "react";
import DashboardButton from "./dashboard/dashboard_button";

export default function ShowModal() {
  return (
    <>
      <div className=" z-50 h-full w-full   flex  justify-center items-center absolute ">
        <div className="p-4 bg-slate-50 shadow-lg h-[400px] w-[600px] flex flex-col space-y-2">
          <h1 className=" font-medium text-lg">Company background</h1>

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
          </div>

          <div className=" flex-1 w-full h-full flex flex-col">
            <label htmlFor="company details" className=" font-medium  text-sm">
              Company Details
            </label>
            <textarea
              className="flex-1 w-full h-full  border-2 border-black/60 rounded p-2"
              name="company_details"
              id="company details"
              placeholder=" please provide company details for more detailed response"
            ></textarea>
          </div>

          <div className=" flex space-x-2 mt-2 justify-end">
            <DashboardButton
              type="submit"
              buttonName="Cancel"
              action={() => {}}
            />

            <DashboardButton
              type="submit"
              buttonName="Save"
              action={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
