import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function UserLogin() {
  let [email, setemail] = useState("")
  let [password, setpassword] = useState("")
  let [loading, setLoading] = useState(false);

  let nav = useNavigate()
  function verify(e) {
    e.preventDefault()
    setLoading(true);
    axios.post(`http://deepmindstech.in:8080/api/users/verify-by-email?email=${email}&password=${password}`)
      .then((res) => {
        alert("Login Successfull")
        console.log(res.data.data);
        localStorage.setItem("User", JSON.stringify(res.data.data))
        const from =  '/search-bus';
        nav(from);
        setLoading(false);

      })
      .catch((err) => {
        alert("Login Fail")
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <div className='AdminLogin'>
      <form onSubmit={verify} action="">
        <label htmlFor="">
          email
        </label>
        <input type="text" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder='Enter the email' required />
        <label htmlFor="">
          Password
        </label>
        <input type="password" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder='Enter the password' required />
        <button className='btn btn-primary' type="submit">
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Login'
          )}
        </button>
      </form>
      <p><Link to="/user-forgot-password">Forgot Password ?</Link></p>
      <p>Are you the new user ? <Link to="/usersignup">Register here..</Link></p>
    </div>
  )
}
