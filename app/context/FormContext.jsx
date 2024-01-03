"use client";
import { createContext, useCallback, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { FormReducer } from "../reducer/formReducer";
import { DEFAULT_STATE } from "../reducer/state";

export const FormContext = createContext();

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormContextProvider");
  }
  return context;
}

export function FormProvider({ lensType, children }) {
  const [state, dispatch] = useImmerReducer(FormReducer, DEFAULT_STATE);

  const handleChange = useCallback(
    (name, newValue) => {
      dispatch({
        key: name,
        payload: { newValue },
      });
    },
    [dispatch]
  );

  const resetError = useCallback(
    (name) => {
      dispatch({
        key: name,
        payload: { newValue: "", error: '' },
      });
    },
    [dispatch]
  );

  return (
    <FormContext.Provider
      value={{ state, handleChange, dispatch, lensType, resetError }}
    >
      {children}
    </FormContext.Provider>
  );
}
