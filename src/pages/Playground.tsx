import SiteHeader from "@/components/SiteHeader";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://digitlab-ai-1qlc.onrender.com";

type PredictionResponse = {
  success: boolean;
  digit: number;
  confidence: number;
  confidence_percent: number;
  probabilities: Record<string, number>;
};

export default function Playground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  const [prediction, setPrediction] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [probabilities, setProbabilities] = useState<Record<
    string,
    number
  > | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Important:
    // Match the dark/light representation expected by our API preprocessing.
    ctx.fillStyle = "#190019";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#FBE4D8";
    ctx.lineWidth = 22;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPosition = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const startDrawing = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const position = getPosition(event);

    if (!position) return;

    canvas.setPointerCapture(event.pointerId);

    setIsDrawing(true);
    setHasDrawing(true);
    setError("");

    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
  };

  const draw = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const position = getPosition(event);

    if (!position) return;

    ctx.lineTo(position.x, position.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    ctx.fillStyle = "#190019";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#FBE4D8";
    ctx.lineWidth = 22;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    setHasDrawing(false);
    setPrediction(null);
    setConfidence(null);
    setProbabilities(null);
    setError("");
    setUploadedFile(null);
    setUploadedPreview(null);
  };

    const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    setUploadedFile(file);
    setUploadedPreview(URL.createObjectURL(file));
    setError("");
    setPrediction(null);
    setConfidence(null);
    setProbabilities(null);
  };

  const predictUploadedImage = async () => {
    if (!uploadedFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append(
        "file",
        uploadedFile,
        uploadedFile.name
      );

      const response = await fetch(
        `${API_URL}/predict-v4`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Prediction request failed (${response.status})`
        );
      }

      const data: PredictionResponse =
        await response.json();

      if (!data.success) {
        throw new Error("Prediction failed.");
      }

      setPrediction(data.digit);
      setConfidence(data.confidence_percent);
      setProbabilities(data.probabilities);
    } catch (err) {
      console.error(err);

      setError(
        "Could not analyze the uploaded image. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };


  const predictDigit = async () => {
    const canvas = canvasRef.current;

    if (!canvas || !hasDrawing) {
      setError("Draw a digit first.");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, "image/png");
      });

      if (!blob) {
        throw new Error("Could not create image from canvas.");
      }

      const formData = new FormData();

      formData.append(
        "file",
        blob,
        "handwritten-digit.png"
      );

      const response = await fetch(
        `${API_URL}/predict-v4`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Prediction request failed (${response.status})`
        );
      }

      const data: PredictionResponse =
        await response.json();

      if (!data.success) {
        throw new Error("Prediction failed.");
      }

      setPrediction(data.digit);
      setConfidence(data.confidence_percent);
      setProbabilities(data.probabilities);
    } catch (err) {
      console.error(err);

      setError(
        "Could not connect to the AI backend. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#190019] text-[#FBE4D8]">
      
      <SiteHeader />

      {/* HEADER */}
      <section className="px-8 pb-10 pt-16 md:px-16">
        <div className="max-w-6xl">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#DFB6B2]">
            LIVE INFERENCE / CNN
          </p>

          <h1 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-7xl">
            DRAW A DIGIT.
            <br />
            LET THE NETWORK
            <br />
            <span className="text-[#DFB6B2]">
              SEE IT.
            </span>
          </h1>
        </div>
      </section>

      {/* PLAYGROUND */}
      <section className="px-8 pb-20 md:px-16">
        <div className="grid max-w-6xl gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          {/* DRAWING AREA */}
          <div className="border border-[#854F6C]/40 bg-[#2B124C]/20">
            <div className="flex items-center justify-between border-b border-[#854F6C]/30 px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#DFB6B2]">
                  INPUT FIELD
                </p>

                <p className="mt-1 text-sm text-[#FBE4D8]/60">
                  Draw one handwritten digit from 0–9
                </p>
              </div>

              <button
                onClick={clearCanvas}
                className="text-[10px] uppercase tracking-[0.2em] text-[#DFB6B2] transition hover:text-[#FBE4D8]"
              >
                Clear
              </button>
            </div>

            <div className="p-5 md:p-8">
              <canvas
                ref={canvasRef}
                width={560}
                height={560}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerCancel={stopDrawing}
                onPointerLeave={stopDrawing}
                className="block w-full touch-none cursor-crosshair border border-[#854F6C]/40"
              />

              <button
                onClick={predictDigit}
                disabled={!hasDrawing || isAnalyzing}
                className="mt-5 w-full border border-[#DFB6B2] bg-[#DFB6B2] px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#190019] transition hover:bg-[#FBE4D8] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isAnalyzing
                  ? "Analyzing..."
                  : "Run Neural Network"}
              </button>

                            {/* IMAGE UPLOAD */}
              <div className="mt-8 border-t border-[#854F6C]/30 pt-7">
                <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-[#DFB6B2]">
                  OR UPLOAD AN IMAGE
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (file) {
                      handleImageUpload(file);
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex min-h-[150px] w-full flex-col items-center justify-center border border-dashed border-[#854F6C]/60 bg-[#2B124C]/20 px-6 py-6 text-center transition hover:border-[#DFB6B2]"
                >
                  {uploadedPreview ? (
                    <>
                      <img
                        src={uploadedPreview}
                        alt="Uploaded handwritten digit"
                        className="mb-4 max-h-24 max-w-full object-contain"
                      />

                      <span className="text-[10px] uppercase tracking-[0.15em] text-[#DFB6B2]">
                        Image selected — click to change
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="mb-2 text-2xl text-[#DFB6B2]">
                        ↑
                      </span>

                      <span className="text-xs uppercase tracking-[0.15em] text-[#FBE4D8]">
                        Choose an image
                      </span>

                      <span className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[#854F6C]">
                        PNG / JPG / WEBP
                      </span>
                    </>
                  )}
                </button>

                {uploadedFile && (
                  <button
                    type="button"
                    onClick={predictUploadedImage}
                    disabled={isAnalyzing}
                    className="mt-3 w-full border border-[#DFB6B2] bg-[#DFB6B2] px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#190019] transition hover:bg-[#FBE4D8] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {isAnalyzing
                      ? "Analyzing Image..."
                      : "Predict Uploaded Image"}
                  </button>
                )}
              </div>

              {error && (
                <p className="mt-4 text-center text-xs text-[#DFB6B2]">
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* RESULT */}
          <div className="flex flex-col border border-[#854F6C]/40 bg-[#2B124C]/20">
            <div className="border-b border-[#854F6C]/30 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#DFB6B2]">
                NETWORK OUTPUT
              </p>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#DFB6B2]/70">
                  Predicted digit
                </p>

                <div className="mt-4 text-[10rem] font-medium leading-none tracking-[-0.08em]">
                  {prediction ?? "—"}
                </div>
              </div>

              <div className="mt-10">
                <div className="mb-3 flex items-end justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#DFB6B2]/70">
                    Confidence
                  </span>

                  <span className="text-2xl">
                    {confidence !== null
                      ? `${confidence.toFixed(2)}%`
                      : "—"}
                  </span>
                </div>

                <div className="h-2 bg-[#522B5B]">
                  <div
                    className="h-full bg-[#DFB6B2] transition-all duration-700"
                    style={{
                      width: `${
                        confidence ?? 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBABILITIES */}
      <section className="border-t border-[#854F6C]/30 px-8 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#DFB6B2]">
              CLASS DISTRIBUTION
            </p>

            <h2 className="mt-3 text-3xl tracking-[-0.03em]">
              What the network considered.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-5">
            {Array.from({ length: 10 }, (_, digit) => {
              const probability =
                probabilities?.[String(digit)] ?? 0;

              return (
                <div key={digit}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span>{digit}</span>

                    <span className="text-[#DFB6B2]">
                      {probabilities
                        ? `${(probability * 100).toFixed(2)}%`
                        : "—"}
                    </span>
                  </div>

                  <div className="h-1 bg-[#522B5B]">
                    <div
                      className="h-full bg-[#854F6C] transition-all duration-500"
                      style={{
                        width: `${
                          probability * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}