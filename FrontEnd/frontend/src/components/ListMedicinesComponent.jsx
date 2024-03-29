import React, { useState, useEffect } from "react";
import { getMedicineList, deleteMedicine } from "../services/MedicineService";
import { useNavigate } from "react-router-dom";
import './MedicinalItems.css'

const MedicinalItems = () => {
  const [medicines, setMedicines] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await getMedicineList();
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  function addMedicine() {
    navigator("/addMedicine");
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
      <div className="row mb-4">
        <div className="col text-center">
          <h1 className="display-4 fw-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>Medicinal Items</h1>
          <button
            className="btn btn-success btn-lg mt-3"
            onClick={addMedicine}
          >
            Add Medicine
          </button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="col">
            <div className="card h-100 custom-card">
              {/* <img src={medicine.image} className="card-img-top" alt={medicine.name} /> */}
              <div className="card-body">
                <h2 className="card-title fw-bold fs-5 mb-3" style={{ fontFamily: "'Roboto', sans-serif" }}>{medicine.name}</h2>
                <p className="card-text mb-1">Price: ${medicine.price}</p>
                <p className="card-text mb-1">Dosage: {medicine.dosage}</p>
                <p className="card-text mb-1">Manufacturer: {medicine.manufacturer}</p>
                <p className="card-text mb-1">Expiry Date: {formatDate(medicine.expiryDate)}</p>
                <p className="card-text mb-1">Shelf Address: {medicine.shelfAddress}</p>
                <p className="card-text mb-1">Stock: {medicine.quantityInStock}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-primary"
                  onClick={() => updateMedicine(medicine.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMedicinebyId(medicine.id)}
                >
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

// Function to format the date to dd-mm-yyyy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default MedicinalItems;
