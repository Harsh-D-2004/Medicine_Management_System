import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-uppercase mb-3">About Us</h5>
            <p>
              This is a DBMS project developed by Harsh, Paras, Varad, and Sudesh.
            </p>
          </div>
          <div className="col-md-6">
            <h5 className="text-uppercase mb-3">Contact Us</h5>
            <p>Email: pharma@gmail.com</p>
            <p>Phone: +91 8989898989</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
