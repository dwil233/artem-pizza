import React, { createContext, useState, useContext, useEffect } from "react";
import { getIngredientTypes } from "./shared/products.api";

const TypesContext = createContext(null);

export function TypesProvider({ children }) {
  const [types, setTypes] = useState([]);

  console.log("TYPESPROVIDER", Date.now());

  useEffect(() => {
    try {
      getIngredientTypes().then((types) => {
        setTypes(types);
      });
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  return (
    <TypesContext.Provider value={{ types }}>{children}</TypesContext.Provider>
  );
}

export const useTypes = () => useContext(TypesContext);
