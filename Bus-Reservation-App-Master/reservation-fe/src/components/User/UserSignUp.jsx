import React, { useState } from "react";
import "../../Styles/AdminSignup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserSignUp() {
  const nav = useNavigate();
  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [gender, setGender] = useState("");
  let [age, setAge] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);

  const addUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data = JSON.stringify({
      name,
      phone,
      email,
      age,
      gender,
      password,
    });

    try {
      const response = await axios.post(`http://deepmindstech.in:8080/api/users`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log(response);
        alert("New User Has Been Added Successfully! Please activate your user account by clicking on link sent to your email");
        nav("/userlogin")
        return; // Prevent further execution after success
      }
      console.error("Unexpected response status:", response.status);
      alert(`An error occurred. Status code: ${response.status}. Please try again.`); // More specific message
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please check your details and try again.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="AdminSignUp">
      {loading ? (
        <div className="spinner-border text-primary" role="status"> {/* Changed here */}
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
      <form onSubmit={addUser} action="">
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
        <label htmlFor="">Gender</label>
        <input
          type="text"
          required
          placeholder="Enter the gender "
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="">age</label>
        <input
          type="number"
          required
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          required
          placeholder="Enter the Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-danger">Register</button>
      </form>
      )}
    </div>
  );
}
