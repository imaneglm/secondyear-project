import React, { useState } from 'react';
import { ImQrcode } from 'react-icons/im';
import axios from 'axios';
import '../pagesstyle/qr.css';

function Qr() {
  // needed fields declaration
  const [packageId, setPackageId] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  // Handle input field changes
  const handleInputChange = (e) => {
    setPackageId(e.target.value);
  };
  // Handle QR code generation
  const handleGenerateQRCode = async () => {
    setError('');
    setQrCode('');
    if (!packageId) {
      setError('Package ID is required.');
      return;
    }
    // Get packages from localStorage
    const packages = JSON.parse(localStorage.getItem('packages')) || [];
    // Check if the entered package ID belongs to that customer
    const matchedPackage = packages.find(
      pkg => String(pkg.package_id) === String(packageId)
    );
    if (!matchedPackage) {
      setError('you entered the package_id that not yours.');
      return;
    }
    try {
      // Send request to backend to generate QR code
      const response = await axios.post('http://localhost:5000/api/qr/generate-qr', {
        package_id: packageId
      });
      if (response.data.success) {
        setQrCode(response.data.qrCode); // Set QR code image URL
      } else {
        setError(response.data.error || 'Failed to generate QR code.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate QR code.');
    }
  };

  return (
    <div className="qr-container">
      <div className="qr-side">
        <ImQrcode size={300} />
      </div>
      <div className="qr-side">
        <h2>Your Package QR Code</h2>
        <p>Enter the package ID below. It must belong to your account:</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerateQRCode();
          }}
        >
          <label htmlFor="package-id">Package ID</label>
          <input
            type="number"
            id="package-id"
            value={packageId}
            onChange={handleInputChange}
            placeholder="Enter package ID"
          />
          <button type="submit">Generate QR Code</button>
        </form>
        {/*handling errors */}
        {error && <p className="error">{error}</p>}
       {qrCode && (
  <div>
    <h3>Generated QR Code:</h3>
    <img src={qrCode} alt="QR Code" />
    {/*display the qr code of intered package */}
  </div>
        )}
      </div>
    </div>
  );
}
export default Qr;