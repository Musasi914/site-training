import { useEffect, useRef } from "react";

export default function Site3() {
  const textRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!textRef.current) return;
    const splitedArray = textRef.current.textContent?.split("") || [];
    textRef.current.innerHTML = splitedArray
      .map(
        (accu) =>
          `<span style='color:hsl(${
            Math.random() * 360
          }, 100%, 60%);animation="colorShift 3s linear infinite";animationDelay="${
            Math.random() * 0.3
          }s"'>${accu === " " ? "&nbsp;" : accu}</span>`
      )
      .join("");
  }, []);
  return (
    <div className="bg-gray-600 h-screen grid place-items-center">
      <p className="absolute top-0 left-0 text-amber-50">gsapなし</p>
      <p
        ref={textRef}
        className="text-6xl font-bold text-amber-50 tracking-widest colorful-text"
      >
        Hello World
      </p>
    </div>
  );
}
