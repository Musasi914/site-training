import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ReactLenis, { type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { createRefCallback } from "../../utils/mapRefs";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Flow",
    top: 25,
    left: 15,
  },
  {
    title: "Archive",
    top: 12.5,
    left: 50,
  },
  {
    title: "System Design",
    top: 22.5,
    left: 75,
  },
  {
    title: "Data Analysis",
    top: 30,
    left: 82.5,
  },
  {
    title: "AI Integration",
    top: 50,
    left: 20,
  },
  {
    title: "Automation",
    top: 80,
    left: 20,
  },
  {
    title: "Infrastructure",
    top: 75,
    left: 75,
  },
];

export default function Site1() {
  const lenisRef = useRef<LenisRef>(null);
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  });

  const featuresRef = useRef<Map<number, HTMLDivElement>>(null);
  const featuresBgRef = useRef<Map<number, HTMLDivElement>>(null);
  const featureStartDimensions = useRef<{ width: number; height: number }[]>(
    []
  );

  useGSAP(() => {
    gsap.from(".intro", {
      opacity: 0,
    });

    for (const bg of featuresBgRef.current?.values() ?? []) {
      const rect = bg.getBoundingClientRect();
      featureStartDimensions.current.push({
        width: rect.width,
        height: rect.height,
      });
    }

    const remInPixels = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const targetWidth = 3 * remInPixels;
    const targetHeight = 3 * remInPixels;

    ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: () => `+=${window.innerHeight * 3}`,
      pin: true,
      anticipatePin: 1,
      scrub: 1,
      pinSpacing: true,
      onUpdate: ({ progress }) => {
        const spotlightHeaderProgress = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0, 0.3333, 0, 1, progress)
        );
        gsap.set(".spotlight-content", {
          y: `${-100 * spotlightHeaderProgress}%`,
        });

        const featureProgress = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0, 0.5, 0, 1, progress)
        );
        features.forEach((feature, index) => {
          const currentFeatureTop =
            feature.top + (50 - feature.top) * featureProgress;
          const currentFeatureLeft =
            feature.left + (50 - feature.left) * featureProgress;

          gsap.set(featuresRef.current?.get(index) ?? null, {
            top: `${currentFeatureTop}%`,
            left: `${currentFeatureLeft}%`,
          });
        });

        featuresBgRef.current?.forEach((bg, index) => {
          const featureDim = featureStartDimensions.current[index];
          const currentWidth =
            featureDim.width +
            (targetWidth - featureDim.width) * featureProgress;
          const currentHeight =
            featureDim.height +
            (targetHeight - featureDim.height) * featureProgress;
          const currentBorderRadius = 0.5 + (2 - 0.5) * featureProgress;
          const currentBorderWidth = 2 + (0.5 - 2) * featureProgress;
          gsap.set(bg, {
            width: currentWidth,
            height: currentHeight,
            borderRadius: `${currentBorderRadius}rem`,
            borderWidth: `${currentBorderWidth}px`,
          });
        });

        const featureTextProgress = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0, 0.1, 0, 1, progress)
        );
        gsap.set(".feature-content", {
          opacity: 1 - featureTextProgress,
        });

        if (progress >= 0.5) {
          gsap.set(".features", {
            opacity: 0,
          });
          gsap.set(".search-bar", {
            opacity: 1,
          });
        } else {
          gsap.set(".features", {
            opacity: 1,
          });
          gsap.set(".search-bar", {
            opacity: 0,
          });
        }

        const searchBarProgress = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0.5, 0.75, 0, 1, progress)
        );
        const serchBarWidth = 3 + (25 - 3) * searchBarProgress;
        const serchBarHeight = 3 + (5 - 3) * searchBarProgress;
        const translateY = -50 + (200 - -50) * searchBarProgress;
        gsap.set(".search-bar", {
          width: `${serchBarWidth}rem`,
          height: `${serchBarHeight}rem`,
          translate: `-50% ${translateY}%`,
        });

        const searchBarTextProgress = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0.75, 1, 0, 1, progress)
        );
        gsap.set(".search-bar p", {
          opacity: searchBarTextProgress,
        });

        gsap.set(".header-content", {
          y: -50 + 50 * searchBarTextProgress,
          opacity: searchBarTextProgress,
        });
      },
    });
  }, [lenisRef]);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <div className="bg-gray-900 text-amber-50">
        <section className="intro relative h-screen grid place-items-center">
          <h1 className="text-5xl font-serif w-[40%] text-center">
            Where systems move with intention
          </h1>
        </section>

        <section className="spotlight relative h-screen">
          <div className="spotlight-content absolute w-full h-full flex justify-center items-center">
            <h1 className="text-4xl font-serif w-[40%] text-center">
              Information flows best through intentional design
            </h1>
          </div>

          <div className="header absolute w-full h-full flex justify-center items-center">
            <div className="header-content w-[60%] flex flex-col gap-4 items-center text-center -translate-y-24 opacity-0">
              <h1 className="text-4xl font-serif">
                Find what matters through intelligent design
              </h1>
              <p>
                Discover a system that adapts to the way you think. not the
                other way around.
              </p>
            </div>
          </div>

          <div className="features">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                ref={createRefCallback(featuresRef, index)}
                style={{ top: feature.top + "%", left: feature.left + "%" }}
                className="feature absolute w-max h-max px-6 py-4 -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  ref={createRefCallback(featuresBgRef, index)}
                  className="feature-bg bg-gray-800 absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-gray-200 rounded-xl"
                ></div>
                <div className="feature-content relative">
                  <p className="uppercase text-sm">{feature.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="search-bar absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800 border-2 border-gray-200 rounded-full flex items-center opacity-0">
            <p className="relative opacity-0 ml-8">Find the unseen link</p>
          </div>
        </section>

        <section className="outro relative h-screen grid place-items-center">
          <h1 className="text-4xl font-serif">（System Complete）</h1>
          <div className="flex relative" style={{ filter: "url(#goo)" }}>
            <div className="absolute w-48 h-16 rounded-full bg-amber-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-16 h-48 rounded-full bg-amber-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
        </section>
      </div>
    </>
  );
}
