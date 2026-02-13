import React from 'react';
import { Volume2, ArrowLeft } from 'lucide-react'; // Ensure lucide-react is installed

const Layout = ({ children, title, onBack }) => {
  return (
    <div className="desktop-container">
      {/* LEFT SIDE: Branding Panel */}
      <div className="brand-panel">
        <div className="brand-content">
          <Volume2 size={120} color="white" strokeWidth={1.5} />
          <h1>NPMS</h1>
          <p>Noise Pollution Monitoring System</p>
          <div className="brand-footer">
            <span>© 2024 University System</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Form Panel */}
      <div className="form-panel">
        {/* Back Button (Only shows if onBack is provided) */}
        {onBack && (
          <button onClick={onBack} className="nav-back-btn">
            <ArrowLeft size={20} /> Back to Home
          </button>
        )}

        <div className="form-wrapper">
          {title && <h2 className="desktop-page-title">{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;