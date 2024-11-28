export default function Title() {
  return (
    <div className="text-center pb-10">
      <h1
        className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle font-semibold text-transparent text-5xl"
        data-aos="fade-up"
      >
        Your Ultimate Robotaxi Charging Solution
      </h1>
      <div className="mx-auto max-w-3xl">
        <p
          className="mb-8 text-xl text-indigo-200/65"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          Optimize your fleet's energy consumption and reduce costs with our
          algorithm-powered charging solution.
        </p>
        <div className="mx-auto max-w-xs flex max-w-none justify-center">
          <div data-aos="fade-up" data-aos-delay={400}>
            <a
              className="btn group mb-4 w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] mb-0 w-auto"
              href="init"
            >
              Start Building
              <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                -&gt;
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
