// the home page hero section code
import React from 'react';
import'./herosection.css';
import Heroimg from"../assets/heroimg.jpg";

function Herosection(){
return(  
      //inserting images and the text      
      <div className='Herosection'>
        <div className='right'>
        <img  src={Heroimg} alt='main'/>
        </div>
        <div className='Herosectiontext'>
        <h1>Welcome to Our Company Website</h1>
             <p>Track your packages in real time, stay informed every step</p>
             <p> of the way, and take advantage of our smart delivery tools.Discover a range </p>
             <p>of powerful features designed to make your shipping experience faster, easier, and more reliable.</p>    
         </div>
      </div>
);
}
export default Herosection;