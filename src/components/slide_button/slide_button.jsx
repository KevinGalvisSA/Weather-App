import React from "react";
import './slide_button.css'

function Buttons({ isScrolled, onTodayClick, onTenDaysClick }) {
    return (
        <div className={`slide_buttons ${isScrolled ? 'buttons-sticky' : ''}`}> {/* * Aplicar clase sticky para manejo de diseño si se ha desplazado */}
            <button onClick={onTodayClick}>Today</button> {/* * Botón para ver el pronóstico del día actual */}
            <button onClick={onTenDaysClick}>10 days</button> {/* * Botón para ver el pronóstico de 10 días */}
        </div>
    );
}

export default Buttons;
