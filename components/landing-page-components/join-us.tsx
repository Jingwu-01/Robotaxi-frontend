import Image from "next/image";
import BlurredShapePurple from "@/public/images/blurred-shape.svg";

// join us component for landing page
export default function JoinUs() {
  return (
    <section className="relative overflow-hidden">
      {/* Blurred shape */}
      <div
        className="absolute bottom-0 left-1/2 -z-10 -mb-24 ml-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShapePurple}
          width={760}
          height={668}
          alt="Blurred purple shape"
        />
      </div>
      
      {/* Join us section */}
      <div className="mx-auto px-6">
        <div className="bg-gradient-to-r from-transparent via-gray-800/50 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-8 font-nacelle text-4xl font-semibold text-transparent"
              data-aos="fade-up"
            >
              Join Us Today
            </h2>
            
            <div className="mx-auto flex justify-center">
              <div data-aos="fade-up" data-aos-delay={400}>
                <a
                  className="btn group w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] mb-0 w-auto"
                  href="initialization"
                >
                  <span className="relative inline-flex items-center">
                    Start Building
                    <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}