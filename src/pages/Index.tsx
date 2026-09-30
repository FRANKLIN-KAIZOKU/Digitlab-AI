import React from "react";

const Index = () => {
  return (
    <main className="min-h-screen bg-[#190019] text-[#FBE4D8]">
      {/* Navigation */}
      <header className="border-b border-[#522B5B]/50">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <a
            href="/"
            className="text-sm font-semibold tracking-[0.22em] text-[#FBE4D8]"
          >
            DIGITLAB<span className="text-[#DFB6B2]"> AI</span>
          </a>

          <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-[#DFB6B2] md:flex">
            <a
              href="/playground"
              className="transition-colors hover:text-[#FBE4D8]"
            >
              Playground
            </a>
            <a
              href="/model-lab"
              className="transition-colors hover:text-[#FBE4D8]"
            >
              Model Lab
            </a>
            <a
              href="/analytics"
              className="transition-colors hover:text-[#FBE4D8]"
            >
              Analytics
            </a>
          </nav>

          <div className="text-[10px] uppercase tracking-[0.18em] text-[#854F6C]">
            Neural Vision / 01
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-12 bg-[#854F6C]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#DFB6B2]">
              Digit recognition / MNIST / CNN
            </span>
          </div>

          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="mb-6 max-w-xl text-xs uppercase tracking-[0.24em] text-[#854F6C]">
                01 — See the machine see
              </p>

              <h1 className="max-w-5xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] md:text-7xl lg:text-[7.5rem]">
                SEE HOW A
                <br />
                NEURAL NETWORK
                <br />
                <span className="text-[#DFB6B2]">SEES HANDWRITING.</span>
              </h1>
            </div>

            <div className="max-w-md lg:pb-3">
              <p className="text-base leading-7 text-[#DFB6B2] md:text-lg">
                Draw a digit. Watch a convolutional neural network turn
                pixels into patterns, patterns into features, and features
                into a prediction.
              </p>

              <a
                href="/playground"
                className="mt-8 inline-flex items-center gap-4 border border-[#854F6C] px-6 py-4 text-[10px] uppercase tracking-[0.22em] transition-all hover:border-[#FBE4D8] hover:bg-[#2B124C]"
              >
                Open the playground
                <span className="text-lg">↗</span>
              </a>
            </div>
          </div>

          {/* Neural canvas */}
          <div className="mt-20 grid gap-0 border border-[#522B5B]/70 lg:grid-cols-[1fr_280px]">
            <div className="relative min-h-[420px] overflow-hidden bg-[#2B124C]/30 md:min-h-[540px]">
              {/* Grid */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(#522B5B 1px, transparent 1px), linear-gradient(90deg, #522B5B 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              {/* Digit-inspired SVG */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 400 400"
                  className="h-[260px] w-[260px] md:h-[360px] md:w-[360px]"
                  aria-label="Abstract handwritten digit visualization"
                >
                  <path
                    d="M120 120 C145 75 230 70 275 105 C325 145 300 205 250 225 C210 240 150 235 125 275 C105 310 135 340 190 342 C245 344 285 320 300 285"
                    fill="none"
                    stroke="#FBE4D8"
                    strokeLinecap="round"
                    strokeWidth="18"
                  />

                  <circle
                    cx="120"
                    cy="120"
                    r="5"
                    fill="#DFB6B2"
                  />
                  <circle
                    cx="300"
                    cy="285"
                    r="5"
                    fill="#DFB6B2"
                  />
                </svg>
              </div>

              <div className="absolute left-5 top-5 text-[9px] uppercase tracking-[0.2em] text-[#854F6C]">
                Input field / 28 × 28
              </div>

              <div className="absolute bottom-5 right-5 text-right text-[9px] uppercase tracking-[0.2em] text-[#854F6C]">
                <div>Pixel matrix</div>
                <div className="mt-1 text-[#DFB6B2]">784 values</div>
              </div>
            </div>

            {/* Technical rail */}
            <aside className="border-t border-[#522B5B]/70 lg:border-l lg:border-t-0">
              <div className="border-b border-[#522B5B]/70 p-6">
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#854F6C]">
                  System
                </div>
                <div className="mt-3 text-sm text-[#FBE4D8]">
                  Convolutional
                  <br />
                  Neural Network
                </div>
              </div>

              <div className="border-b border-[#522B5B]/70 p-6">
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#854F6C]">
                  Input
                </div>
                <div className="mt-3 font-mono text-2xl text-[#DFB6B2]">
                  28 × 28
                </div>
              </div>

              <div className="border-b border-[#522B5B]/70 p-6">
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#854F6C]">
                  Classes
                </div>
                <div className="mt-3 font-mono text-2xl text-[#DFB6B2]">
                  0 — 9
                </div>
              </div>

              <div className="p-6">
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#854F6C]">
                  Dataset
                </div>
                <div className="mt-3 text-sm text-[#DFB6B2]">
                  MNIST
                  <br />
                  handwritten digits
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-[#522B5B]/60">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-[0.35fr_0.65fr]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#854F6C]">
              02 — The idea
            </span>
          </div>

          <div>
            <h2 className="max-w-5xl text-4xl leading-[1] tracking-[-0.04em] md:text-6xl">
              FROM PIXELS
              <br />
              TO <span className="text-[#DFB6B2]">PATTERNS.</span>
            </h2>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-[#DFB6B2] md:text-base">
              DigitLab turns a normally invisible machine-learning process
              into something you can interact with. Explore what the network
              receives, what its layers detect, and why it arrives at a
              particular digit.
            </p>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="border-t border-[#522B5B]/60">
        <div className="mx-auto grid max-w-[1600px] md:grid-cols-3">
          <a
            href="/playground"
            className="group border-b border-[#522B5B]/60 p-8 transition-colors hover:bg-[#2B124C] md:border-b-0 md:border-r md:p-10"
          >
            <span className="text-[10px] tracking-[0.2em] text-[#854F6C]">
              01
            </span>
            <h3 className="mt-16 text-3xl tracking-[-0.03em]">
              DRAW
              <br />
              A DIGIT.
            </h3>
            <p className="mt-6 text-sm leading-6 text-[#DFB6B2]">
              Put your own handwriting through the network.
            </p>
            <div className="mt-12 text-xl text-[#DFB6B2] transition-transform group-hover:translate-x-2">
              →
            </div>
          </a>

          <a
            href="/model-lab"
            className="group border-b border-[#522B5B]/60 p-8 transition-colors hover:bg-[#2B124C] md:border-b-0 md:border-r md:p-10"
          >
            <span className="text-[10px] tracking-[0.2em] text-[#854F6C]">
              02
            </span>
            <h3 className="mt-16 text-3xl tracking-[-0.03em]">
              OPEN
              <br />
              THE BLACK BOX.
            </h3>
            <p className="mt-6 text-sm leading-6 text-[#DFB6B2]">
              Explore the architecture behind the prediction.
            </p>
            <div className="mt-12 text-xl text-[#DFB6B2] transition-transform group-hover:translate-x-2">
              →
            </div>
          </a>

          <a
            href="/analytics"
            className="group p-8 transition-colors hover:bg-[#2B124C] md:p-10"
          >
            <span className="text-[10px] tracking-[0.2em] text-[#854F6C]">
              03
            </span>
            <h3 className="mt-16 text-3xl tracking-[-0.03em]">
              MEASURE
              <br />
              WHAT IT LEARNS.
            </h3>
            <p className="mt-6 text-sm leading-6 text-[#DFB6B2]">
              Understand performance, errors, and model behavior.
            </p>
            <div className="mt-12 text-xl text-[#DFB6B2] transition-transform group-hover:translate-x-2">
              →
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#522B5B]/60">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-6 px-6 py-8 text-[9px] uppercase tracking-[0.2em] text-[#854F6C] md:flex-row md:px-10">
          <span>DigitLab AI / Major Project</span>
          <span>MNIST / CNN / Computer Vision</span>
          <span>0 — 9</span>
        </div>
      </footer>
    </main>
  );
};

export default Index;