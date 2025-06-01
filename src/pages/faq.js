import React from "react";
import "../pagesstyle/faq.css";
import Faqim from  "../assets/faq.jpeg";
import { Link } from "react-router-dom";
import Askedquestions from "../components/askedquestions";
//devided into two left  the component askedquestions 
// and right image and the link to about us page 
 function Faq (){
      return(      
    <div className="faq">
         <div className="questionside">
              <Askedquestions/>    
         </div>
         <div className="contectusside">
                 <img src={Faqim} alt="faq"/>   
                    <h2>Any Questions ?</h2>        
                 <Link to="/aboutus"> 
                 <p>Contact us and let us konw </p> 
                </Link>
         </div>
    </div>
      );
 }
 export default Faq;