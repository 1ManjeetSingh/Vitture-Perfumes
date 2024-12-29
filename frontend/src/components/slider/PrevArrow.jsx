// src/PrevArrow.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const PrevArrow = ({ onClick }) => {
    return (
        <div className="arrow prev" onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
    );
};

export default PrevArrow;
