import {
  CustomizableSvg,
  IntrgrationsSvg,
  PersonalizeSvg,
} from "@/app/assets/svgs";
import React from "react";

export default function ServicesSection() {
  return (
    <section id="services" className="  w-screen bg-purple-50 py-10 px-4">
      <div className=" grid grid-cols-2 px-8  xl:px-72">
        <h1 className=" text-3xl font-medium">
          Automate Business Response. Elevate Engagement.
        </h1>
        <div className=" flex h-full items-center">
          <p>
            Custom-built response trained on your business data to handle FAQs,
            support, and sales queries 24/7.
          </p>
        </div>
      </div>

      <div className=" mt-8 grid grid-cols-1 sm:grid-cols-3  px-8  xl:px-96  gap-2">
        <div className=" bg-white shadow-lg p-4">
          <PersonalizeSvg className=" size-6 text-[var(--primary-color)]" />
          <h1 className=" mt-2  font-bold">Personalize Ai Assisted</h1>
          <p className=" text-justify mt-2">
            The application leverages AI to generate responses tailored to each
            customer’s query. It analyzes user interactions to provide
            contextual and meaningful replies, improving the overall customer
            experience.
          </p>
        </div>

        <div className=" bg-white shadow-lg p-4">
          <CustomizableSvg className=" size-6 text-[var(--primary-color)]" />
          <h1 className=" mt-2 font-bold">Customizable</h1>
          <p className=" text-justify mt-2">
            Business owners have full control over the response system, allowing
            them to customize message tone, style, and content to align with
            their brand’s voice. This ensures a more personalized and engaging
            communication approach.
          </p>
        </div>

        <div className=" bg-white shadow-lg p-4">
          <IntrgrationsSvg className=" size-6 text-[var(--primary-color)]" />
          <h1 className=" mt-2 font-bold">Integration</h1>
          <p className=" text-justify mt-2">
            The application is designed to integrate smoothly with various
            platforms such as websites, social media, and messaging apps. This
            ensures a unified communication experience, allowing businesses to
            manage customer interactions efficiently.
          </p>
        </div>
      </div>
    </section>
  );
}
