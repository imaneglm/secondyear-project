//component for the FAQ page has the divided section (photo+ the common question and answers )
import React, { useState } from "react";
import "./askedquestions.css";

function Askedq() {
  // currently visible based on index
  const [visibleIndex, setVisibleIndex] = useState(null);
  const toggleAccordion = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };
//the set of questions an there answers 
  const sections = [
    {
      title: "Who are we?",
      content: "We are OT Company, a private business focused on connecting people and ensuring their items are shipped securely. We work with both small businesses and individuals who need our services."
    },
    {
      title: "How do I track my order?",
      content: "Navigate to the 'Live Tracking' section in the navigation bar. you will see all your packages other details."
    },
    {
      title: "Where can I find my package ID?",
      content: "Your package ID can be found in the 'Live Tracking' section, where you'll see a list of all your packages along with their IDs and details such as weight and shipping status."
    },
    {
      title: "What should I do if my package is delayed?",
      content: "If your package is delayed and you have the correct package ID, please check the tracking information for updates. If the location is not showing or there's an issue, contact our support team anytime they’re here to help."
    },
    {
      title: "What are Preferences?",
      content: "Preferences is a feature we offer that lets you customize your delivery process according to your needs and convenience."
    }
  ];
  //layout
  return (
    <div className="accordion">
      {sections.map((section, index) => (
        <div key={index} className="accordion-item">
          <div
            className="accordion-header"
            onClick={() => toggleAccordion(index)} 
          >
            <span>{section.title}</span>
            <span className="plus">{visibleIndex === index ? "-" : "+"}</span>
          </div>
          <div
            className={`accordion-content ${visibleIndex === index ? "show" : ""}`}
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
}
export default Askedq;