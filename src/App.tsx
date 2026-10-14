import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Transformation from "@/components/sections/Transformation";
import Works from "@/components/sections/Works";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import Loader from "@/components/layout/Loader";
import CustomCursor from "@/components/layout/CustomCursor";

export default function App() {
  return (
    <SmoothScroll>
      <Loader />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Transformation />
        <Works />
        <Team />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
