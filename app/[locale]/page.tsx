import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Work />
      </main>
      <Footer />
    </>
  );
}
