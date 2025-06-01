//the layout for the services block that lead to other features page
import React from 'react';
import'./services.css';
import { IoMdNotifications}  from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { BsQrCode } from "react-icons/bs";
import { GoHeartFill } from "react-icons/go";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
//  each service name , small description and symbol  and path
const services =[
    { path: '/notifications',name: 'Notification',icon:<IoMdNotifications size={50}/>,describ:'see what new each time' },
    {path :'/feedback', name:'Feedback',icon :<VscFeedback size={50}/>,describ:'Rate our service'},
    {path :'/qrscanner', name:'QR Scanner',icon:<BsQrCode size={50}/>,describ:'details about your package'},
    {path :'/prefrences', name:'Prefrences',icon:<GoHeartFill size={50}/>,describ:'enter your delivery prefrences'},
    {path :'/time', name:'Time Of Arrival',icon:<MdOutlineAccessTimeFilled size={30} />,describ:'know when to expecte your package'}   
]

function Services(){  
return(
    <div className='Services'>
        {services.map (service =>(
     <Link key={service.path} to={service.path} className='servicescard'>
     <h3  className='servicename'>{service.name}</h3>
     <p className='servicedesrib'>{service.describ}</p>
     <div className='serviceicon'>{service.icon}</div>
     </Link>
        ))}
    </div>
);
}
export default Services;