// import dotenv from 'dotenv';
// dotenv.config();
import "./CreateGame.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LINK_BACKEND = "http://localhost:3001";

const Login: React.FC = () => {
    const navigate = useNavigate();

  // Error modal (popin)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [nbCard, setNbcard] = useState<number>(2);

  const handlSetNbCardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNbcard(Number(e.target.value)); // Convert the string value to a number
  };
  const startGame = async () => {
    try {
        const userID = localStorage.getItem("userID");
        const userToken = localStorage.getItem("userToken");

       const response = await axios.post(LINK_BACKEND + "/game/startGame", {
        IDPlaying: userID,
        IDAdmin: '',
        nuberCardAutobahn: nbCard,
        userPoints:{}
       },{
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      })
      if (response.status === 200){
  
      }

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Server responded with an error:", error.response?.data);
        setErrorMessage(error.response?.data || "An error occurred.");
      } else {
        console.error("Error during login:", error);
        setErrorMessage("An unexpected error occurred.");
      }
      setIsModalOpen(true);
    }
  };
  return (
    <div className="NewGame-container">
      <div className="NewGame-form">
        <h1 className="NewGame-Header">Create a new game</h1>
        <label>
          Number of Cards:
          <select value={nbCard} onChange={handlSetNbCardChange}>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </label>

        <button className="NewGame-button" onClick={startGame}>
          Start game
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;