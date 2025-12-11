"use client";
import { createContext, useState } from "react";

export const ValuesContext = createContext();

export const ValuesProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <ValuesContext.Provider value={{ openSidebar, setOpenSidebar }}>
      {children}
    </ValuesContext.Provider>
  );
};
