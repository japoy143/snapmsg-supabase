"use client";
import Image from "next/image";
import React from "react";
import contactsvg from "../../assets/svgs/contact_us.svg";
import { MessageSvg, WorkWithMe } from "@/app/assets/svgs";
import social_links from "../../assets/images/social_links.png";
import { sendGuestMessage } from "@/utils/supabase/message";
import { toast } from "react-toastify";

export default function ContactSection() {
  return (
    <section
      id="contacts"
      className=" py-10  bg-purple-50 flex items-center flex-col justify-center"
    >
      <div className="p-4 bg-white shadow-lg h-[70%] w-[80%] xl:w-[50%] grid grid-cols-1 md:grid-cols-2">
        <div className=" px-2 py-10">
          <Image src={contactsvg} alt="contact us" width={400} />

          <div className=" mt-4 space-y-4 px-4">
            <div className=" pt-6 flex items-center gap-2">
              <MessageSvg className=" size-6 text-[var(--primary-color)]" />
              <p className=" text-[var(--primary-color)]">Message me</p>
            </div>

            <div className=" flex items-center gap-2">
              <WorkWithMe className=" size-6 text-[var(--primary-color)]" />
              <p className=" text-[var(--primary-color)]">Work with me</p>
            </div>

            <div className=" pt-2 ">
              <Image src={social_links} alt="social links" />
            </div>
          </div>
        </div>
        <div className=" py-10 px-2 ">
          <h2 className=" font-medium text-xl text-center">Get In Touch</h2>
          <p className=" text-sm text-center text-black/50">
            If you have any questions or just want to say hello, feel free to
            drop a message!
          </p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);

              try {
                const res = await sendGuestMessage(formData);

                if (res.success) {
                  toast(res.message, { type: "success" });
                } else {
                  toast(res.message, { type: "error" });
                }
              } catch (error) {
                toast("Error sending message", { type: "error" });
              } finally {
                form.reset();
              }
            }}
            className=" space-y-3"
          >
            <div>
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className=" pl-2 block w-full border-2 border-black/60 rounded"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className=" pl-2 block w-full border-2 border-black/60 rounded"
              />
            </div>

            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="p-4 block w-full h-[200px] border-2 border-black/60 rounded-lg"
                required
                name="message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 rounded-md text-white w-full bg-[var(--primary-color)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
