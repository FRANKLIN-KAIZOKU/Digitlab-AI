const Analytics = () => {
  return (
    <div className="min-h-screen bg-plum py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fadeInUp">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-mauve">
            ANALYTICS / 05
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-warmCream md:text-7xl">
            MEASURE WHAT THE MODEL LEARNS.
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { label: "Accuracy", description: "Model accuracy on test dataset" },
            { label: "Loss", description: "Training and validation loss over epochs" },
            { label: "Confusion Matrix", description: "Classification performance across digits" },
            { label: "Dataset Statistics", description: "Training set size, digit distribution" },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-sm border border-[rgba(82,43,91,0.3)] bg-deepPurple p-8 animate-fadeInUp"
            >
              <h3 className="text-sm font-mono uppercase tracking-widest text-mauve">{item.label}</h3>
              <p className="mt-4 text-sm text-dustyRose">{item.description}</p>
              <div className="mt-6 rounded-sm border border-[rgba(251,228,216,0.1)] bg-plum p-4">
                <p className="text-3xl font-bold text-warmCream">—</p>
                <p className="text-xs font-mono uppercase tracking-widest text-dustyRose/50">
                  Data unavailable until model is connected
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;