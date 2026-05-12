const { useState } = React;

function ProjectCard({ project, lang }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const t = window.reactTranslations[lang];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({ x: ((y - cy) / cy) * -8, y: ((x - cx) / cx) * 8 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const disabledLinkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--muted)",
    fontSize: "0.8rem",
    cursor: "not-allowed",
    opacity: 0.6,
  };

  const activeLinkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "var(--text)",
    textDecoration: "none",
    fontSize: "0.8rem",
    transition: "color 0.3s",
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "var(--surface2)",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        padding: "2.2rem",
        transition: "all 0.1s ease-out",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? "-10px" : "0"}) scale3d(${hovered ? "1.02" : "1"}, ${hovered ? "1.02" : "1"}, 1)`,
        boxShadow: hovered ? "0 20px 40px rgba(232,131,58,0.2)" : "none",
        position: "relative",
        overflow: "hidden",
        cursor: "none",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% -10%, rgba(232,131,58,0.12), transparent 55%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s",
          pointerEvents: "none",
          transform: "translateZ(-10px)",
        }}
      />
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "var(--accent)",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: "1rem",
          transform: "translateZ(20px)",
        }}
      >
        {project.category}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.55rem",
          fontWeight: 600,
          marginBottom: "0.9rem",
          position: "relative",
          transform: "translateZ(30px)",
        }}
      >
        {project.title[lang]}
      </h3>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "0.88rem",
          lineHeight: 1.75,
          marginBottom: "1.6rem",
          position: "relative",
          transform: "translateZ(25px)",
        }}
      >
        {project.description[lang]}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "1.8rem",
          position: "relative",
          transform: "translateZ(35px)",
        }}
      >
        {project.technologies.map((tech, i) => (
          <span
            key={i}
            style={{
              padding: "0.25rem 0.8rem",
              background: "rgba(232,131,58,0.09)",
              border: "1px solid rgba(232,131,58,0.22)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.64rem",
              color: "var(--accent)",
              letterSpacing: "0.07em",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          position: "relative",
          transform: "translateZ(40px)",
        }}
      >
        {project.github === "private" ? (
          <span style={disabledLinkStyle}>
            <i className="fas fa-lock"></i> {t.code_private}
          </span>
        ) : project.github ? (
          <a
            href={project.github}
            target="_blank"
            style={activeLinkStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
          >
            <i className="fab fa-github"></i> {t.code}
          </a>
        ) : null}

        {project.exe && (
          <a
            href={project.exe}
            target="_blank"
            style={activeLinkStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
          >
            <i className="fas fa-gamepad"></i> {t.exe}
          </a>
        )}

        {project.demo === "unavailable" ? (
          <span style={disabledLinkStyle}>
            <i className="fas fa-hourglass-half"></i> {t.demo_unavail}
          </span>
        ) : project.demo === "production" ? (
          <span style={disabledLinkStyle}>
            <i className="fas fa-hammer"></i> {t.demo_prod}
          </span>
        ) : project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            style={activeLinkStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
          >
            <i className="fas fa-external-link-alt"></i> {t.demo}
          </a>
        ) : null}
      </div>
    </div>
  );
}
