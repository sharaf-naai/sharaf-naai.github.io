const { useState, useEffect } = React;

const certificationsData = [
  {
    id: "CERT-WEB-2019",
    title: {
      fr: "Web Development (6-Month Program)",
      en: "Web Development (6-Month Program)",
    },
    issuer: "LearningPro Center",
    date: "Oct 2019",
    icon: "fas fa-graduation-cap",
    accent: "var(--accent)",
    hash: "0x7F8A9B2...A1",
  },
  {
    id: "LNKD-LAR-2026",
    title: {
      fr: "Laravel Essential Training",
      en: "Laravel Essential Training",
    },
    issuer: "LinkedIn Learning",
    date: "Feb 2026",
    icon: "fab fa-linkedin-in",
    accent: "#0a66c2", // LinkedIn Blue
    hash: "0x3B4C5D6...E2",
  },
  {
    id: "LNKD-GIT-2026",
    title: { fr: "Git Essential Training", en: "Git Essential Training" },
    issuer: "LinkedIn Learning",
    date: "Feb 2026",
    icon: "fab fa-git-alt",
    accent: "#f14e32", // Git Orange/Red
    hash: "0x9F0E1D2...C3",
  },
  {
    id: "LNKD-GFX-2026",
    title: {
      fr: "Intro to Graphic Design: Concepts",
      en: "Intro to Graphic Design: Concepts",
    },
    issuer: "LinkedIn Learning",
    date: "Mar 2026",
    icon: "fas fa-bezier-curve",
    accent: "var(--ice)",
    hash: "0x5A6B7C8...F4",
  },
];

function CredentialCard({ cert, lang }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const t = window.reactTranslations[lang];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface2)",
        border: `1px solid ${hovered ? cert.accent : "var(--border)"}`,
        borderLeft: `4px solid ${cert.accent}`,
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        cursor: "none",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? `0 10px 30px ${cert.accent}20` : "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Holographic Glare Effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${cert.accent}15, transparent 40%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--muted)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {cert.id}
          </div>
          <i
            className={cert.icon}
            style={{
              fontSize: "1.5rem",
              color: hovered ? cert.accent : "var(--muted)",
              transition: "color 0.3s",
            }}
          ></i>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--text)",
            marginBottom: "0.5rem",
            lineHeight: 1.2,
          }}
        >
          {cert.title[lang]}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "var(--muted)",
            marginBottom: "2rem",
          }}
        >
          {t.cert_issued}:{" "}
          <strong style={{ color: "var(--text)", fontWeight: 500 }}>
            {cert.issuer}
          </strong>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "1rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "var(--muted)",
              letterSpacing: "0.1em",
              marginBottom: "0.2rem",
            }}
          >
            TIMESTAMP
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: cert.accent,
            }}
          >
            {cert.date}
          </div>
        </div>

        {/* Fake Security Barcode/Hash for aesthetic */}
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "var(--muted)",
              letterSpacing: "0.1em",
              marginBottom: "0.2rem",
            }}
          >
            SIGNATURE
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--muted)",
              opacity: 0.7,
            }}
          >
            {cert.hash}
          </div>
        </div>
      </div>
    </div>
  );
}

function CertificationsSection() {
  const [lang, setLang] = useState(window.currentLang || "fr");

  useEffect(() => {
    const handleLangChange = (e) => setLang(e.detail);
    window.addEventListener("languageChanged", handleLangChange);
    return () =>
      window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "2rem",
      }}
    >
      {certificationsData.map((cert, i) => (
        <CredentialCard key={i} cert={cert} lang={lang} />
      ))}
    </div>
  );
}

const certRoot = document.getElementById("react-certifications");
if (certRoot) ReactDOM.createRoot(certRoot).render(<CertificationsSection />);
