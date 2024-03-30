import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMedicinebyId2 } from "../services/MedicineService";
import { getMedicineList, deleteMedicine } from "../services/MedicineService";
import { useNavigate } from "react-router-dom";

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
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };

  if (isLoading) {
    return <p className="text-muted">Loading medicine...</p>;
  }

  if (!medicineDetails) {
    return <p className="text-muted">No medicine found.</p>;
  }

  function updateMedicine(id) {
    navigator(`/updateMedicine/${id}`);
  }

  function deleteMedicinebyId(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete this medicine?");
    if (isConfirmed) {
      deleteMedicine(id)
        .then((response) => {
          if (response.status === 200) {
            alert("Deleted Successfully");
            window.location.reload();
          } else {
            alert("Fail to Delete");
          }
        });
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
         <div className="mb-3">
          <h4 className="fw-bold mb-0">Search Results : </h4>
        </div>
          <div key={medicineDetails.id} className="col">
            <div className="card h-100 custom-card">
              <div className="card-body">
                <h2 className="card-title fw-bold fs-5 mb-3" style={{ fontFamily: "'Roboto', sans-serif" }}>{medicineDetails.name}</h2>
                <p className="card-text mb-1">Price: {medicineDetails.price} Rs</p>
                <p className="card-text mb-1">Dosage: {medicineDetails.dosage}</p>
                <p className="card-text mb-1">Manufacturer: {medicineDetails.manufacturer}</p>
                <p className="card-text mb-1">Expiry Date: {formatDate(medicineDetails.expiryDate)}</p>
                <p className="card-text mb-1">Shelf Address: {medicineDetails.shelfAddress}</p>
                <p className="card-text mb-1">Stock: {medicineDetails.quantityInStock}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-primary"
                  onClick={() => updateMedicine(medicineDetails.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMedicinebyId(medicineDetails.id)}
                >
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
