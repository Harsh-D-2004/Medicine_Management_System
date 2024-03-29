import React, { useEffect, useState } from "react";
import { checkIfIdExists, createMedicine, getMedicinebyId, updateMedcine } from "../services/MedicineService";
import { useNavigate, useParams } from "react-router-dom";
import './Medicine.css'

const Medicine = () => {
  const { id: paramId } = useParams();

  const [id, setId] = useState(paramId || "");
  const [name, setName] = useState("");
  const [medId, setMedId] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [dosage, setDosage] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantityInStock, setQuantityInStock] = useState("");
  const [shelfAddress, setShelfAddress] = useState("");

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    medId: "",
    manufacturer: "",
    dosage: "",
    price: "",
    expiryDate: "",
    quantityInStock: "",
    shelfAddress: ""
  });

  const navigator = useNavigate();

  function pageTitle() {
    return paramId ? <h2 className="text-center">Update Medicine</h2> : <h2 className="text-center">Add Medicine</h2>;
  }

  function addOrUpdateMedicine(e) {
    e.preventDefault();

    if (validateForm()) {
      const medicine = { id, name, medId, manufacturer, dosage, price, expiryDate, quantityInStock, shelfAddress };

      if (paramId) {
        updateMedcine(paramId, medicine)
          .then((response) => {
            alert("Medicine Updated Successfully");
            navigator("/med");
          })
          .catch((err) => {
            console.log(err);
            alert("Error Updating the Medicine");
          });
      } else {
        createMedicine(medicine)
          .then((response) => {
            console.log(response);
            navigator("/med");
          })
          .catch((err) => {
            alert("Error in adding medicine");
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!id.trim()) {
      errorsCopy.id = "ID required";
      valid = false;
    } else {
      errorsCopy.id = "";
    }

    if (!medId.trim()) {
      errorsCopy.medId = "MedId required";
      valid = false;
    } else {
      errorsCopy.medId = "";
    }

    if (!name.trim()) {
      errorsCopy.name = "Name required";
      valid = false;
    } else {
      errorsCopy.name = "";
    }

    setErrors(errorsCopy);
    return valid;
  }

  useEffect(() => {
    if (paramId) {
      getMedicinebyId(paramId)
        .then((response) => {
          setId(response.data.id);
          setMedId(response.data.medicineId);
          setName(response.data.name);
          setManufacturer(response.data.manufacturer);
          setDosage(response.data.dosage);
          setPrice(response.data.price);
          setExpiryDate(response.data.expiryDate);
          setQuantityInStock(response.data.quantityInStock);
          setShelfAddress(response.data.shelfAddress);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [paramId]);

  function handlePriceChange(e) {
    const inputValue = e.target.value;
    if (!isNaN(inputValue)) {
      setPrice(inputValue);
    }
  }

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        {pageTitle()}
        <div className="col-md-6">
          <form onSubmit={addOrUpdateMedicine}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">ID</label>
              <input type="text" className={`form-control ${errors.id ? 'is-invalid' : ''}`} id="id" placeholder="ID (unique)" value={id} onChange={(e) => setId(e.target.value)} />
              {errors.id && <div className="invalid-feedback">{errors.id}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="medId" className="form-label">MedID</label>
              <input type="text" className={`form-control ${errors.medId ? 'is-invalid' : ''}`} id="medId" placeholder="MedID (unique)" value={medId} onChange={(e) => setMedId(e.target.value)} />
              {errors.medId && <div className="invalid-feedback">{errors.medId}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
              <input type="text" className="form-control" id="manufacturer" placeholder="Manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="dosage" className="form-label">Dosage</label>
              <input type="text" className="form-control" id="dosage" placeholder="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="text" className="form-control" id="price" placeholder="Price" value={price} onChange={handlePriceChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
              <input type="date" className="form-control" id="expiryDate" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="quantityInStock" className="form-label">Quantity in Stock</label>
              <input type="text" className="form-control" id="quantityInStock" placeholder="Quantity in Stock" value={quantityInStock} onChange={(e) => setQuantityInStock(e.target.value)} /> {/* corrected variable name */}
            </div>
            <div className="mb-3">
              <label htmlFor="shelfAddress" className="form-label">Shelf Address</label>
              <input type="text" className="form-control" id="shelfAddress" placeholder="Shelf Address" value={shelfAddress} onChange={(e) => setShelfAddress(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Medicine;

