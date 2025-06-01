import React from 'react';
import '../pagesstyle/ouroffices.css'; 
// Set of the offers including title and other important details 
const Ouroffers = () => {
  const offers = [
    {
      id: 1,
      title: "Starter Package",
      packages: "10 Packages",
      timeframe: "Under 1 Month",
      discount: "5%",
      description: " for small businesses or our loyal customers",
      colorClass: "blue",
      popular: false
    },
    {
      id: 2,
      title: "Growth Package",
      packages: "25 Packages",
      timeframe: "Under 2 Months",
      discount: "8%",
      description: "Ideal for growing businesses expanding their reach",
      colorClass: "green",
      popular: true // the most popular offer
    },
    {
      id: 3,
      title: "Business Package",
      packages: "50 Packages",
      timeframe: "Under 3 Months",
      discount: "10%",
      description: "Comprehensive solution for established businesses",
      colorClass: "orange",
      popular: false
    },
    {
      id: 4,
      title: "Enterprise Package",
      packages: "100+ Packages",
      timeframe: "Under 6 Months",
      discount: "15%",
      description: "Ultimate package for large-scale operations",
      colorClass: "purple",
      popular: false
    }
  ];
  return (
    <div className="offers-container">
      <div className="container">
        {/* Section header */}
        <div className="header">
          <h1 className="main-title">Our Offers</h1>
          <p className="subtitle">
            Browse the offers of our company. Save money with our wonderful discounts.
          </p>
          {/* Badge highlighting limited-time nature */}
          <div className="limited-badge">
            <svg className="star-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Limited Time Offers
          </div>
        </div>
        {/* display of each offer with the following details */}
        <div className="offers-grid">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`offer-card ${offer.colorClass} ${offer.popular ? 'popular' : ''}`}
            >
              {/*  marked as the most popular offer label */}
              {offer.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              {/* Offer content section */}
              <div className="offer-content">
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-description">{offer.description}</p>
                <div className="offer-details">
                  <div className="package-count">{offer.packages}</div>
                  <div className="timeframe">{offer.timeframe}</div>
                </div>
                {/* Discount percentage of each offer*/}
                <div className={`discount-value ${offer.colorClass}-text`}>
                  {offer.discount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Ouroffers;