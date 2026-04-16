'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [step, setStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState({ name: '', age: '', gender: 'Unspecified', bloodGroup: 'Unspecified', height: '', weight: '', history: '' });
  const [symptoms, setSymptoms] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    if (patientInfo.name.trim() && patientInfo.age) {
      setStep(2); // Move to symptoms page
    }
  };

  const handleSymptomSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    
    setLoading(true);
    setError(null);
    setResults(null);
    setStep(3); // Move to results step (shows loader until fetched)
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms, patientInfo })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to analyze symptoms');
      
      setResults({ ...data, originalSymptoms: symptoms });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setSymptoms('');
    setResults(null);
    setError(null);
    setPatientInfo({ name: '', age: '', gender: 'Unspecified', bloodGroup: 'Unspecified', height: '', weight: '', history: '' });
  };

  const handlePdfExport = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('medical-report-container');
    const opt = {
      margin:       0.4,
      filename:     `MediScribe_Diagnostic_Report_${patientInfo.name.replace(/\s+/g, '_')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      <header className="top-nav">
        <div className="logo">MediScribe</div>
      </header>

      <main className="main-container">
        
        {/* STEP 1: PATIENT DETAILS */}
        {step === 1 && (
          <div className="glass-card step-animated">
            <h1 className="title">Patient Profile</h1>
            <p className="subtitle">Let's start by getting to know you. Your demographic data helps our AI tailor its clinical analysis accurately.</p>

            <form onSubmit={handlePatientSubmit}>
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="E.g., Jane Doe" 
                  value={patientInfo.name} 
                  onChange={e => setPatientInfo({...patientInfo, name: e.target.value})}
                  required 
                />
              </div>

              <div style={{display: 'flex', gap: '1rem', width: '100%'}}>
                <div className="form-group" style={{flex: 1}}>
                  <label>Age *</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="25" 
                    value={patientInfo.age} 
                    onChange={e => setPatientInfo({...patientInfo, age: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group" style={{flex: 1}}>
                  <label>Biological Gender</label>
                  <select 
                    className="form-input"
                    value={patientInfo.gender}
                    onChange={e => setPatientInfo({...patientInfo, gender: e.target.value})}
                  >
                    <option value="Unspecified">Unspecified</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{display: 'flex', gap: '1rem', width: '100%'}}>
                <div className="form-group" style={{flex: 1}}>
                  <label>Blood Group</label>
                  <select 
                    className="form-input"
                    value={patientInfo.bloodGroup}
                    onChange={e => setPatientInfo({...patientInfo, bloodGroup: e.target.value})}
                  >
                    <option value="Unspecified">Select...</option>
                    <option value="A+">A+</option><option value="A-">A-</option>
                    <option value="B+">B+</option><option value="B-">B-</option>
                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                    <option value="O+">O+</option><option value="O-">O-</option>
                  </select>
                </div>
                <div className="form-group" style={{flex: 1}}>
                  <label>Height (cm)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="175" 
                    value={patientInfo.height} 
                    onChange={e => setPatientInfo({...patientInfo, height: e.target.value})}
                  />
                </div>
                <div className="form-group" style={{flex: 1}}>
                  <label>Weight (kg)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="70" 
                    value={patientInfo.weight} 
                    onChange={e => setPatientInfo({...patientInfo, weight: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Medical History & Context (Optional)</label>
                <textarea 
                  className="form-input" 
                  placeholder="Any pre-existing conditions, active medications, or allergies?"
                  value={patientInfo.history}
                  onChange={e => setPatientInfo({...patientInfo, history: e.target.value})}
                  style={{minHeight: '80px'}}
                />
              </div>

              <button type="submit" className="btn-primary" disabled={!patientInfo.name.trim() || !patientInfo.age}>
                Continue to Diagnostics →
              </button>
            </form>
          </div>
        )}


        {/* STEP 2: SYMPTOM INPUT */}
        {step === 2 && (
          <div className="glass-card step-animated">
            <h1 className="title">Symptom Assessment</h1>
            <p className="subtitle">Please thoroughly describe what you're experiencing. Include severity, onset duration, and specifics.</p>
            
            <form onSubmit={handleSymptomSubmit}>
              <div className="form-group">
                <label>Chief Complaints</label>
                <textarea 
                  className="form-input"
                  placeholder="Enter symptoms (e.g., I've had a fever of 101F since yesterday, a sharp headache behind my eyes, and moderate stomach pain)."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>
              
              <div className="action-buttons">
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                  ← Edit Profile
                </button>
                <button type="submit" className="btn-primary" style={{marginTop: 0}} disabled={!symptoms.trim()}>
                  Generate Clinical Report ✦
                </button>
              </div>
            </form>
          </div>
        )}


        {/* STEP 3: LOADING + RESULTS */}
        {step === 3 && (
          <div className="step-results">
            
            {loading ? (
              <div className="glass-card loader-wrapper">
                 <div className="ver-spinner"></div>
                 <h2 style={{color: '#F8FAFC', fontSize: '1.4rem'}}>Analyzing Synthetics...</h2>
                 <p style={{color: '#A1A1AA', fontSize: '1.05rem'}}>Consulting Gemini Medical AI for {patientInfo.name}'s symptoms.</p>
              </div>
            ) : (
              <>
                <div className="patient-profile-card">
                   <div className="profile-info">
                      <h2>{patientInfo.name}</h2>
                      <p>Age {patientInfo.age} &nbsp;&bull;&nbsp; {patientInfo.gender} &nbsp;&bull;&nbsp; Report ID: #{Math.random().toString().slice(2, 8)}</p>
                   </div>
                   <div className="action-buttons" style={{marginTop: 0}}>
                      <button className="btn-secondary" onClick={() => { setResults(null); setError(null); setStep(2); }}>← Refine Symptoms</button>
                      <button className="btn-secondary" onClick={resetFlow} style={{background: 'rgba(255,255,255,0.05)'}}>⟳ New Patient</button>
                   </div>
                </div>

                <div id="medical-report-container" style={{padding: '1rem', width: '100%'}}>
                  <div className="results-grid">
                    {error ? (
                      <div className="box" style={{borderColor: '#EF4444', gridColumn: '1 / -1'}}>
                        <h3 style={{color: '#EF4444'}}><span className="icon">⚠️</span> Diagnostics Error</h3>
                        <p>{error}</p>
                      </div>
                    ) : (
                      <>
                        <div className="box diagnosis">
                          <h3><span className="icon">🩺</span> 1. Identified Conditions</h3>
                          <div className="markdown-content">
                            <ReactMarkdown>{results?.conditions}</ReactMarkdown>
                          </div>
                        </div>

                        <div className="box prescription">
                          <h3><span className="icon">💊</span> 2. OTC Prescriptions</h3>
                          <div className="markdown-content">
                            <ReactMarkdown>{results?.prescription}</ReactMarkdown>
                          </div>
                        </div>
                        
                        <div className="box advice">
                          <h3><span className="icon">🛡️</span> 3. Safety Advice</h3>
                          <div className="markdown-content">
                            <ReactMarkdown>{results?.advice}</ReactMarkdown>
                          </div>
                        </div>

                        <div className="box symptoms">
                          <h3><span className="icon">📋</span> 4. Master Clinical Report</h3>
                          
                          <table className="clinical-report-table">
                            <tbody>
                              <tr><td>Patient Name</td><td>{patientInfo.name}</td></tr>
                              <tr><td>Demographics</td><td>Age {patientInfo.age} | {patientInfo.gender}</td></tr>
                              <tr><td>Biometrics</td><td>{patientInfo.bloodGroup !== 'Unspecified' ? patientInfo.bloodGroup : 'N/A'} | {patientInfo.height ? patientInfo.height + 'cm' : 'N/A'} | {patientInfo.weight ? patientInfo.weight + 'kg' : 'N/A'}</td></tr>
                              <tr><td>Key Complaints</td><td style={{fontStyle: 'italic'}}>{results?.originalSymptoms || symptoms}</td></tr>
                              <tr><td>Known History</td><td>{patientInfo.history || 'None Reported'}</td></tr>
                            </tbody>
                          </table>

                          {results?.links && results.links.length > 0 && (
                            <div className="box-links" style={{marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem'}}>
                              <h4 style={{color: '#94A3B8', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px'}}>Trusted Literature</h4>
                              {results.links.map((link, idx) => (
                                <a key={idx} href={link} target="_blank" rel="noopener noreferrer" style={{display: 'block', color: '#06B6D4', textDecoration: 'none', marginBottom: '0.5rem', fontWeight: 600}}>
                                  → {new URL(link).hostname.replace('www.', '')} Documentation ↗
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* PDF Action Button (Outside the PDF container so it doesn't print itself) */}
                {!error && (
                  <button className="btn-pdf" onClick={handlePdfExport}>
                    <span>📄</span> Download Medical Report (PDF)
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </>
  );
}
