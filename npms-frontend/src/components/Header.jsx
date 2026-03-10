import React from 'react';
import { LogOut } from 'lucide-react'; 

const Header = ({ userName, onLogout }) => {
  return (
    <header className="app-header">
      <h1>Hello, {userName}</h1>
      <button className="logout-btn" onClick={onLogout}>
         <span style={{marginRight: '8px'}}>Logout</span>
         <LogOut size={18} />
      </button>
    </header>
  );
};

export default Header;