import gsap from "gsap";
import { useRef, useState } from "react";

export default function Site2() {
  const [isOpen, setIsOpen] = useState(false);
  const cardDescriptionRef = useRef<HTMLParagraphElement>(null);
  const handleClick = () => {
    if (!cardDescriptionRef.current) return;
    setIsOpen(!isOpen);
    if (isOpen) {
      gsap.to(cardDescriptionRef.current, {
        height: 0,
        duration: 0.3,
        ease: "none",
      });
    } else {
      gsap.to(cardDescriptionRef.current, {
        height: "auto",
        duration: 0.3,
        ease: "none",
      });
    }
  };
  return (
    <div className="bg-gray-600 h-screen">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] px-8 place-items-center h-full">
        <article className="card relative bg-amber-50 p-8">
          <div className="card-content flex flex-col">
            <h2 className="card-title text-2xl font-bold">Card Title</h2>
            <p
              ref={cardDescriptionRef}
              className="card-description mt-2 h-0 overflow-hidden"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
              enim magnam atque, quasi maxime beatae quidem voluptates odio sit
              repellendus aliquam dicta non id ad eligendi. Sapiente iste aut
              corporis! Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Veniam natus dolores dicta sint odio totam corporis. Deserunt
              possimus alias qui maiores repellat magni voluptates explicabo?
              Quae maxime suscipit distinctio nobis!
            </p>
          </div>
          <button
            onClick={handleClick}
            className="absolute -bottom-8 inset-x-0 mx-auto bg-amber-700 p-4 rounded-full w-max"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-6 text-white transition-transform duration-300 ${
                isOpen ? "" : "rotate-180"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </article>
      </div>
    </div>
  );
}
