import { Navigate } from 'react-router-dom';

export default function Protect({ Child, role }) {
  const adminLoggedIn = localStorage.getItem("Admin");
  const userLoggedIn = localStorage.getItem("User");

  const verifyAdmin = () => adminLoggedIn !== null;
  const verifyUser = () => userLoggedIn !== null;

  if (role === "admin" && !verifyAdmin()) {
    return <Navigate to='/adminlogin' replace />;
  }

  if (role === "user" && !verifyUser()) {
    return <Navigate to='/userlogin' replace />;
  }

  return <Child />;
}





// import { Navigate } from 'react-router-dom';

// export default function Protect({ Child }) {
//   let adminLoggedIn = localStorage.getItem("Admin");
//   let userLoggedIn = localStorage.getItem("User");

//   function verifyAdmin() {
//     return adminLoggedIn !== null; 
//   }

//   function verifyUser() {
//     return userLoggedIn !== null; 
//   }

//   if (!verifyUser() && !verifyAdmin()) {
//     return <Navigate to='/userlogin' replace />;
//   }

//   if (verifyUser()) {
//     return <Child />;
//   }

//   if (verifyAdmin()) {
//     return <Navigate to='/adminlogin' replace />;
//   }

//   return <Child />;
// }
