import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function Dropdown1() {
  return (
    <div>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       Account
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/adminhomepage/addbus">AddBus</Dropdown.Item>
        <Dropdown.Item href="/adminhomepage/viewbus">Buses List</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Edit Profile</Dropdown.Item>
        <Dropdown.Item href="/">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  );
}

export default Dropdown1;