import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export const BMIContext = createContext();

// eslint-disable-next-line react/prop-types
export const BMIProvider = ({ children }) => {
  const [bmiList, setBMIList] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchBMIList = async () => {
      try {
        const response = await axios.get(
          "https://6450b0c5a3221969114f68c0.mockapi.io/api/loginRegister/bmi"
        );
        const filteredBMIList = response.data.filter(
          (data) => data.userId === currentUser.id
        );
        setBMIList(filteredBMIList);
      } catch (error) {
        console.error(error);
      }
    };

    if (currentUser) {
      fetchBMIList();
    }
  }, [currentUser]);

  const addBMIEntry = async (newBMIEntry) => {
    try {
      const response = await axios.post(
        "https://6450b0c5a3221969114f68c0.mockapi.io/api/loginRegister/bmi",
        newBMIEntry
      );

      setBMIList([...bmiList, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BMIContext.Provider value={{ bmiList, addBMIEntry }}>
      {children}
    </BMIContext.Provider>
  );
};
