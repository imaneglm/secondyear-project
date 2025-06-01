import React, { useEffect, useState } from 'react';
import '../pagesstyle/deliveryman.css';
import { useNavigate } from 'react-router-dom';
import Logo from'../assets/logo.jpg';
import axios from 'axios';

function Deliveryman ()  {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    // Fake data  since there is no backend for this 
    const samplePackages = [
      { id: 'PKG001', weight: 2.5, price: 25000.0, content: 'Electronics', handling: 'Fragile' },
      { id: 'PKG002', weight: 1.2, price: 1200.0, content: 'Books', handling: 'Standard' },
      { id: 'PKG003', weight: 3.0, price: 3000.0, content: 'Clothing', handling: 'Express' },
    ];
    setPackages(samplePackages);
      axios.get('/api/packages')
      .then(response => setPackages(response.data))
      .catch(error => console.error('Error fetching packages:', error));  
  }, []);
  const navigate = useNavigate();  
    const handleLogout = () => {
     localStorage.removeItem('user');
      navigate('/login');
    };
    return (
    <div className="dashboard-container">
      <aside className="sidebar">
       <img src={Logo} alt='company logo'/> 
        <h2>Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      </aside>
      <main className="main-content">
          <div className="section-header">
            <h2>Packages</h2>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>ID</th><th>Weight</th><th>Price</th><th>Content</th><th>Handling</th></tr>
              </thead>
              <tbody>
                {packages.map(pkg => (
                  <tr key={pkg.id}> 
                    <td>{pkg.id}</td>
                    <td>{pkg.weight} kg</td>
                    <td>{pkg.price}DA</td>
                    <td>{pkg.content}</td>
                    <td>{pkg.handling}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </main>
    </div>
  );
 };
export default Deliveryman;