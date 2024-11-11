import'./index.css'
import React, { useState } from 'react';

const DropdownButton = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={toggleDropdown}>{title}</button>
      
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: '0', zIndex: 1, backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
