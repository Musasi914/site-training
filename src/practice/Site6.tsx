import { useEffect, useRef } from "react";

export default function Site6() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const divs: HTMLDivElement[] = [];
    for (let i = 0; i < 20; i++) {
      const div = document.createElement("div");
      div.style.width = `${Math.random() * 400}px`;
      div.style.height = `${Math.random() * 80}px`;
      div.style.position = "absolute";
      div.style.top = `${Math.random() * 100}%`;
      div.style.left = `${Math.random() * 100}%`;
      div.style.backgroundImage = `url('/bg/bg1.webp')`;
      div.style.backgroundAttachment = "fixed";
      div.style.backgroundSize = "cover";
      div.style.backgroundPosition = "bottom";
      div.style.backgroundRepeat = "no-repeat";
      containerRef.current?.appendChild(div);
      divs.push(div);
    }

    setInterval(() => {
      divs.forEach((div) => {
        div.style.top = `${Math.random() * 100}%`;
        div.style.left = `${Math.random() * 100}%`;
        div.style.width = `${Math.random() * 400}px`;
        div.style.height = `${Math.random() * 80}px`;
        div.style.backgroundPosition = `${Math.random() * 100}% ${
          Math.random() * 100
        }%`;
        div.style.backgroundSize = `${Math.random() * 100}% ${
          Math.random() * 100
        }%`;
      });
    }, 100);
  }, []);
  return (
    <main className="w-full h-screen bg-[url('/bg/bg1.webp')] bg-cover bg-bottom">
      <div
        className="w-full absolute inset-0 overflow-hidden"
        ref={containerRef}
      ></div>
    </main>
  );
}
