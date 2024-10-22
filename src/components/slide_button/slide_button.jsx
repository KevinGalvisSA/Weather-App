import React from "react";
import './slide_button.css'

function Buttons({ isScrolled, onTodayClick, onTenDaysClick }) {
    return (
        <div className={`slide_buttons ${isScrolled ? 'buttons-sticky' : ''}`}>
            <button onClick={onTodayClick}>Today</button>
            <button>Tomorrow</button>
            <button onClick={onTenDaysClick}>10 days</button>
        </div>
    );
}

export default Buttons;
