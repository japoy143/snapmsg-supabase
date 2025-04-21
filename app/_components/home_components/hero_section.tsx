import Image from "next/image";
import radial_right from "../../assets/images/right_radial.png";
import radial_left from "../../assets/images/left_radial.png";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="h-screen   w-screen flex flex-col  items-center justify-center relative  ">
      <div className=" absolute  z-0 h-full w-screen  flex flex-col overflow-hidden  ">
        <div className="w-full flex items-center justify-between ">
          <Image
            src={radial_right}
            height={500}
            width={500}
            alt="right radial"
          />
          <Image src={radial_left} height={500} width={500} alt="left radial" />
        </div>
      </div>

      <div className=" absolute  z-10 h-full w-screen  flex flex-col overflow-hidden justify-end     ">
        <div className="h-[50%] bg-[url('../assets/images/underline_linear.png')] bg-fill w-screen"></div>
      </div>
      <div className="z-30 h-full flex flex-col items-center justify-center w-screen lg:w-[80%] text-center space-y-8 ">
        <h1 className="text-[64px]">Quick Support Happy Clients</h1>

        <p className="text-[16px] px-10 md:px-32 lg:px-60">
          Never keep your customers waiting! With SnapMsg, send instant, smart
          replies and boost customer satisfaction effortlessly.
        </p>

        <Link
          href={"/sign-up"}
          className="bg-[var(--primary-color)] py-4 px-10 rounded text-white"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
