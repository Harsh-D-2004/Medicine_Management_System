import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMedicinebyId2, deleteMedicine } from "../services/MedicineService";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillAlt, FaCapsules, FaIndustry, FaCalendarAlt, FaWarehouse } from "react-icons/fa";

const SearchResult = () => {
  const { medicineId } = useParams();
  const [medicineDetails, setMedicineDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchMedicineDetails = async () => {
      try {
        const response = await getMedicinebyId2(medicineId);
        response.data.expiryDate = formatDate(response.data.expiryDate);
        setMedicineDetails(response.data);
      } catch (error) {
        console.error("Error fetching medicine by ID:", error);
      }
      setIsLoading(false);
    };
    fetchMedicineDetails();
  }, [medicineId]);

  const formatDate = (dateString) => {
    const dateParts = dateString.split("T")[0].split("-");
    const [year, month, day] = dateParts;
    return `${day}-${month}-${year}`;
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

  if (isLoading) {
    return <p className="text-muted">Loading medicine...</p>;
  }

  if (!medicineDetails) {
    return <p className="text-muted">No medicine found.</p>;
  }

  const updateMedicine = (id) => {
    navigator(`/updateMedicine/${id}`);
  };

  return (
<div className="container mt-5 mb-5">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      <h4 className=" fw-bold mb-0" style={{ fontFamily: "'Roboto', sans-serif" }}>
          Search Results : 
        </h4>
          <div key={medicineDetails.id} className="col">
            <div className="card h-100 shadow-sm medicine-card">
              <div className="card-body">
                <h5 className="card-title fw-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {medicineDetails.id}. {medicineDetails.name}
                </h5>
                <div className="card-text mb-1">
                  <FaMoneyBillAlt /> Price: {medicineDetails.price} Rs
                </div>
                <div className="card-text mb-1">
                  <FaCapsules /> Dosage: {medicineDetails.dosage}
                </div>
                <div className="card-text mb-1">
                  <FaIndustry /> Manufacturer: {medicineDetails.manufacturer}
                </div>
                <div className="card-text mb-1">
                  <FaCalendarAlt /> Expiry Date: {formatDate(medicineDetails.expiryDate)}
                </div>
                <div className="card-text mb-1">
                  <FaWarehouse /> Shelf Address: {medicineDetails.shelfAddress}
                </div>
                <div className="card-text mb-1">
                  <FaWarehouse /> Stock: {medicineDetails.quantityInStock}
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <button className="btn btn-outline-primary btn-sm" onClick={() => updateMedicine(medicineDetails.id)}>
                  Update
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => deleteMedicinebyId(medicineDetails.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default SearchResult;
