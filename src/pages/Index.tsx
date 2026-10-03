import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main className="min-h-screen bg-[#190019] text-[#FBE4D8] overflow-hidden">
      {/* HEADER */}
      <header className="px-8 pt-7 md:px-12 lg:px-16">
        <div className="flex items-center justify-between border-b border-[#854F6C]/40 pb-5">
          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[#FBE4D8]"
          >
            DIGITLAB AI
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/playground"
              className="text-[10px] uppercase tracking-[0.22em] text-[#DFB6B2] transition hover:text-[#FBE4D8]"
            >
              Playground
            </Link>

            <Link
              to="/model-lab"
              className="text-[10px] uppercase tracking-[0.22em] text-[#DFB6B2] transition hover:text-[#FBE4D8]"
            >
              Model Lab
            </Link>

            <Link
              to="/analytics"
              className="text-[10px] uppercase tracking-[0.22em] text-[#DFB6B2] transition hover:text-[#FBE4D8]"
            >
              Analytics
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-8 pb-20 pt-20 md:px-12 md:pt-28 lg:px-16 lg:pt-32">
        {/* atmospheric shapes */}
        <div className="pointer-events-none absolute -right-40 top-10 h-[600px] w-[600px] rounded-full bg-[#522B5B]/20 blur-[140px]" />

        <div className="pointer-events-none absolute right-[18%] top-[38%] h-[260px] w-[260px] rounded-full bg-[#854F6C]/10 blur-[100px]" />

        <div className="relative z-10 max-w-[1250px]">
          <p className="mb-8 text-[10px] uppercase tracking-[0.32em] text-[#854F6C]">
            / AI VISION / HANDWRITING RECOGNITION
          </p>

          <h1
            className="
              max-w-[1200px]
              text-[clamp(56px,8.5vw,138px)]
              font-extrabold
              uppercase
              leading-[0.84]
              tracking-[-0.065em]
            "
          >
            SEE HOW A
            <br />
            NEURAL NETWORK
            <br />
            SEES HANDWRITING.
          </h1>

          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center">
            <Link
              to="/playground"
              className="
                group
                inline-flex
                h-16
                w-full
                max-w-[380px]
                items-center
                justify-between
                border
                border-[#DFB6B2]/60
                px-7
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                transition
                duration-300
                hover:bg-[#DFB6B2]
                hover:text-[#190019]
                md:w-[380px]
              "
            >
              <span>Open the Playground</span>

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <span className="text-[10px] uppercase tracking-[0.2em] text-[#854F6C]">
              Draw a digit. Watch the network think.
            </span>
          </div>
        </div>
      </section>

      {/* PROJECT SIGNALS */}
      <section className="px-8 pb-8 md:px-12 lg:px-16">
        <div className="border-t border-[#854F6C]/40 pt-7">
          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-0">
            <div className="md:border-r md:border-[#854F6C]/30 md:pr-8">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#854F6C]">
                Model
              </p>

              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em]">
                Convolutional CNN
              </p>
            </div>

            <div className="md:border-r md:border-[#854F6C]/30 md:px-8">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#854F6C]">
                Dataset
              </p>

              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em]">
                MNIST / 10 Classes
              </p>
            </div>

            <div className="md:border-r md:border-[#854F6C]/30 md:px-8">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#854F6C]">
                Current Model
              </p>

              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em]">
                V4 / 98.07%
              </p>
            </div>

            <div className="md:pl-8">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#854F6C]">
                Live Inference
              </p>

              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em]">
                Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER DETAIL */}
      <div className="pointer-events-none absolute bottom-5 right-8 hidden text-[9px] uppercase tracking-[0.25em] text-[#522B5B] md:block">
        FRANKLIN K / AI SYSTEMS / 2026
      </div>
    </main>
  );
};

export default Index;