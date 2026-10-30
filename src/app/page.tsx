import Events from "@/components/homePage/Events";
import Hero from "@/components/homePage/Hero";
import Impact from "@/components/homePage/Impact";
import Initiative from "@/components/homePage/Initiative";
import Mission from "@/components/homePage/Mission";
import Newsletter from "@/components/homePage/NewsLetter";
import Quote from "@/components/homePage/Quote";
import Stories from "@/components/homePage/Stories";
import Image from "next/image";

export default function Home() {
  return (
    <main>
        <Hero />
        <Mission />
        <Initiative />
        <Events />
        <Stories />
        <Impact />
        <Quote />
        <Newsletter />
     
    </main>
  );
}
