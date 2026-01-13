export default function Hero() {
  return (
    <section className="hero bg-amber-500">
      <div className="sticky top-0 h-screen pb-4 max-w-7xl w-11/12 mx-auto grid content-between">
        <h1 className="uppercase text-[18vw] text-center font-bold text-white">
          Training
        </h1>
        <div className="grid gap-8 grid-flow-col items-end">
          <p className="max-w-3/4 text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
          </p>
          <div className="flex gap-8 text-sm">
            <button className="rounded-full border px-8 py-2">
              Contact Us
            </button>
            <button>Status</button>
          </div>
        </div>
      </div>
      <div className="h-screen mb-[-100vh]"></div>
    </section>
  );
}
