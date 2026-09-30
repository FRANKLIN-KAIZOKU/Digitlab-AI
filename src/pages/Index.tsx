import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-plum">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-8 py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(82,43,91,0.3),transparent_70%)]"></div>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(251,228,216,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(251,228,216,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Label */}
          <div className="mb-8 text-xs font-mono uppercase tracking-[0.3em] text-dustyRose animate-fadeInUp">
            AI VISION LABORATORY / 01
          </div>

          {/* Main Typography */}
          <h1 className="max-w-5xl text-6xl font-bold leading-none tracking-tight text-warmCream md:text-8xl lg:text-9xl animate-fadeInUp">
            <span className="block">SEE HOW A</span>
            <span className="block text-dustyRose">NEURAL NETWORK</span>
            <span className="block">SEES HANDWRITING.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 max-w-xl text-center text-lg font-light text-dustyRose md:text-xl animate-fadeInUp">
            Draw a digit. Watch pixels become patterns, features and predictions.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 animate-fadeInUp">
            <Link
                          to="/playground"
                          className="group flex items-center space-x-2 rounded-sm bg-warmCream px-8 py-4 text-plum transition-all duration-300 hover:bg-dustyRose hover:text-plum"
                        >
                          <span className="text-sm font-bold uppercase tracking-wider">
                            ENTER PLAYGROUND
                          </span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                          to="/model-lab"
                          className="text-sm font-medium uppercase tracking-wider text-dustyRose transition-colors hover:text-warmCream"
                        >
                          EXPLORE THE MODEL
                        </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 flex flex-col items-center space-y-2 text-dustyRose animate-fadeInUp">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-mauve to-transparent"></div>

      {/* Preview Section */}
      <section className="flex flex-col items-center justify-center px-8 py-32">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 animate-fadeInUp">
            <div className="flex flex-col justify-center">
              <span className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-mauve">
                YOUR INPUT / 02
              </span>
              <h2 className="text-5xl font-bold tracking-tight text-warmCream md:text-7xl">
                DRAW SOMETHING.
              </h2>
              <p className="mt-6 max-w-md text-lg font-light text-dustyRose">
                The canvas uses a subtle grid texture on deep plum surfaces.
                Your strokes appear in warm cream, creating an immediate
                connection between input and output.
              </p>
              <Link
                              to="/playground"
                              className="mt-8 inline-flex items-center space-x-2 text-sm font-medium uppercase tracking-wider text-dustyRose transition-colors hover:text-warmCream"
                            >
                              <span>Open the playground</span>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-80 w-full overflow-hidden rounded-sm border border-[rgba(82,43,91,0.3)] bg-deepPurple p-8">
                <div className="absolute inset-0 opacity-20">
                  <div className="h-full w-full" style={{
                    backgroundImage: `linear-gradient(rgba(251,228,216,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(251,228,216,0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
                <div className="relative z-10 flex h-full items-center justify-center">
                  <span className="text-sm font-mono uppercase tracking-widest text-dustyRose/50">
                    Drawing Canvas Preview
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-mauve to-transparent"></div>

      {/* From Pixels to Patterns Section */}
      <section className="flex flex-col items-center justify-center px-8 py-32">
        <div className="max-w-6xl">
          <div className="text-center animate-fadeInUp">
            <span className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-mauve">
              THE PROCESS / 03
            </span>
            <h2 className="text-5xl font-bold tracking-tight text-warmCream md:text-7xl">
              FROM PIXELS TO PATTERNS.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4 animate-fadeInUp">
            {[
              { label: "28 × 28", desc: "Input Grid" },
              { label: "CONVOLUTION", desc: "Feature Detection" },
              { label: "FEATURES", desc: "Pattern Extraction" },
              { label: "CLASSIFICATION", desc: "Prediction" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 h-12 w-12 rounded-full border border-mauve/30 flex items-center justify-center">
                  <span className="text-sm font-mono text-mauve">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-warmCream">{item.label}</h3>
                <p className="mt-2 text-sm text-dustyRose">{item.desc}</p>
                {index < 3 && (
                  <div className="mt-4 hidden md:block">
                    <ChevronDown className="h-4 w-4 text-mauve" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Lab Preview */}
      <section className="flex flex-col items-center justify-center px-8 py-32">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 animate-fadeInUp">
            <div className="flex items-center justify-center">
              <div className="relative h-96 w-full overflow-hidden rounded-sm border border-[rgba(82,43,91,0.3)] bg-deepPurple p-8">
                <div className="absolute inset-0 opacity-20">
                  <div className="h-full w-full" style={{
                    backgroundImage: `linear-gradient(rgba(251,228,216,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(251,228,216,0.1) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                <div className="relative z-10 flex h-full flex-col items-center justify-center">
                  <span className="text-sm font-mono uppercase tracking-widest text-dustyRose/50">
                    Architectural Visualization
                  </span>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 w-16 rounded-sm border border-mauve/20 bg-purple/30"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-mauve">
                MODEL LAB / 04
              </span>
              <h2 className="text-5xl font-bold tracking-tight text-warmCream md:text-7xl">
                OPEN THE BLACK BOX.
              </h2>
              <p className="mt-6 max-w-md text-lg font-light text-dustyRose">
                Explore CNN architecture, MLP comparisons, feature maps, activations,
                and model explanations in an interactive laboratory environment.
              </p>
              <Link
                href="/model-lab"
                className="mt-8 inline-flex items-center space-x-2 text-sm font-medium uppercase tracking-wider text-dustyRose transition-colors hover:text-warmCream"
              >
                <span>Enter Model Lab</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="flex flex-col items-center justify-center px-8 py-32">
        <div className="max-w-6xl">
          <div className="text-center animate-fadeInUp">
            <span className="mb-4 text-xs font-mono uppercase tracking-[0.3em] text-mauve">
              ANALYTICS / 05
            </span>
            <h2 className="text-5xl font-bold tracking-tight text-warmCream md:text-7xl">
              MEASURE WHAT THE MODEL LEARNS.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 animate-fadeInUp">
            {[
              { label: "Accuracy", value: "—" },
              { label: "Loss", value: "—" },
              { label: "Confusion Matrix", value: "—" },
            ].map((item, index) => (
              <div key={index} className="rounded-sm border border-[rgba(82,43,91,0.3)] bg-deepPurple p-8">
                <h3 className="text-sm font-mono uppercase tracking-widest text-mauve">{item.label}</h3>
                <p className="mt-4 text-4xl font-bold text-warmCream">{item.value}</p>
                <p className="mt-2 text-sm text-dustyRose">Dataset statistics unavailable</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(82,43,91,0.3)] px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-mono uppercase tracking-widest text-dustyRose">DIGITLAB AI</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-dustyRose">
            <Link href="/playground" className="hover:text-warmCream transition-colors">Playground</Link>
            <Link href="/model-lab" className="hover:text-warmCream transition-colors">Model Lab</Link>
            <Link href="/analytics" className="hover:text-warmCream transition-colors">Analytics</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;