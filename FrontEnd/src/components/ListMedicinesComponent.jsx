import React, { useState, useEffect } from "react";
import { getMedicineList, deleteMedicine } from "../services/MedicineService";
import { useNavigate } from "react-router-dom";
import "./MedicinalItems.css";
import { FaMoneyBillAlt, FaCapsules, FaIndustry, FaCalendarAlt, FaWarehouse } from "react-icons/fa";

const MedicinalItems = () => {
  const [medicines, setMedicines] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await getMedicineList();
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  const addMedicine = () => {
    navigator("/addMedicine");
  };

  const updateMedicine = (id) => {
    navigator(`/updateMedicine/${id}`);
  };

  const deleteMedicinebyId = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this medicine?");
    if (isConfirmed) {
      try {
        const response = await deleteMedicine(id);
        if (response.status === 200) {
          alert("Deleted Successfully");
          fetchMedicines();
        } else {
          alert("Failed to Delete");
        }
      } catch (error) {
        console.error("Error deleting medicine:", error);
      }
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 fw-bold mb-0" style={{ fontFamily: "'Roboto', sans-serif" }}>
          Medicinal Items
        </h1>
        <button className="btn btn-primary" onClick={addMedicine}>
          Add Medicine
        </button>
      </header>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="col">
            <div className="card h-100 shadow-sm medicine-card">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {medicine.id}. {medicine.name}
                </h5>
                <div className="card-text mb-1">
                  <FaMoneyBillAlt /> Price: {medicine.price} Rs
                </div>
                <div className="card-text mb-1">
                  <FaCapsules /> Dosage: {medicine.dosage}
                </div>
                <div className="card-text mb-1">
                  <FaIndustry /> Manufacturer: {medicine.manufacturer}
                </div>
                <div className="card-text mb-1">
                  <FaCalendarAlt /> Expiry Date: {formatDate(medicine.expiryDate)}
                </div>
                <div className="card-text mb-1">
                  <FaWarehouse /> Shelf Address: {medicine.shelfAddress}
                </div>
                <div className="card-text mb-1">
                  <FaWarehouse /> Stock: {medicine.quantityInStock}
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <button className="btn btn-outline-primary btn-sm" onClick={() => updateMedicine(medicine.id)}>
                  Update
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => deleteMedicinebyId(medicine.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default MedicinalItems;
