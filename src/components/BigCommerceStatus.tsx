import React from 'react';

const BigCommerceStatus = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">BigCommerce Status</h1>
      <div className="relative" style={{ height: '80vh' }}>
        <iframe 
          src="https://status.bigcommerce.com/"
          title="BigCommerce Status Page"
          className="absolute top-0 left-0 w-full h-full border-0"
        ></iframe>
      </div>
    </div>
  );
};

export default BigCommerceStatus; 