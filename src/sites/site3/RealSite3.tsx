import Hero from "./Hero";
import Introduce from "./Introduce";
import LenisProvider from "../../lib/LenisProvider";

export default function RealSite3() {
  return (
    <>
      <LenisProvider />
      <main className="text-white">
        <Hero />
        <Introduce />
      </main>
    </>
  );
}
