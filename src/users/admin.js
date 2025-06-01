// users/admin.js
import { Routes, Route } from 'react-router-dom';
import Adminh from '../pages/adminh';

function Admin() {
  return (
    <div className="Admin">
      <Routes>
        <Route path="/" element={<Adminh />} />
      </Routes>
    </div>
  );
}

export default Admin;
