import React, { useState } from 'react';
import './index.css';

const DropdownButton = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown-container" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
      <button className="dropdown-button"  >
        {title}
      </button>
      
      <div className={`dropdown-content ${isOpen ? 'show' : ''}`} >
        {children}
      </div>
    </div>
  );
};

export default DropdownButton;
