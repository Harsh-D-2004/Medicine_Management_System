import React, { useState } from "react";
import { getMedicineByName } from "../services/MedicineService";
import axios from "axios";

const Header = ({ setMedicines }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      
      const response = await getMedicineByName(searchQuery);
      console.log(response.data);
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <header className="bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold text-uppercase mb-0">
              Emcure Pharmaceuticals
            </h1>
            <p className="mb-0">Pharmacy Management System</p>
          </div>
          <div className="col-md-6">
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
