import "@fontsource/alex-brush/400.css";
import "@fontsource/allura/400.css";

const Index = () => {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0D0610",
        color: "#F4E9E2",
        overflow: "hidden",
      }}
    >
      {/* NAVIGATION */}
      <header
        style={{
          borderBottom: "1px solid rgba(223,182,178,0.18)",
          padding: "22px 5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.16em",
          }}
        >
          DIGITLAB AI
        </div>

        <nav
          style={{
            display: "flex",
            gap: 28,
            fontSize: 11,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
          }}
        >
          <a
            href="/playground"
            style={{
              color: "#8C778C",
              textDecoration: "none",
            }}
          >
            Playground
          </a>

          <a
            href="/model-lab"
            style={{
              color: "#8C778C",
              textDecoration: "none",
            }}
          >
            Model Lab
          </a>

          <a
            href="/analytics"
            style={{
              color: "#8C778C",
              textDecoration: "none",
            }}
          >
            Analytics
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section
        style={{
          minHeight: "calc(100vh - 70px)",
          padding: "8vh 5vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 1500,
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Editorial Graphics - subtle */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* Thin circular arc */}
          <svg
            style={{
              position: "absolute",
              top: "10%",
              right: "5%",
              width: 320,
              height: 320,
              opacity: 0.08,
            }}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 10 A90 90 0 0 1 190 100 A90 90 0 0 1 100 190 A90 90 0 0 1 10 100 A90 90 0 0 1 100 10 Z"
              stroke="#B77A9A"
              strokeWidth="0.5"
              strokeDasharray="4 8"
            />
          </svg>

          {/* Vertical divider */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              bottom: "20%",
              left: "65%",
              width: 1,
              background: "linear-gradient(to bottom, transparent, #B77A9A, transparent)",
              opacity: 0.15,
            }}
          />

          {/* Crosshair */}
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "70%",
              width: 24,
              height: 24,
              opacity: 0.12,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: 1,
                background: "#B77A9A",
                transform: "translateY(-50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 1,
                background: "#B77A9A",
                transform: "translateX(-50%)",
              }}
            />
          </div>

          {/* Light leak */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              right: "10%",
              width: 200,
              height: 400,
              background: "radial-gradient(circle, rgba(183,122,154,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
              opacity: 0.5,
            }}
          />
        </div>

        {/* Small label */}
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#854F6C",
            marginBottom: 28,
          }}
        >
          DIGITLAB AI / 01
        </div>

        {/* Hero Headline */}
        <h1
          style={{
            margin: 0,
            maxWidth: 1350,
            fontSize: "clamp(58px, 8.7vw, 138px)",
            lineHeight: 0.82,
            letterSpacing: "-0.065em",
            fontWeight: 800,
            position: "relative",
            color: "#F4E9E2",
          }}
        >
          <span style={{ display: "block" }}>SEE HOW A</span>

          <span
            style={{
              display: "block",
              position: "relative",
              zIndex: 1,
            }}
          >
            NEURAL NETWORK

            <span
              style={{
                position: "absolute",
                left: "0.13em",
                bottom: "-0.30em",
                zIndex: 2,
                fontFamily: '"Allura", cursive',
                fontSize: "0.68em",
                fontWeight: 400,
                letterSpacing: "0.005em",
                lineHeight: 0.8,
                whiteSpace: "nowrap",
                color: "#A9E7FF",
                transform: "rotate(-4deg)",
                transformOrigin: "left center",
                textShadow: "0 0 28px rgba(169,231,255,0.12)",
              }}
            >
              Sees HANDWRITING.
            </span>
          </span>
        </h1>

        {/* Editorial description */}
        <p
          style={{
            marginTop: 32,
            fontSize: 15,
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: "#8C778C",
            maxWidth: 520,
            lineHeight: 1.5,
          }}
        >
          An interactive laboratory for understanding how convolutional neural
          networks transform pixels into predictions.
        </p>

        {/* Status indicator */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#8C778C",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#A9E7FF",
              boxShadow: "0 0 12px rgba(169,231,255,0.3)",
            }}
          />
          <span>MNIST / CNN / 0—9</span>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 24,
          }}
        >
          <a
            href="/playground"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 54,
              padding: "0 30px",
              background: "#F4E9E2",
              color: "#0D0610",
              textDecoration: "none",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            OPEN THE PLAYGROUND
          </a>

          <span
            style={{
              color: "#854F6C",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            CNN / MNIST / V4
          </span>
        </div>

        {/* Visual centerpiece - handwritten digit canvas */}
        <div
          style={{
            marginTop: "8vh",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 280,
              height: 280,
              border: "1px solid rgba(223,182,178,0.12)",
              background:
                "radial-gradient(circle at 30% 30%, rgba(183,122,154,0.04) 0%, transparent 60%)",
            }}
          >
            {/* Subtle grid texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(rgba(244,228,226,0.03) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(244,228,226,0.03) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
                opacity: 0.5,
              }}
            />

            {/* Abstract handwritten "7" */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0.85,
              }}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 20 L80 20 L55 80 Z"
                stroke="#F4E9E2"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            {/* Technical labels */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 8,
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8C778C",
              }}
            >
              INPUT CANVAS
            </div>
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8C778C",
              }}
            >
              28 × 28
            </div>

            {/* Prediction indicator */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#8C778C",
                }}
              >
                PREDICTION
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#F4E9E2",
                }}
              >
                7
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#A9E7FF",
                  letterSpacing: "0.08em",
                }}
              >
                98.7%
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT SIGNALS */}
        <div
          style={{
            marginTop: "12vh",
            paddingTop: 24,
            borderTop: "1px solid rgba(223,182,178,0.18)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 24,
            maxWidth: 900,
          }}
        >
          <div>
            <div
              style={{
                color: "#854F6C",
                fontSize: 9,
                letterSpacing: "0.15em",
                marginBottom: 10,
              }}
            >
              MODEL
            </div>

            <div style={{ fontSize: 14 }}>CONVOLUTIONAL CNN</div>
          </div>

          <div>
            <div
              style={{
                color: "#854F6C",
                fontSize: 9,
                letterSpacing: "0.15em",
                marginBottom: 10,
              }}
            >
              DATASET
            </div>

            <div style={{ fontSize: 14 }}>MNIST / 10 CLASSES</div>
          </div>

          <div>
            <div
              style={{
                color: "#854F6C",
                fontSize: 9,
                letterSpacing: "0.15em",
                marginBottom: 10,
              }}
            >
              CURRENT MODEL
            </div>

            <div style={{ fontSize: 14 }}>V4 / 98.07%</div>
          </div>

          <div>
            <div
              style={{
                color: "#854F6C",
                fontSize: 9,
                letterSpacing: "0.15em",
                marginBottom: 10,
              }}
            >
              LIVE INFERENCE
            </div>

            <div style={{ fontSize: 14 }}>AVAILABLE</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
