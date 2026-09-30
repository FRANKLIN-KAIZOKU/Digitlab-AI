import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const PlaceholderPage = ({
  title,
  number,
}: {
  title: string;
  number: string;
}) => {
  return (
    <main className="min-h-screen bg-[#190019] px-6 py-10 text-[#FBE4D8] md:px-10 md:py-16">
      <header className="flex items-center justify-between border-b border-[#522B5B]/60 pb-5">
        <a
          href="/"
          className="text-sm font-semibold tracking-[0.22em]"
        >
          DIGITLAB<span className="text-[#DFB6B2]"> AI</span>
        </a>

        <a
          href="/"
          className="text-[10px] uppercase tracking-[0.2em] text-[#DFB6B2]"
        >
          ← Back home
        </a>
      </header>

      <section className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center">
        <p className="mb-6 text-[10px] uppercase tracking-[0.25em] text-[#854F6C]">
          {number} — DigitLab AI
        </p>

        <h1 className="text-6xl tracking-[-0.05em] md:text-8xl">
          {title}
        </h1>

        <p className="mt-8 max-w-xl text-sm leading-7 text-[#DFB6B2]">
          This section is being built. The underlying machine-learning
          system will be connected here after the interface is stabilized.
        </p>
      </section>
    </main>
  );
};

const Playground = () => (
  <PlaceholderPage title="PLAYGROUND" number="02" />
);

const ModelLab = () => (
  <PlaceholderPage title="MODEL LAB" number="03" />
);

const Analytics = () => (
  <PlaceholderPage title="ANALYTICS" number="04" />
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />

        <Route path="/playground" element={<Playground />} />

        <Route path="/model-lab" element={<ModelLab />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;