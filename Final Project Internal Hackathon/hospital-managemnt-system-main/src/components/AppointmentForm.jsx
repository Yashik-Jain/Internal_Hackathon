import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";

const AppointmentForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || "",
    lastName: user?.name?.split(' ')[1] || "",
    email: user?.email || "",
    phone: "",
    appointmentDate: "",
    department: "Pediatrics",
    doctorName: "",
    address: "",
    symptoms: "",
    preferredTime: "morning"
  });

  const departments = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const departmentDoctors = {
    pediatrics: [
      "Dr. Neha Malhotra",
      "Dr. Rahul Kapoor",
      "Dr. Deepa Iyer"
    ],
    orthopedics: [
      "Dr. Amit Kumar",
      "Dr. Meera Reddy",
      "Dr. Suresh Verma"
    ],
    cardiology: [
      "Dr. Rajesh Sharma",
      "Dr. Priya Patel",
      "Dr. Arun Mehta"
    ],
    neurology: [
      "Dr. Sanjay Gupta",
      "Dr. Anita Desai",
      "Dr. Vikram Singh"
    ],
    dermatology: [
      "Dr. Kavita Shah",
      "Dr. Arjun Nair",
      "Dr. Pooja Joshi"
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.appointmentDate || !formData.department || !formData.doctorName || !formData.symptoms) {
      toast.error("Please fill all required fields");
      return;
    }

    // Create appointment object
    const appointment = {
      id: uuidv4(),
      ...formData,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    // Get existing appointments from localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Add new appointment
    localStorage.setItem('appointments', JSON.stringify([...existingAppointments, appointment]));

    // Show success message
    toast.success("Appointment scheduled successfully!");
    
    // Navigate to confirmation page
    navigate(`/congo/${appointment.id}`);
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Schedule an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleInputChange}
            required
          />
          <select
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleInputChange}
            required
          >
            <option value="morning">Morning (9 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (1 PM - 5 PM)</option>
            <option value="evening">Evening (6 PM - 9 PM)</option>
          </select>
        </div>

        <div className="form-row">
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            name="doctorName"
            value={formData.doctorName}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Doctor</option>
            {departmentDoctors[formData.department.toLowerCase()]?.map(doctor => (
              <option key={doctor} value={doctor}>{doctor}</option>
            ))}
          </select>
        </div>

        <textarea
          name="symptoms"
          placeholder="Please describe your symptoms"
          value={formData.symptoms}
          onChange={handleInputChange}
          required
          rows="4"
        />

        <textarea
          name="address"
          placeholder="Your Address"
          value={formData.address}
          onChange={handleInputChange}
          required
          rows="3"
        />

        <button type="submit" className="submit-button">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
