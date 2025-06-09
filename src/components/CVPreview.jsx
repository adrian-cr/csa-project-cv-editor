export default function CVPreview({ cvData }) {
  return (
    <div className="preview-canvas">
      <div className="resume-sheet">
        <h1 className="resume-name">{cvData.personal.name}</h1>
        <div className="resume-contact">
          <p>{cvData.personal.email} | {cvData.personal.phone} | {cvData.personal.address}</p>
        </div>
        <hr />
        <section className="resume-section">
          <h2>Skills</h2>
          <p>{cvData.skills}</p>
        </section>
        <section className="resume-section">
          <h2>Education</h2>
          {cvData.education.map((edu, index) => (
            <div key={index} className="resume-entry">
              <p><strong>{edu.degree}</strong>, {edu.school} ({edu.startMonth}, {edu.startYear} - {edu.endMonth}, {edu.endYear})</p>
            </div>
          ))}
        </section>
        <section className="resume-section">
          <h2>Experience</h2>
          {cvData.experience.map((exp, index) => (
            <div key={index} className="resume-entry">
              <p><strong>{exp.title}</strong>, {exp.company} ({exp.startMonth}, {exp.startYear} - {exp.endMonth}, {exp.endYear})</p>
              <p>{exp.responsibilities}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
