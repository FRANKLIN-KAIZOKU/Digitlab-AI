import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const trainingData = [
  { epoch: 1, accuracy: 90.50, valAccuracy: 97.88, loss: 0.3147, valLoss: 0.0790 },
  { epoch: 2, accuracy: 96.04, valAccuracy: 97.98, loss: 0.1608, valLoss: 0.0818 },
  { epoch: 3, accuracy: 96.27, valAccuracy: 98.53, loss: 0.1999, valLoss: 0.1080 },
  { epoch: 4, accuracy: 96.16, valAccuracy: 98.40, loss: 0.3157, valLoss: 0.1649 },
  { epoch: 5, accuracy: 95.87, valAccuracy: 98.28, loss: 0.5785, valLoss: 0.2803 },
  { epoch: 6, accuracy: 95.95, valAccuracy: 98.13, loss: 0.8708, valLoss: 0.5254 },
  { epoch: 7, accuracy: 95.93, valAccuracy: 98.20, loss: 1.2507, valLoss: 0.6105 },
  { epoch: 8, accuracy: 95.97, valAccuracy: 98.40, loss: 1.6517, valLoss: 0.8480 },
];

const digitAccuracy = [
  { digit: "0", accuracy: 98.88 },
  { digit: "1", accuracy: 99.65 },
  { digit: "2", accuracy: 95.83 },
  { digit: "3", accuracy: 97.92 },
  { digit: "4", accuracy: 98.37 },
  { digit: "5", accuracy: 98.77 },
  { digit: "6", accuracy: 99.06 },
  { digit: "7", accuracy: 97.96 },
  { digit: "8", accuracy: 96.82 },
  { digit: "9", accuracy: 97.42 },
];

const pageStyle = {
  minHeight: "100vh",
  background: "#190019",
  color: "#FBE4D8",
};

const cardStyle = {
  border: "1px solid rgba(223,182,178,0.18)",
  background: "rgba(43,18,76,0.38)",
};

const tooltipStyle = {
  background: "#2B124C",
  border: "1px solid rgba(223,182,178,0.25)",
  color: "#FBE4D8",
};

export default function Analytics() {
  return (
    <main style={pageStyle}>
      {/* HEADER */}
      <header
        style={{
          borderBottom: "1px solid rgba(223,182,178,0.18)",
          padding: "22px 5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <a
          href="/"
          style={{
            color: "#FBE4D8",
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.16em",
          }}
        >
          DIGITLAB AI
        </a>

        <nav
          style={{
            display: "flex",
            gap: 24,
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <a href="/playground" style={{ color: "#DFB6B2", textDecoration: "none" }}>
            Playground
          </a>

          <a href="/model-lab" style={{ color: "#DFB6B2", textDecoration: "none" }}>
            Model Lab
          </a>

          <a href="/analytics" style={{ color: "#FBE4D8", textDecoration: "none" }}>
            Analytics
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section
        style={{
          padding: "100px 5vw 70px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#854F6C",
            marginBottom: 20,
          }}
        >
          / MODEL ANALYTICS / V4
        </div>

        <h1
          style={{
            fontSize: "clamp(52px, 8vw, 118px)",
            lineHeight: 0.88,
            letterSpacing: "-0.055em",
            fontWeight: 500,
            maxWidth: 1000,
            margin: 0,
          }}
        >
          WHAT THE
          <br />
          MODEL LEARNED.
        </h1>

        <p
          style={{
            marginTop: 34,
            maxWidth: 620,
            color: "#DFB6B2",
            fontSize: 16,
            lineHeight: 1.7,
          }}
        >
          A visual record of how the V4 convolutional neural network trained,
          where it performs well, and where handwritten digits remain difficult.
        </p>
      </section>

      {/* KEY METRICS */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 5vw 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 1,
        }}
      >
        {[
          ["TEST ACCURACY", "98.07%"],
          ["TEST LOSS", "0.0643"],
          ["TRAINING EPOCHS", "8"],
          ["CLASSES", "10"],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              ...cardStyle,
              padding: "28px 24px",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                color: "#854F6C",
                marginBottom: 16,
              }}
            >
              {label}
            </div>

            <div
              style={{
                fontSize: 38,
                letterSpacing: "-0.04em",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </section>

      {/* TRAINING CURVES */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 5vw 100px",
        }}
      >
        <div style={{ marginBottom: 34 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.15em",
              color: "#854F6C",
              marginBottom: 12,
            }}
          >
            01 / TRAINING
          </div>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 62px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            LEARNING CURVES
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 18,
          }}
        >
          {/* ACCURACY */}
          <div style={{ ...cardStyle, padding: 24 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              Accuracy
            </div>

            <div style={{ width: "100%", height: 340 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingData}>
                  <CartesianGrid
                    stroke="rgba(223,182,178,0.10)"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="epoch"
                    tick={{ fill: "#854F6C", fontSize: 11 }}
                    axisLine={{ stroke: "rgba(223,182,178,0.15)" }}
                    tickLine={false}
                  />

                  <YAxis
                    domain={[85, 100]}
                    tick={{ fill: "#854F6C", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: "#DFB6B2" }}
                  />

                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    name="Training"
                    stroke="#DFB6B2"
                    strokeWidth={2}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="valAccuracy"
                    name="Validation"
                    stroke="#FBE4D8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LOSS */}
          <div style={{ ...cardStyle, padding: 24 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              Loss
            </div>

            <div style={{ width: "100%", height: 340 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trainingData}>
                  <CartesianGrid
                    stroke="rgba(223,182,178,0.10)"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="epoch"
                    tick={{ fill: "#854F6C", fontSize: 11 }}
                    axisLine={{ stroke: "rgba(223,182,178,0.15)" }}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{ fill: "#854F6C", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: "#DFB6B2" }}
                  />

                  <Line
                    type="monotone"
                    dataKey="loss"
                    name="Training"
                    stroke="#DFB6B2"
                    strokeWidth={2}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="valLoss"
                    name="Validation"
                    stroke="#FBE4D8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* DIGIT PERFORMANCE */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 5vw 100px",
        }}
      >
        <div style={{ marginBottom: 34 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.15em",
              color: "#854F6C",
              marginBottom: 12,
            }}
          >
            02 / CLASS PERFORMANCE
          </div>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 62px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            EVERY DIGIT, SEPARATELY.
          </h2>
        </div>

        <div style={{ ...cardStyle, padding: 24 }}>
          <div style={{ width: "100%", height: 420 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={digitAccuracy}>
                <CartesianGrid
                  stroke="rgba(223,182,178,0.10)"
                  vertical={false}
                />

                <XAxis
                  dataKey="digit"
                  tick={{ fill: "#DFB6B2", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  domain={[90, 100]}
                  tick={{ fill: "#854F6C", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => [`${value}%`, "Accuracy"]}
                />

                <Bar
                  dataKey="accuracy"
                  fill="#854F6C"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* CONFUSION MATRIX */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 5vw 120px",
        }}
      >
        <div style={{ marginBottom: 34 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.15em",
              color: "#854F6C",
              marginBottom: 12,
            }}
          >
            03 / ERROR MAP
          </div>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 62px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            WHERE DOES IT GET CONFUSED?
          </h2>

          <p
            style={{
              color: "#DFB6B2",
              maxWidth: 600,
              lineHeight: 1.7,
              marginTop: 18,
            }}
          >
            The confusion matrix shows how predictions are distributed across
            the ten MNIST digit classes.
          </p>
        </div>

        <div
          style={{
            ...cardStyle,
            padding: 24,
            overflow: "hidden",
          }}
        >
          <img
            src="/confusion_matrix_v4.png"
            alt="V4 confusion matrix"
            style={{
              display: "block",
              width: "100%",
              maxWidth: 900,
              margin: "0 auto",
              height: "auto",
            }}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(223,182,178,0.18)",
          padding: "28px 5vw",
          color: "#854F6C",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        DIGITLAB AI / CNN MODEL ANALYTICS / V4
      </footer>
    </main>
  );
}