import { useState } from 'react';
import './index.css';

const DropdownButton = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div
            className="dropdown-container"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="dropdown-button">{title}</button>
            <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default DropdownButton;