import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type IntroduceItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  itemClassName: string;
};

const introduceItems: IntroduceItem[] = [
  {
    title: "Training",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. dolore repellendus quis explicabo corporis!",
    imageSrc: "/bg/bg2.webp",
    imageAlt: "",
    itemClassName: "introduce-item1",
  },
  {
    title: "Practice",
    description:
      "lorem amet consectetur adipisicing elit. dolore repellendus quis!",
    imageSrc: "/bg/bg1.webp",
    imageAlt: "",
    itemClassName: "introduce-item2",
  },
  {
    title: "Effort",
    description:
      "Assumenda aspernatur iure libero voluptatem, maxime natus odit non consequatur eos",
    imageSrc: "/bg/bg2.webp",
    imageAlt: "",
    itemClassName: "introduce-item3",
  },
  {
    title: "Strength",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.  laudantium laboriosam pariatur dolorem molestiae nam beatae obcaecati odio perspiciatis incidunt!",
    imageSrc: "/bg/bg1.webp",
    imageAlt: "",
    itemClassName: "introduce-item4",
  },
];

const getBackgroundColor = (index: number) =>
  index % 2 === 0 ? "bg-blue-500" : "bg-amber-500";

const getTextBackgroundColor = (index: number) =>
  index % 2 === 0 ? "bg-amber-400" : "bg-blue-400";

export default function Introduce() {
  const introduceScrollContainerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".introduce",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      onUpdate: ({ progress }) => {
        // gsap.set(introduceScrollContainerRef.current, {
        //   opacity: 1 - progress,
        // });
        const progress14 = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0, 0.25, 0, 1, progress)
        );
        const progress24 = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0.25, 0.5, 0, 1, progress)
        );
        const progress34 = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0.5, 0.75, 0, 1, progress)
        );
        const progress44 = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0.75, 1, 0, 1, progress)
        );
        gsap.set(introduceScrollContainerRef.current, {
          opacity: progress14,
        });
        gsap.set(".introduce-item1", {
          clipPath: `polygon(0 0, 100% 0, 100% ${100 - progress24 * 100}%, 0 ${
            100 - progress24 * 100
          }%)`,
        });
        gsap.set(".introduce-item1-content", {
          y: progress24 * 100,
        });
        gsap.set(".introduce-item2", {
          clipPath: `polygon(0 ${100 - progress24 * 100}%, 100% ${
            100 - progress24 * 100
          }%, 100% ${100 - progress34 * 100}%, 0 ${100 - progress34 * 100}%)`,
        });
        gsap.set(".introduce-item2-content", {
          y: (progress34 === 0 ? -(1 - progress24) : progress34) * 100,
        });
        gsap.set(".introduce-item3", {
          clipPath: `polygon(0 ${100 - progress34 * 100}%, 100% ${
            100 - progress34 * 100
          }%, 100% ${100 - progress44 * 100}%, 0 ${100 - progress44 * 100}%)`,
        });
        gsap.set(".introduce-item3-content", {
          y: (progress44 === 0 ? -(1 - progress34) : progress44) * 100,
        });
        gsap.set(".introduce-item4", {
          clipPath: `polygon(0 ${100 - progress44 * 100}%, 100% ${
            100 - progress44 * 100
          }%, 100% 100%, 0 100%)`,
        });
        gsap.set(".introduce-item4-content", {
          y: -(1 - progress44) * 100,
        });
      },
    });
  });
  return (
    <section className="introduce relative">
      <div className="introduce-scroll-container">
        {introduceItems.map((item, index) => (
          <div
            key={index}
            className={`relative h-screen ${getBackgroundColor(index)}`}
          >
            <p
              className={`absolute z-10 top-0 left-0 w-full border-y border-black ${getTextBackgroundColor(
                index
              )} p-2`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
      <div className="introduce-contents w-full h-full absolute inset-0">
        <div className="sticky top-0 grid" ref={introduceScrollContainerRef}>
          {introduceItems.map((item, index) => (
            <div
              key={index}
              className={`${item.itemClassName} ${
                index === 0
                  ? "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] "
                  : "[clip-path:polygon(0_0,100%_0,100%_0%,0_0%)] "
              }  col-span-full row-span-full h-screen px-2`}
            >
              <div
                className={`${item.itemClassName}-content grid grid-cols-2 items-center h-full`}
              >
                <div>
                  <h2 className="text-4xl font-bold">{item.title}</h2>
                  <p className="mt-4">{item.description}</p>
                </div>
                <div className="aspect-video overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={item.imageSrc}
                    alt={item.imageAlt}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
