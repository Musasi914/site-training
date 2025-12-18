import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Site4() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".clippath-container",
        start: "top top",
        end: () => `+=${window.innerHeight * 3}`,
        scrub: 1,
        pin: true,
      },
    });
    tl.to(
      ".layer1",
      {
        clipPath: "circle(50% at 0% 50%)",
      },
      0
    );
    tl.to(
      ".layer2",
      {
        clipPath: "circle(50% at 100% 50%)",
      },
      0
    );
  }, []);
  return (
    <main className="w-full bg-gray-800">
      <div className="clippath-container grid place-items-center h-screen tracking-widest">
        <h1 className="title text-[15vw] text-gray-100 font-bold">Clip Path</h1>
        <div className="layer1 [clip-path:circle(20%_at_0%_50%)] absolute bg-amber-400 top-0 left-0 w-full h-full grid place-items-center">
          <h1 className="title text-[15vw] font-bold text-stroke">Clip Path</h1>
        </div>
        <div className="layer2 [clip-path:circle(20%_at_100%_50%)] absolute bg-blue-400 top-0 left-0 w-full h-full grid place-items-center">
          <h1 className="title text-[15vw] font-bold">Clip Path</h1>
        </div>
      </div>
    </main>
  );
}
