import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaPrint } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';

// const navigate=useNavigate();
const Congo = () => {
  const { uuidv4 } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    // Get appointments from localStorage
    const appointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    const currentAppointment = appointments.find((app) => app.id === uuidv4);
    setAppointment(currentAppointment);
  }, [uuidv4]);

  const handlePrint = () => {
    const printContent = document.getElementById("printable-content");
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    // navigate("/congo")
    // window.location.reload(); // Reload to restore React functionality
  };

  if (!appointment) {
    return (
      <div className="container confirmation-page">
        <h2>Appointment Not Found</h2>
        <p>Sorry, we couldn't find your appointment.</p>
        <Link to="/appointment" className="back-button">
          Book New Appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="congrats-container">
      <FaCheckCircle className="congrats-icon" />
      <h1>Congratulations!</h1>
      <p>Your appointment has been successfully Booked.</p>
      <div id="printable-content">
        <div className="confirmation-details">
          <p>
            <strong>Appointment ID:</strong> {appointment.id}
          </p>
          <p>
            <strong>Patient Name:</strong> {appointment.firstName}{" "}
            {appointment.lastName}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(appointment.appointmentDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong>{" "}
            {appointment.preferredTime === "morning"
              ? "9 AM - 12 PM"
              : appointment.preferredTime === "afternoon"
              ? "1 PM - 5 PM"
              : "6 PM - 9 PM"}
          </p>
          <p>
            <strong>Department:</strong> {appointment.department}
          </p>
          <p>
            <strong>Doctor:</strong> {appointment.doctorName}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="status-pending">{appointment.status}</span>
          </p>
        </div>

        <div className="instructions">
          <h3>Next Steps:</h3>
          <ol>
            <li>Please arrive 15 minutes before your scheduled time</li>
            <li>Bring any relevant medical records or test results</li>
            <li>Don't forget to bring a valid ID</li>
            <li>
              If you need to cancel or reschedule, please contact us at least 24
              hours in advance
            </li>
          </ol>
        </div>
      </div>

      <div className="confirmation-actions">
        <Link to="/" className="home-button">
          Return to Home
        </Link>
        <Link to="/appointment" className="book-another-button">
          Book Another Appointment
        </Link>
        <button onClick={handlePrint} className="print-button">
          <FaPrint className="print-icon" /> Print
        </button>
      </div>
    </div>
  );
};

export default Congo;
