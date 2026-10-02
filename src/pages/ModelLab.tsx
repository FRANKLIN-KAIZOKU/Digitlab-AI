import { Link } from "react-router-dom";

const models = [
  {
    version: "V1",
    accuracy: "98.13%",
    label: "BASELINE",
    description: "Initial CNN trained directly on MNIST.",
    preprocessing: "Grayscale → 28×28 → Normalize",
    augmentation: "None",
  },
  {
    version: "V2",
    accuracy: "96.15%",
    label: "AUGMENTED",
    description: "Stronger augmentation for handwriting variation.",
    preprocessing: "Grayscale → 28×28 → Normalize",
    augmentation: "Rotation + Translation + Zoom",
  },
  {
    version: "V3",
    accuracy: "98.56%",
    label: "REFINED",
    description: "Gentler augmentation with a more stable training pipeline.",
    preprocessing: "Grayscale → 28×28 → Normalize",
    augmentation: "Gentle Rotation + Translation + Zoom",
  },
  {
    version: "V4",
    accuracy: "98.07%",
    label: "CURRENT CANDIDATE",
    description: "Representation-focused pipeline designed for natural handwriting.",
    preprocessing: "Crop → Square → Padding → 28×28",
    augmentation: "None",
  },
];

export default function ModelLab() {
  return (
    <main className="min-h-screen bg-[#190019] text-[#FBE4D8]">
      <nav className="flex items-center justify-between border-b border-[#522B5B] px-6 py-5 md:px-10">
        <Link
          to="/"
          className="text-sm font-semibold tracking-[0.25em]"
        >
          DIGITLAB AI
        </Link>

        <div className="flex gap-6 text-xs uppercase tracking-[0.18em] text-[#DFB6B2]">
          <Link to="/playground" className="hover:text-[#FBE4D8]">
            Playground
          </Link>
          <Link to="/model-lab" className="text-[#FBE4D8]">
            Model Lab
          </Link>
          <Link to="/analytics" className="hover:text-[#FBE4D8]">
            Analytics
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#854F6C]">
            MODEL LAB / EXPERIMENT LOG
          </p>

          <h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">
            HOW DIGITLAB
            <br />
            LEARNED TO SEE.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-[#DFB6B2] md:text-lg">
            Four experiments. One problem. A progressively refined vision
            pipeline built to recognize handwritten digits.
          </p>
        </div>

        <div className="mt-20 grid gap-px border border-[#522B5B] bg-[#522B5B] md:grid-cols-4">
          {models.map((model) => (
            <div
              key={model.version}
              className="bg-[#190019] p-6 md:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm tracking-[0.2em] text-[#854F6C]">
                  {model.version}
                </span>

                {model.version === "V4" && (
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#DFB6B2]">
                    Current
                  </span>
                )}
              </div>

              <div className="mt-12 text-4xl font-medium tracking-[-0.03em]">
                {model.accuracy}
              </div>

              <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#854F6C]">
                {model.label}
              </div>

              <p className="mt-6 min-h-16 text-sm leading-6 text-[#DFB6B2]">
                {model.description}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-24">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-[#854F6C]">
              EVOLUTION
            </p>

            <h2 className="mt-3 text-3xl tracking-[-0.03em] md:text-5xl">
              Four approaches to the same problem.
            </h2>
          </div>

          <div className="space-y-0 border-t border-[#522B5B]">
            {models.map((model, index) => (
              <div
                key={model.version}
                className="grid gap-6 border-b border-[#522B5B] py-8 md:grid-cols-[120px_1fr_1fr]"
              >
                <div className="text-sm tracking-[0.2em] text-[#854F6C]">
                  {model.version}
                </div>

                <div>
                  <h3 className="text-xl">{model.label}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-[#DFB6B2]">
                    {model.description}
                  </p>
                </div>

                <div className="text-sm leading-6 text-[#DFB6B2]">
                  <p>
                    <span className="text-[#854F6C]">PREPROCESSING</span>
                    <br />
                    {model.preprocessing}
                  </p>

                  <p className="mt-4">
                    <span className="text-[#854F6C]">AUGMENTATION</span>
                    <br />
                    {model.augmentation}
                  </p>
                </div>

                {index < models.length - 1 && (
                  <div className="hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 border border-[#522B5B] p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#854F6C]">
            CURRENT CANDIDATE / V4
          </p>

          <div className="mt-8 grid gap-12 md:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="text-7xl font-medium tracking-[-0.05em] md:text-8xl">
                98.07%
              </div>

              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#854F6C]">
                TEST ACCURACY
              </p>

              <p className="mt-8 max-w-xl text-base leading-7 text-[#DFB6B2]">
                V4 changes the representation rather than simply increasing
                augmentation. The input is cropped around the foreground,
                converted into a square canvas, padded, and resized before
                entering the CNN.
              </p>
            </div>

            <div className="border-l border-[#522B5B] pl-8">
              <div className="space-y-6 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#854F6C]">
                    ARCHITECTURE
                  </p>
                  <p className="mt-2 text-[#DFB6B2]">
                    Conv2D → Pool → Conv2D → Pool
                    <br />
                    → Flatten → Dense → Dropout → Softmax
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#854F6C]">
                    INPUT
                  </p>
                  <p className="mt-2 text-[#DFB6B2]">
                    28 × 28 × 1
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#854F6C]">
                    CLASSES
                  </p>
                  <p className="mt-2 text-[#DFB6B2]">
                    10 digits / 0–9
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#854F6C]">
                    OPTIMIZER
                  </p>
                  <p className="mt-2 text-[#DFB6B2]">
                    Adam
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#854F6C]">
                    LOSS
                  </p>
                  <p className="mt-2 text-[#DFB6B2]">
                    Sparse Categorical Crossentropy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[#854F6C]">
            WHY V4?
          </p>

          <h2 className="mt-4 text-3xl tracking-[-0.03em] md:text-5xl">
            The problem wasn't always the model.
          </h2>

          <p className="mt-8 text-base leading-8 text-[#DFB6B2] md:text-lg">
            Early experiments showed that a CNN could perform extremely well
            on MNIST while behaving differently on some naturally drawn
            canvas inputs. V4 addresses that gap by making the representation
            used during training match the representation used during
            inference.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.15em]">
            {[
              "RAW INPUT",
              "FOREGROUND",
              "CROP",
              "SQUARE",
              "15% PADDING",
              "28×28",
              "CNN",
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="border border-[#522B5B] px-4 py-3">
                  {step}
                </span>

                {index < 6 && (
                  <span className="text-[#854F6C]">→</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}