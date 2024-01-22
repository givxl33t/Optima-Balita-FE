/* eslint-disable react/prop-types */
import { createContext } from "react";
import { fetchConsultants } from "../utils/api";
import { useQuery } from "react-query";

export const ConsultantContext = createContext();

export const ConsultantProvider = ({ children }) => {
  const { data: consultants, isLoading, refetch } = useQuery(
    ["consultants"],
    fetchConsultants,
    {
      retry: false
    }
  );

  const value = {
    consultants,
    isLoading,
    refetch
  };

  return (
    <ConsultantContext.Provider value={value}>
      {children}
    </ConsultantContext.Provider>
  );
}
