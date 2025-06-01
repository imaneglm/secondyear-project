import React, { useEffect, useState, useCallback } from 'react';
import '../pagesstyle/adminh.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import axios from 'axios';

function Adminh() {
  const [packages, setPackages] = useState([]);
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [revenue, setRevenue] = useState(0);
// Popup states
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  
  // Package form data
  const [packageForm, setPackageForm] = useState({
    customer_name: '',
    pickup_address: '',
    delivery_address: '',
    package_type: '',
    weight: '',
    dimensions: '',
    priority: 'standard',
    special_instructions: '',
    estimated_cost: ''
  });
  
  // User form data
  const [userForm, setUserForm] = useState({
    user_name: '',
    email: '',
    password: '',
    phone_number: '',
    role: 'customer'
  });
const fetchPackages = () => {
    axios.get('http://localhost:5000/api/Admin/packages/')
      .then(res => setPackages(res.data))
      .catch(err => console.error('Error fetching packages:', err));
  };
  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/Admin/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  };


  const fetchFeedbacks = () => {
    axios.get('http://localhost:5000/api/feedback/feedbacks')
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error('Error fetching feedbacks:', err));
  };

  const fetchRevenue = useCallback((period = selectedPeriod) => {
    axios.get(`http://localhost:5000/api/Admin/revenue?period=${period}`)
      .then(res => {
        const data = res.data;
        let profit = 0;

        if (period === 'day') profit = data.today;
        else if (period === 'week') profit = data.week;
        else if (period === 'month') profit = data.month;

        setRevenue(profit || 0);
      })
      .catch(err => console.error('Error fetching revenue:', err));
  }, [selectedPeriod]);
 const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
    fetchUsers();
    fetchFeedbacks();
    fetchRevenue();

    const intervalId = setInterval(() => {
      fetchFeedbacks();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fetchRevenue]);

  const handleSearchChange = async (e) => {
    const q = e.target.value;
    setSearchQuery(q);

    if (q.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/Admin/search-packages?q=${q}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error('Error searching packages:', err);
      setSearchResults([]);
    }
  };

  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setSelectedPeriod(newPeriod);
    fetchRevenue(newPeriod);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  // Package form handlers
  const handlePackageFormChange = (e) => {
    const { name, value } = e.target;
    setPackageForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleCreatePackage = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/Admin/create-package', packageForm);
      setShowPackageModal(false);
      setPackageForm({
        weight: '',
        description: '',
        handling: '',
        price: '',
        category: '',
        total_price: '',
        droplocation:'',
        pickuplocation: '',
        office_id: '',
        pck_state:'',
        preferences:'',
        customer_id:'',
        Return:'',
        date:''
      });
      fetchPackages(); // Refresh packages list
      alert('Package created successfully!');
    } catch (err) {
      console.error('Error creating package:', err);
      alert('Error creating package. Please try again.');
    }
  };
  // User form handlers
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/Admin/users', userForm);
      setShowUserModal(false);
      setUserForm({
        user_name: '',
        email: '',
        password: '',
        phone_number: '',
        role: 'customer'
      });
      fetchUsers(); // Refresh users list
      alert('User created successfully!');
    } catch (err) {
    // ✅ Show server response message if available
    if (err.response && err.response.data && err.response.data.message) {
      alert(err.response.data.message);
    } else {
      alert('Error creating user. Please try again.');
    }
  }
};

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <img src={Logo} alt="company logo" />
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Packages</li>
            <li>Create Package</li>
            <li>User & Worker Management</li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </aside>

      <main className="main-content">
        <header className="overview-header">
          <h1>Dashboard Overview</h1>
          <select value={selectedPeriod} onChange={handlePeriodChange}>
            <option value="day">This Day</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </header>

        <section className="summary-cards">
          <div className="card">
            <h3>Total Packages</h3>
            <p>{packages.length}</p>
          </div>
          <div className="card">
            <h3>New Users</h3>
            <p>{users.length}</p>
          </div>
          <div className="card">
            <h3>Revenue ({selectedPeriod})</h3>
            <p>{revenue.toLocaleString()} DA</p>
          </div>
        </section>

       <section className="admin-packages">
          <div className="admin-packages-header">
            <h2>Packages</h2>
            <button onClick={() => setShowPackageModal(true)}>Create Package</button>
          </div>

          <input
            type="text"
            placeholder="Search by customer name..."
            className="search-bar"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          {searchResults.length > 0 && (
            <div className="table-container">
              <h4>Search Results:</h4>
              <table>
                <thead>
                  <tr>
                    {Object.keys(searchResults[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((pkg) => (
                    <tr key={pkg.id || pkg.package_id}>
                      {Object.values(pkg).map((val, i) => (
                        <td key={i}>{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="admin-table">
            <h4>All Packages:</h4>
            <table>
              <thead>
                <tr>
                  {packages.length > 0 &&
                    Object.keys(packages[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.id || pkg.package_id}>
                    {Object.values(pkg).map((value, idx) => (
                      <td key={idx}>{String(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-users">
         <div className="admin-table">
            <h2>User & Worker Management</h2>
            <button onClick={() => setShowUserModal(true)} className="create-user-btn">
              Create New User
              </button>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Joined Date</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.user_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.joined_date ? new Date(user.joined_date).toLocaleDateString() : 'N/A'}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="communication-center">
          <h2>Communication Center</h2>
          <ul>
            {feedbacks.length === 0 ? (
              <li>No feedbacks yet.</li>
            ) : (
              feedbacks.map((fb, index) => (
                <li key={index}>
                  <strong>{fb.name || 'Anonymous'}:</strong> {fb.message || fb.feedback}
                </li>
              ))
            )}
          </ul>
        </section>
      </main>
      {/* Package Creation Modal */}
      {showPackageModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Package</h2>
              <button 
                className="modal-close" 
                onClick={() => setShowPackageModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreatePackage} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>pick_state *</label>
                  <input
                    type="text"
                    name="pick_state"
                    value={packageForm.pick_state}
                    onChange={handlePackageFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>category *</label>
                  <select
                    name="category"
                    value={packageForm.category}
                    onChange={handlePackageFormChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="document">Document</option>
                    <option value="parcel">Parcel</option>
                    <option value="fragile">Fragile</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>pickuplocation *</label>
                <textarea
                  name="pickuplocation"
                  value={packageForm.pickuplocation}
                  onChange={handlePackageFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>droplocation *</label>
                <textarea
                  name="droplocation"
                  value={packageForm.droplocation}
                  onChange={handlePackageFormChange}
                  required
                />
              </div>
               <div className="form-group">
                <label>Handling *</label>
                <textarea
                  name="handling"
                  value={packageForm.handling}
                  onChange={handlePackageFormChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={packageForm.weight}
                    onChange={handlePackageFormChange}
                    step="0.1"
                  />
                </div>
                <div className="form-group">
                  <label>price</label>
                  <input
                    type="number"
                    name="dimensions"
                    value={packageForm.dimensions}
                    onChange={handlePackageFormChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Return</label>
                  <select
                    name="Return"
                    value={packageForm.Return}
                    onChange={handlePackageFormChange}
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  
                  </select>
                </div>
                <div className="form-group">
                  <label> total price(DA)</label>
                  <input
                    type="number"
                    name="estimated_cost"
                    value={packageForm.estimated_cost}
                    onChange={handlePackageFormChange}
                    step="0.01"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>office_id</label>
                <input
                  type="number"
                  name="office_id"
                  value={packageForm.office_id}
                  onChange={handlePackageFormChange}
                  
                />
              </div>
              <div className="form-group">
                <label>customer_id</label>
                <input
                  type="number"
                  name="customer_id"
                  value={packageForm.customer_id}
                  onChange={handlePackageFormChange}
                  
                />
              </div>
              
              <div className="form-group">
                <label>Preferences</label>
                <textarea
                  name="special_instructions"
                  value={packageForm.special_instructions}
                  onChange={handlePackageFormChange}
                  placeholder="Any special handling instructions..."
                />
              </div>
              <div className="form-group">
                <label>description</label>
                <textarea
                  name="description"
                  value={packageForm.description}
                  onChange={handlePackageFormChange}
                  placeholder="Any special handling instructions..."
                />
              </div>
              <div className="form-group">
                <label>date</label>
                <textarea
                  name="date"
                  value={packageForm.date}
                  onChange={handlePackageFormChange}
                  
                />
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={() => setShowPackageModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create Package</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Creation Modal */}
      {showUserModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New User</h2>
              <button 
                className="modal-close" 
                onClick={() => setShowUserModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="modal-form">
              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  name="user_name"
                  value={userForm.user_name}
                  onChange={handleUserFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={userForm.email}
                  onChange={handleUserFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={userForm.password}
                  onChange={handleUserFormChange}
                  required
                  minLength="6"
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={userForm.phone_number}
                  onChange={handleUserFormChange}
                  placeholder="e.g., +213 xxx xxx xxx"
                />
              </div>
              
              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={userForm.role}
                  onChange={handleUserFormChange}
                >
                  <option value="customer">Customer</option>
                  <option value="worker">Worker</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="modal-buttons">
                <button type="button" onClick={() => setShowUserModal(false)}>
                  Cancel
                </button>
                <button  type="submit">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Adminh;