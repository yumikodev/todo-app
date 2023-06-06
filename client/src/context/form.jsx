import { createContext, useState } from "react";

const FormContext = createContext();

function FormProvider({ children }) {
  const [data, setData] = useState({
    title: "",
  });

  return (
    <FormContext.Provider value={{ data, setData }}>
      {children}
    </FormContext.Provider>
  );
}

export default FormProvider;
