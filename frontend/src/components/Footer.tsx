import React from 'react';
const Footer = () => (
  <footer className="bg-gray-800 text-white mt-8">
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <h4 className="font-bold">Get to Know Us</h4>
          <ul>
            <li>About</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">Make Money with Us</h4>
          <ul>
            <li>Sell on MyAmazon</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">Let Us Help You</h4>
          <ul>
            <li>Help</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 text-sm">© MyAmazon - Demo</div>
    </div>
  </footer>
);
export default Footer;
