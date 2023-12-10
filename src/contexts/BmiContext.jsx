// BMIContext.jsx
import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export const BMIContext = createContext();

export const BMIProvider = ({ children }) => {
  const [bmiList, setBMIList] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchBMIList = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found");
          return;
        }

        const { accessToken } = JSON.parse(token);

        const response = await axios.get(
          "https://www.givxl33t.site/api/bmi/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              userId: currentUser.username,
            },
          },
        );

        console.log("BMI List Response:", response.data);

        setBMIList(response.data.data);
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
      const tokenData = JSON.parse(localStorage.getItem("token"));

      if (!tokenData || !tokenData.accessToken) {
        console.error("Token not found or invalid");
        return;
      }

      const response = await axios.post(
        "https://www.givxl33t.site/api/bmi",
        newBMIEntry,
        {
          headers: {
            Authorization: `Bearer ${tokenData.accessToken}`,
          },
        },
      );

      console.log("API Response:", response.data);

      setBMIList((prevBMIList) => [...prevBMIList, response.data]);
    } catch (error) {
      console.error("Error while sending BMI data to API:", error);

      if (error.response) {
        console.error("API Error:", error.response.data);
      }
    }
  };

  return (
    <BMIContext.Provider value={{ bmiList, addBMIEntry }}>
      {children}
    </BMIContext.Provider>
  );
};
