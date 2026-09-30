import { Link } from "react-router-dom";

const ModelLab = () => {
  return (
    <div className="min-h-screen bg-plum py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fadeInUp">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-mauve">
            MODEL LAB / 04
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-warmCream md:text-7xl">
            OPEN THE BLACK BOX.
          </h1>
        </div>

        <div className="space-y-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 animate-fadeInUp">
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
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-1 w-1 rounded-full bg-dustyRose/30"></div>
                      <span className="text-sm font-mono uppercase tracking-widest text-dustyRose/50">
                        Input Layer
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-1 w-1 rounded-full bg-dustyRose/30"></div>
                      <span className="text-sm font-mono uppercase tracking-widest text-dustyRose/50">
                        Conv Layer 1
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-1 w-1 rounded-full bg-dustyRose/30"></div>
                      <span className="text-sm font-mono uppercase tracking-widest text-dustyRose/50">
                        Conv Layer 2
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-1 w-1 rounded-full bg-dustyRose/30"></div>
                      <span className="text-sm font-mono uppercase tracking-widest text-dustyRose/50">
                        FC Layer
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-1 w-1 rounded-full bg-dustyRose/30"></div>
                      <span className="text-sm font-mono uppercase tracking-widest text-dustyRose/50">
                        Output Layer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-bold tracking-tight text-warmCream md:text-5xl">
                CNN ARCHITECTURE
              </h2>
              <p className="mt-6 max-w-md text-lg font-light text-dustyRose">
                Explore the convolutional neural network architecture used for
                handwritten digit recognition. Visualize each layer's function,
                from input processing to final classification.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-emerald/20"></div>
                  <span className="text-sm font-mono uppercase tracking-widest text-dustyRose">
                    784 INPUT NEURONS
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-emerald/20"></div>
                  <span className="text-sm font-mono uppercase tracking-widest text-dustyRose">
                    32 FILTERS (3x3)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-emerald/20"></div>
                  <span className="text-sm font-mono uppercase tracking-widest text-dustyRose">
                    64 FILTERS (3x3)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-emerald/20"></div>
                  <span className="text-sm font-mono uppercase tracking-widest text-dustyRose">
                    128 FC NEURONS
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-emerald/20"></div>
                  <span className="text-sm font-mono uppercase tracking-widest text-dustyRose">
                    10 OUTPUT CLASSES
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 animate-fadeInUp">
            <h2 className="text-4xl font-bold tracking-tight text-warmCream md:text-5xl">
              FEATURE VISUALIZATION
            </h2>
            <p className="mt-4 text-lg font-light text-dustyRose">
              Understand how the network detects patterns through feature maps
              and activation patterns across different layers.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { label: "Edge Detection", desc: "First layer detects simple gradients and edges" },
                { label: "Texture Patterns", desc: "Mid layers identify curves, loops, and intersections" },
                { label: "Digit Parts", desc: "Later layers recognize strokes and partial digit components" },
                { label: "Complete Digits", desc: "Final layers assemble features into complete digit recognition" },
              ].map((item, index) => (
                <div key={index} className="rounded-sm border border-[rgba(82,43,91,0.3)] bg-deepPurple p-6">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-mauve">{item.label}</h3>
                  <p className="mt-2 text-sm text-dustyRose">{item.desc}</p>
                  <div className="mt-4 h-16 w-full rounded-sm border border-[rgba(251,228,216,0.1)] bg-plum">
                    <div className="flex h-full items-center justify-center text-xs font-mono text-dustyRose/50">
                      Feature Map Visualization
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 animate-fadeInUp">
            <h2 className="text-4xl font-bold tracking-tight text-warmCream md:text-5xl">
              MODEL COMPARISON
            </h2>
            <p className="mt-4 text-lg font-light text-dustyRose">
              Compare different architectures to understand trade-offs in accuracy,
              speed, and complexity for handwritten digit recognition tasks.
            </p>
            <div className="mt-8 space-y-6">
              {[
                {
                  name: "LeNet-5",
                  params: "60K",
                  accuracy: "98.4%",
                  desc: "Classic CNN architecture, efficient and interpretable"
                },
                {
                  name: "Simple CNN",
                  params: "1.2M",
                  accuracy: "99.1%",
                  desc: "Modern architecture with batch normalization and dropout"
                },
                {
                  name: "MLP Baseline",
                  params: "260K",
                  accuracy: "97.8%",
                  desc: "Fully connected network for comparison"
                }
              ].map((model, index) => (
  <div
    key={index}
    className="rounded-sm border border-[rgba(82,43,91,0.3)] bg-deepPurple p-6"
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-sm font-mono uppercase tracking-widest text-warmCream">
        {model.name}
      </h3>

      <span className="text-xs font-mono text-dustyRose/50">
        {model.params} params
      </span>
    </div>

    <p className="mt-2 text-sm text-dustyRose">
      {model.desc}
    </p>

    <div className="mt-4 flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 rounded-full bg-emerald/20"></div>

        <span className="text-xs font-mono uppercase tracking-widest text-dustyRose">
          Accuracy
        </span>
      </div>

      <span className="text-2xl font-bold text-warmCream">
        {model.accuracy}
      </span>
            </div>
      </div>
    ))}
  </div>
</div>
</div>

export default ModelLab;