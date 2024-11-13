import React, { useState } from 'react';
import './index.css';

const DropdownButton = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onMouseEnter={toggleDropdown} >
        {title}
      </button>
      
      <div className={`dropdown-content ${isOpen ? 'show' : ''}`} onMouseLeave={toggleDropdown}>
        {children}
      </div>
    </div>
  );
};

export default DropdownButton;
