import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import LenisProvider from "../lib/LenisProvider";
gsap.registerPlugin(ScrollTrigger);

// https://www.gentlerain.ai/
// 水面は後々で良い

export default function SSite2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvasサイズを設定
    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // 座標系をスケールして、通常の座標で描画できるようにする
      ctx.scale(pixelRatio, pixelRatio);
    };
    setCanvasSize();
    const onResize = () => {
      setCanvasSize();
      render();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const frameCount = 198;
    const currentFrame = (index: number) =>
      `/site2/output_${(index + 1).toString().padStart(4, "0")}.webp`;
    const images: HTMLImageElement[] = [];
    const videoFrames = { frame: 0 };
    let imagesToLoad = frameCount;

    const onLoad = () => {
      imagesToLoad--;
      if (!imagesToLoad) {
        render();
        // setupScrollTrigger();
      } else {
        render();
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const img = images[videoFrames.frame];
      if (img && img.complete && img.naturalWidth > 0) {
        const imageAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = canvasWidth / canvasHeight;

        let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

        console.log(imageAspect, canvasAspect);
        if (imageAspect > canvasAspect) {
          drawHeight = canvasHeight;
          drawWidth = drawHeight * imageAspect;
          drawX = (canvasWidth - drawWidth) / 2;
          drawY = 0;
        } else {
          drawWidth = canvasWidth;
          drawHeight = drawWidth / imageAspect;
          drawX = 0;
          drawY = (canvasHeight - drawHeight) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }
    };

    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: ({ progress }) => {
        videoFrames.frame = Math.round(progress * (frameCount - 1));
        render();

        //
        const fadeProgress = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0, 0.3, 0, 1, progress)
        );
        gsap.set(".header", {
          opacity: 1 - fadeProgress,
          transform: `translateZ(${-fadeProgress * 500}px)`,
        });

        //
        const imgProgress = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0.7, 0.9, 0, 1, progress)
        );
        gsap.set(".hero-img", {
          transform: `translateZ(${(1 - imgProgress) * 1000}px)`,
          opacity: imgProgress,
        });
      },
    });

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <>
      <LenisProvider />
      <main>
        <section className="hero relative h-[800vh] contain-paint">
          <div className="sticky top-0 w-full h-screen">
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
            <div className="hero-content absolute inset-0 pt-[20vh] w-full h-full flex justify-center transform-3d perspective-distant">
              <div className="header">
                <h1 className="text-6xl font-bold text-white">
                  毎日が宝石だった。
                </h1>
              </div>
            </div>
            <div className="hero-img-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 transform-3d perspective-distant">
              <div className="hero-img relative w-full h-full -translate-z-[1000px] will-change-transform opacity-0">
                <img
                  src="/bg/bg2.webp"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
