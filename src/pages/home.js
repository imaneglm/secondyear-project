import'../pagesstyle/home.css';
import React from 'react';
//imports the components of this page
import Herosection from '../components/herosection';
import Services from '../components/Services'
import Miniabout from '../components/minabout';

function Home(){
return(
    <div>
    {/* render the components of the home page they are in components folder*/}
       <Herosection/>
       <Miniabout/>
      <Services/>
    </div>
);
}
export default Home;