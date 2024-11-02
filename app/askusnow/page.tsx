import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
import Help from "./components/Help";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import CustomSlider from "./components/CustomSlider";
import Services from "./components/Services";
import SolicitorsSlider from "./components/SolicitorsSlider";

// export const metadata = {
//   title: "24/7 Legal Chat - Instant Online Lawyer Consults | AskUs",
//   description: `Need legal advice? Chat with expert lawyers anytime, 24/7. Confidential and instant online consultations for all your legal questions with AskUs`,
// };

export default function AskUsNow() {
  return (
    <div>
      <Hero />
      <div className=" bg-gradient-to-b- relative py-[70px] from-[#0477FE]- to-[#0023FF]- flex flex-col h-auto overflow-hidden  _px-[100]">
        <h1 className="text-[16px] md:text-[32px] text-[#000] font-[700] font-poppins text-center">
          Meet The Lawyers
        </h1>
        <SolicitorsSlider />
      </div>
      <Highlight />
      <Help />
      <Services />

      <div className=" bg-gradient-to-b relative py-[30px] from-[#0477FE] to-[#0023FF] flex flex-col h-auto overflow-hidden  _px-[100]">
        <h1 className="text-[16px] md:text-[32px] text-[#FFFFFF] font-[700] font-poppins text-center">
          Client Testimonials
        </h1>
        <CustomSlider />
      </div>
      <Faq />
      <Footer />
    </div>
  );
}
