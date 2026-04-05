import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const getVideoSrc = (index: number) => `/video/zentry/hero-${index}.webm`;

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          onStart: () => {
            if (nextVideoRef.current) {
              (nextVideoRef.current as HTMLVideoElement).play();
            }
          },
          onComplete: () => {
            const video = document.querySelector(
              "#current-video"
            ) as HTMLVideoElement;
            if (video) {
              video.src = getVideoSrc(currentIndex);
              video.currentTime = 1;
              video.play();
            }

            gsap.to("#next-video", {
              opacity: 0,
              duration: 1,
            });
          },
        });

        gsap.from("#current-mini-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          onStart: () => {
            if (nextVideoRef.current) {
              (nextVideoRef.current as HTMLVideoElement).play();
            }
          },
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.fromTo(
      "#video-frame",
      {
        clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
        borderRadius: "0 0 0 0",
      },
      {
        clipPath: `polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)`,
        borderRadius: "0 0 40% 10%",
        duration: 1,
        scrollTrigger: {
          trigger: "#video-frame",
          start: "bottom bottom",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  });

  return (
    <div className="relative">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-100"
      >
        <div>
          <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                className="size-64 object-cover scale-150 object-center origin-center"
                loop
                muted
                id="current-mini-video"
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            id="next-video"
            loop
            muted
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          ></video>
          <video
            id="current-video"
            src={getVideoSrc(1)}
            autoPlay
            loop
            muted
            className="absolute size-full inset-0 object-cover object-center"
          ></video>
        </div>
      </div>
    </div>
  );
}
