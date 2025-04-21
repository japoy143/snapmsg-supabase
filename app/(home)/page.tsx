import ContactSection from "../_components/home_components/contact_section";
import HeroSection from "../_components/home_components/hero_section";
import PlansSection from "../_components/home_components/plans_section";
import ServicesSection from "../_components/home_components/services_section";

export default function Home() {
  return (
    <div className="  overflow-y-auto ">
      <HeroSection />
      <ServicesSection />
      <PlansSection />
      <ContactSection />
    </div>
  );
}
