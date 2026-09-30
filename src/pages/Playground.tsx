import { useState, useRef, useEffect } from "react";
import { RotateCw, Upload, Trash2, Undo, Redo } from "lucide-react";
import { Link } from "react-router-dom";

const Playground = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      ctxRef.current = canvas.getContext("2d");
      ctxRef.current!.fillStyle = "#2B124C";
      ctxRef.current?.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle grid texture
      ctxRef.current?.save();
      ctxRef.current!.globalAlpha = 0.1;
      ctxRef.current!.strokeStyle = "#FBE4D8";
      ctxRef.current!.lineWidth = 0.5;
      
      for (let x = 0; x < canvas.width; x += 20) {
        ctxRef.current?.beginPath();
        ctxRef.current?.moveTo(x, 0);
        ctxRef.current?.lineTo(x, canvas.height);
        ctxRef.current?.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += 20) {
        ctxRef.current?.beginPath();
        ctxRef.current?.moveTo(0, y);
        ctxRef.current?.lineTo(canvas.width, y);
        ctxRef.current?.stroke();
      }
      ctxRef.current?.restore();
    }
  }, []);

  const saveToHistory = () => {
    if (ctxRef.current) {
      const imageData = ctxRef.current?.getImageData(0, 0, 280, 280);
      setHistory((prev) => [...prev.slice(0, currentStep + 1), imageData]);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    saveToHistory();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctxRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    
    ctxRef.current.strokeStyle = "#FBE4D8";
    ctxRef.current.lineWidth = 4;
    ctxRef.current.lineCap = "round";
    ctxRef.current.lineJoin = "round";
    
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (ctxRef.current && canvasRef.current) {
      ctxRef.current.fillStyle = "#2B124C";
      ctxRef.current.fillRect(0, 0, 280, 280);
      saveToHistory();
    }
  };

  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (history[currentStep] && ctxRef.current) {
      ctxRef.current.putImageData(history[currentStep], 0, 0);
    }
  }, [currentStep, history]);

  return (
    <div className="min-h-screen bg-plum py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fadeInUp">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-mauve">
            YOUR INPUT / 02
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-warmCream md:text-7xl">
            DRAW SOMETHING.
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 animate-fadeInUp">
            <div className="relative rounded-sm border border-[rgba(82,43,91,0.3)] bg-deepPurple p-8">
              <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full" style={{
                  backgroundImage: `linear-gradient(rgba(251,228,216,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(251,228,216,0.1) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              <canvas
                ref={canvasRef}
                width={280}
                height={280}
                className="relative z-10 w-full cursor-crosshair rounded-sm border border-[rgba(251,228,216,0.2)]"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
              <div className="absolute bottom-4 left-4 text-xs font-mono uppercase tracking-widest text-dustyRose/50">
                28 × 28
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={clearCanvas}
                  className="flex items-center space-x-2 rounded-sm bg-deepPurple px-4 py-2 text-sm font-medium uppercase tracking-wider text-dustyRose transition-colors hover:bg-purple hover:text-warmCream"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>CLEAR</span>
                </button>
                <button
                  onClick={undo}
                  disabled={currentStep <= 0}
                  className="flex items-center space-x-2 rounded-sm bg-deepPurple px-4 py-2 text-sm font-medium uppercase tracking-wider text-dustyRose transition-colors hover:bg-purple hover:text-warmCream disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Undo className="h-4 w-4" />
                  <span>UNDO</span>
                </button>
                <button
                  onClick={redo}
                  disabled={currentStep >= history.length - 1}
                  className="flex items-center space-x-2 rounded-sm bg-deepPurple px-4 py-2 text-sm font-medium uppercase tracking-wider text-dustyRose transition-colors hover:bg-purple hover:text-warmCream disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Redo className="h-4 w-4" />
                  <span>REDO</span>
                </button>
              </div>
              <button
                className="flex items-center space-x-2 rounded-sm bg-warmCream px-6 py-3 text-sm font-bold uppercase tracking-wider text-plum transition-all duration-300 hover:bg-dustyRose hover:text-plum"
              >
                <span>ANALYZE →</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-1 animate-fadeInUp">
            <div className="rounded-sm border border-[rgba(82,43,91,0.3)] bg-deepPurple p-6">
              <h3 className="text-lg font-bold uppercase tracking-wider text-warmCream">
                RECOGNITION ENGINE
              </h3>
              <div className="mt-4 flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-emerald/20"></div>
                <span className="text-sm font-mono uppercase tracking-widest text-dustyRose">
                  MODEL STATUS
                </span>
              </div>
              <p className="mt-2 text-sm text-dustyRose">OFFLINE</p>
              <div className="mt-6 rounded-sm border border-[rgba(251,228,216,0.1)] bg-plum p-4">
                <h4 className="text-sm font-mono uppercase tracking-widest text-mauve">
                  AI PROCESSING VISUAL LANGUAGE
                </h4>
                <div className="mt-3 space-y-2 text-xs font-mono text-dustyRose/70">
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-1 rounded-full bg-dustyRose/30"></div>
                    <span>INPUT</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-1 rounded-full bg-dustyRose/30"></div>
                    <span>PREPROCESSING</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-1 rounded-full bg-dustyRose/30"></div>
                    <span>FEATURE EXTRACTION</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-1 rounded-full bg-dustyRose/30"></div>
                    <span>CLASSIFICATION</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-1 rounded-full bg-dustyRose/30"></div>
                    <span>PREDICTION</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-sm border border-[rgba(82,43,91,0.3)] bg-deepPurple p-6">
              <h3 className="text-lg font-bold uppercase tracking-wider text-warmCream">
                CONTROLS
              </h3>
              <div className="mt-4 space-y-3">
                <button className="w-full rounded-sm bg-deepPurple px-4 py-3 text-sm font-medium uppercase tracking-wider text-dustyRose transition-colors hover:bg-purple hover:text-warmCream">
                  UPLOAD
                </button>
                <button className="w-full rounded-sm bg-deepPurple px-4 py-3 text-sm font-medium uppercase tracking-wider text-dustyRose transition-colors hover:bg-purple hover:text-warmCream">
                  DOWNLOAD SAMPLE
                </button>
                <button className="w-full rounded-sm bg-deepPurple px-4 py-3 text-sm font-medium uppercase tracking-wider text-dustyRose transition-colors hover:bg-purple hover:text-warmCream">
                  RESET CANVAS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;