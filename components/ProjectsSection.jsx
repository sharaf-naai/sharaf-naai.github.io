const { useState, useEffect } = React;

function ProjectsSection() {
  const [lang, setLang] = useState(window.currentLang || "fr");

  useEffect(() => {
    const handleLangChange = (e) => setLang(e.detail);
    window.addEventListener("languageChanged", handleLangChange);
    return () =>
      window.removeEventListener("languageChanged", handleLangChange);
  }, []);

  return (
    <React.Fragment>
      {window.portfolioProjects.map((p, i) => (
        <ProjectCard key={i} project={p} lang={lang} />
      ))}
    </React.Fragment>
  );
}

const projRoot = document.getElementById("react-projects");
if (projRoot) ReactDOM.createRoot(projRoot).render(<ProjectsSection />);
