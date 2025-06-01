// the Services card component give more informations about the company and what it does
import React from 'react';
import { FaTruck } from "react-icons/fa6";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { MdLaptop } from "react-icons/md";
import "./miniabout.css";
// Defines service cards with icons and descriptions for display in the Miniabout section.
const cards = [
  { name: 'Delivering details', icon: <FaTruck size={70} />, describ: 'look_up your packages' },
  {
    name: 'Contact with our office',
    icon: <PiBuildingOfficeDuotone size={70} />,
    describ: 'You will be able to interact with us online',
  },
  {
    name: 'Reception',
    icon: <MdLaptop size={70} />,
    describ: 'Details about your package',
  }
];

function Miniabout() {
  return (
    <div className='Miniabout'>
      <div className='cards'>
        {cards.map((card, index) => (
          <div className='card' key={index}>
            <div className='cardicon'>{card.icon}</div>
            <h3 className='cardname'>{card.name}</h3>
            <p className='carddesrib'>{card.describ}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Miniabout;
