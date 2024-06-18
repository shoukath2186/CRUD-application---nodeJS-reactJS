
import React, { useState, createContext, useEffect, useMemo } from "react";

export const ComponentContext = createContext();

const Datas = ({ children }) => {
  const [value, setValue] = useState(() => {
    
    const savedValue = localStorage.getItem('userData');
    return savedValue ? JSON.parse(savedValue) : null;
  });

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(value));
  }, [value]);

  const contextValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <ComponentContext.Provider value={contextValue}>
      {children}
    </ComponentContext.Provider>
  );
};

export default Datas;
