import { useState } from 'react';
import PropTypes from 'prop-types';
import './DropdownButton.css';

const DropdownButton = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

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

DropdownButton.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default DropdownButton;
