import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../pagesstyle/map.css'; 

// set office locations 
const Offices = [
  { wilaya: "Algiers", lat: 36.75, lng: 3.04 },
  { wilaya: "Oran", lat: 35.6971, lng: -0.6308 },
  { wilaya: "Constantine", lat: 36.365, lng: 6.6147 },
  { wilaya: "Blida", lat: 36.47, lng: 2.8333 },
  { wilaya: "Annaba", lat: 36.9, lng: 7.7667 },
  { wilaya: "Tlemcen", lat: 34.8828, lng: -1.3160 },
  { wilaya: "Bejaia", lat: 36.75, lng: 5.07 },
  { wilaya: "Setif", lat: 36.1867, lng: 5.4128 },
  { wilaya: "Batna", lat: 35.55, lng: 6.1667 },
  { wilaya: "Biskra", lat: 34.85, lng: 5.7333 },
  { wilaya: "Ghardaia", lat: 32.49, lng: 3.67 },
  { wilaya: "Tizi Ouzou", lat: 36.7167, lng: 4.05 },
];

function Mappage() {
  const mapRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    if (mapRef.current) return;
    //create the map
    const map = L.map('leaflet-map').setView([28.0339, 1.6596], 6);
    mapRef.current = map;
    //OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    // red marker icon
    const redIcon = new L.Icon({
      iconUrl: 'https://img.icons8.com/ios-filled/50/ff0000/marker.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });
    //  markers for each office location
    Offices.forEach((loc, index) => {
      L.marker([loc.lat, loc.lng], { icon: redIcon })
        .addTo(map)
        .bindPopup(`<strong>${loc.wilaya}</strong><br/>  Office  #${index + 1}`);
    });
  }, []);
//searching for offices in map 
  const handleSearch = (e) => {
    e.preventDefault();
    const match = Offices.find(
      (office) => office.wilaya.toLowerCase() === searchTerm.toLowerCase()
    );
    if (match && mapRef.current) {
      mapRef.current.setView([match.lat, match.lng], 10);
    } else {
      alert('Wilaya not found!');
    }
  }; 

  return (
    <div className='mapcon' >
      <h2> Our Offices Locations </h2>
       <div className='searchbar'>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by wilaya name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
      </div>
      <div id="leaflet-map" className="map-wrapper" />
    </div>
  );
}
export default Mappage;