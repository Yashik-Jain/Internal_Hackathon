import React from "react";
import { FaStethoscope } from "react-icons/fa";
import { useNavigate } from 'react-router'


const navigate=useNavigate();

const Pediatrics = () => {
  return (
    <div className="pediatrics-container">
      <FaStethoscope className="pediatrics-icon" />
      <h1>Welcome to the Pediatrics Department</h1>
      <p>Providing compassionate and expert care for children.</p>
      <button className="appointment-button" onClick={() => window.location.href = "/appointment"}>
        Book an Appointment
      </button>
    </div>
  );
};

export default Pediatrics;
