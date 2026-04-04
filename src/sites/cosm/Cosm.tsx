import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { createRefCallback } from "../../utils/mapRefs";

const imgs = [
  {
    src: "/cosm/1.webp",
    x: "-88%",
    y: "34%",
    z: -250,
  },
  {
    src: "/cosm/2.webp",
    x: "42%",
    y: "-56%",
    z: -300,
  },
  {
    src: "/cosm/3.webp",
    x: "79%",
    y: "13%",
    z: -460,
  },
  {
    src: "/cosm/4.webp",
    x: "-65%",
    y: "-92%",
    z: -600,
  },
  {
    src: "/cosm/5.webp",
    x: "100%",
    y: "87%",
    z: -700,
  },
  {
    src: "/cosm/6.webp",
    x: "-11%",
    y: "-100%",
    z: -900,
  },
  {
    src: "/cosm/7.webp",
    x: "56%",
    y: "61%",
    z: -1000,
  },
  {
    src: "/cosm/8.webp",
    x: "-77%",
    y: "92%",
    z: -1100,
  },
  {
    src: "/cosm/9.webp",
    x: "23%",
    y: "-73%",
    z: -1200,
  },
  {
    src: "/cosm/10.webp",
    x: "-100%",
    y: "0%",
    z: -1300,
  },
];

export default function Cosm() {
  const imgsRef = useRef<Map<number, HTMLImageElement>>(new Map());
  useGSAP(() => {
    for (const [index, img] of imgsRef.current.entries()) {
      gsap.set(img, {
        translateX: imgs[index].x,
        translateY: imgs[index].y,
        translateZ: imgs[index].z,
        opacity: 0,
        filter: `blur(${Math.abs(imgs[index].z) / 100}px)`,
      });
    }

    const tl = gsap.timeline();
    for (const [index, img] of imgsRef.current.entries()) {
      tl.to(
        img,
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.4,
          ease: "power4.in",
        },
        index * 0.1 + 0.2
      );

      tl.to(
        img,
        {
          translateZ: 300,
          ease: "power4.in",
          duration: 1,
        },
        index * 0.1
      );
    }

    tl.play();
    // gsap.to(img, {
    //   filter: "blur(0px)",
    //   duration: 0.5,
    //   opacity: 1,
    //   delay: index * 0.1,
    // });
    // gsap.to(img, {
    //   duration: 2,
    //   translateX: x + "%",
    //   translateY: y + "%",
    //   translateZ: 500,
    //   delay: index * 0.1,
    // });
  }, []);
  return (
    <div className="w-full h-screen overflow-hidden grid place-items-center">
      <div className="perspective-near transform-3d w-2xl grid place-items-center">
        {imgs.map((img, index) => (
          <figure
            key={index}
            className="w-full h-full relative col-span-1 col-start-1 row-span-1 row-start-1
            "
            ref={createRefCallback(imgsRef, index)}
          >
            <img
              src={img.src}
              alt={`cosm${index + 1}`}
              className="w-full h-full object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
