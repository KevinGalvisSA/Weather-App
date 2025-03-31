import { createContext, useState } from "react";

// * Crear el contexto
export const CityContext = createContext();

// * Proveedor de contexto
export function CityProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState("Bucaramanga");

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
}
