import React, { useState } from "react";
import "../Styles/AdminSignup.css";
import axios from "axios";

export default function AdminSignUp() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [phone, setPhone] = useState("");
  let [gst_number, setGstNo] = useState("");
  let [travels_name, setTravel] = useState("");

  const addAdmin = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      name,
      email,
      password,
      phone,
      gst_number,
      travels_name,
    });

    try {
      const response = await axios.post(`http://localhost:8080/api/admins`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log(response);
        alert("New Admin Has Been Added Successfully! Please activate your admin account by clicking on link sent to your email");
        return; // Prevent further execution after success
      }
      console.error("Unexpected response status:", response.status);
      alert(`An error occurred. Status code: ${response.status}. Please try again.`); // More specific message
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please check your details and try again.");
    }
  };

  return (
    <div className="AdminSignUp">
      <form onSubmit={addAdmin} action="">
        <label htmlFor="">Name</label>
        <input
          type="text"
          required
          placeholder="Enter the Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          required
          placeholder="Enter the Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Phone</label>
        <input
          type="tel"
          pattern="[0-9]{10}"
          required
          placeholder="Enter the Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="">gst_no</label>
        <input
          type="text"
          required
          placeholder="Enter the gst_no "
          value={gst_number}
          onChange={(e) => setGstNo(e.target.value)}
        />
        <label htmlFor="">Travels_Name</label>
        <input
          type="text"
          required
          placeholder="Enter the Travels_Name"
          value={travels_name}
          onChange={(e) => setTravel(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password" // Change to password for security
          required
          placeholder="Enter the Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-danger">Register</button>
      </form>
    </div>
  );
}

