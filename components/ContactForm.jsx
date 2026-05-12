const { useState, useEffect } = React;

function ContactForm() {
  const [lang, setLang] = useState(window.currentLang || "fr");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleLangChange = (e) => setLang(e.detail);
    window.addEventListener("languageChanged", handleLangChange);
    return () =>
      window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  const t = window.reactTranslations[lang];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t.errName;
    if (!form.email.trim()) e.email = t.errEmail1;
    else if (!emailRegex.test(form.email)) e.email = t.errEmail2;
    if (!form.message.trim()) e.message = t.errMsg1;
    else if (form.message.trim().length < 10) e.message = t.errMsg2;
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (!Object.keys(e).length) setSent(true);
  };

  const baseInput = (field) => ({
    width: "100%",
    padding: "1rem 1.2rem",
    background: "var(--surface2)",
    border: `1px solid ${errors[field] ? "#e05555" : "var(--border)"}`,
    color: "var(--text)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    display: "block",
    marginBottom: errors[field] ? "0.3rem" : "1.3rem",
  });

  const errMsg = {
    color: "#e05555",
    fontFamily: "var(--font-mono)",
    fontSize: "0.7rem",
    marginBottom: "1rem",
    display: "block",
  };

  if (sent) {
    return (
      <div
        style={{
          padding: "3rem 2rem",
          border: "1px solid var(--accent)",
          background: "rgba(232,131,58,0.05)",
          textAlign: "center",
          animation: "fadeIn 0.5s forwards",
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            color: "var(--accent)",
            marginBottom: "1rem",
          }}
        >
          ✓
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            color: "var(--accent)",
            marginBottom: "0.7rem",
          }}
        >
          {t.successTitle}
        </h3>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          {t.successDesc}
        </p>
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeIn 0.5s ease" }}>
      <input
        type="text"
        placeholder={t.namePlaceholder}
        value={form.name}
        onChange={(e) => {
          setForm({ ...form, name: e.target.value });
          setErrors({ ...errors, name: "" });
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--accent)";
          e.target.style.boxShadow = "0 0 10px rgba(232,131,58,0.2)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = errors.name
            ? "#e05555"
            : "var(--border)";
          e.target.style.boxShadow = "none";
        }}
        style={baseInput("name")}
      />
      {errors.name && <span style={errMsg}>// {errors.name}</span>}

      <input
        type="email"
        placeholder={t.emailPlaceholder}
        value={form.email}
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
          setErrors({ ...errors, email: "" });
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--accent)";
          e.target.style.boxShadow = "0 0 10px rgba(232,131,58,0.2)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = errors.email
            ? "#e05555"
            : "var(--border)";
          e.target.style.boxShadow = "none";
        }}
        style={baseInput("email")}
      />
      {errors.email && <span style={errMsg}>// {errors.email}</span>}

      <textarea
        placeholder={t.msgPlaceholder}
        rows={6}
        value={form.message}
        onChange={(e) => {
          setForm({ ...form, message: e.target.value });
          setErrors({ ...errors, message: "" });
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--accent)";
          e.target.style.boxShadow = "0 0 10px rgba(232,131,58,0.2)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = errors.message
            ? "#e05555"
            : "var(--border)";
          e.target.style.boxShadow = "none";
        }}
        style={{
          ...baseInput("message"),
          resize: "vertical",
          minHeight: "140px",
        }}
      />
      {errors.message && <span style={errMsg}>// {errors.message}</span>}

      <button
        className="magnetic"
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "1.1rem",
          background: "var(--accent)",
          color: "var(--bg)",
          border: "none",
          cursor: "none",
          fontFamily: "var(--font-body)",
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          transition: "opacity 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = "0.88";
          e.target.style.boxShadow = "0 0 30px rgba(232,131,58,0.35)";
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "1";
          e.target.style.boxShadow = "none";
        }}
      >
        {t.btnSend}
      </button>
    </div>
  );
}

const contactRoot = document.getElementById("react-contact");
if (contactRoot) ReactDOM.createRoot(contactRoot).render(<ContactForm />);
