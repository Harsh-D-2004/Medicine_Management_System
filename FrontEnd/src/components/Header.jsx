import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'; // Importing FaSearch icon from react-icons/fa
import axios from "axios";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getMedicineByName = async (searchTerm) => {
    const response = await axios.get(`http://localhost:8080/api/v1/medicine/name/${searchTerm}`);
    let data = response.data;
    if (Array.isArray(data)) {
      return data;
    } else {
      return [data];
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await getMedicineByName(searchQuery);
      const foundMedicine = response.find(
        (medicine) =>
          medicine.name.toLowerCase() === searchQuery.toLowerCase()
      );

      if (foundMedicine) {
        console.log("Searched Medicine:", foundMedicine);
        const url = `/search-result/${foundMedicine.id}`;
        navigate(url);
      } else {
        alert("Medicine not found");
        navigate("/med");
      }
    } catch (error) {
      alert("Medicine Not Found");
      console.log(error);
      navigate("/med");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-dark text-white py-4">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="mb-3">
          <h1 className="fw-bold mb-0">Emcure Pharmaceuticals</h1>
          <h4 className="fw-bold mb-0">Pharmacy Management System</h4>
        </div>
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Medicine"
            aria-label="Search Medicine"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: "200px" }}
            disabled={isLoading}
          />
          <div class="btn-group " role="group" aria-label="Third group">
            <button type="submit" 
            class="btn btn-secondary" 
            disabled={isLoading}
            style={{height:38, alignContent:"center"}}
            ><FaSearch /></button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
