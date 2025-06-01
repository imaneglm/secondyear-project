import "./App.css";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './users/admin';
import Customer from './users/customer';
import Deliveryman from './users/deliveryman';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user:", parsedUser);
        setUser(parsedUser.user); 
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* if the user not log in it shows only signup and login*/}
        {!user ? (
          <>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/* redirect by the role*/}
            {user.role === 'admin' && (
              <Route path="/*" element={<AdminRoutes />} />
            )}
            {user.role === 'customer' && (
              <Route path="/*" element={<Customer />} />
            )}
            {user.role === 'deliveryman' && (
              <Route path="/*" element={<Deliveryman/>} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
