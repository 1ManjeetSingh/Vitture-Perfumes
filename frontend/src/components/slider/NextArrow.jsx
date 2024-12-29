// src/NextArrow.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const NextArrow = ({ onClick }) => {
    return (
        <div className="arrow next" onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    );
};

export default NextArrow;