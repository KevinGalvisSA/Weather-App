import React from "react";
import './slide_button.css'

function Buttons({ isScrolled }) {
    return (
        <div className={`slide_buttons ${isScrolled ? 'buttons-sticky' : ''}`}>
            <button>Today</button>
            <button>Tomorrow</button>
            <button>10 days</button>
        </div>
    );
}

export default Buttons;
