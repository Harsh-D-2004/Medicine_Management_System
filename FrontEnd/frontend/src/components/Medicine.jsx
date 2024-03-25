import React, { useState } from "react";
import { checkIfIdExists, createMedicine } from "../services/MedicineService";
import {useNavigate} from "react-router-dom"

const Medicine = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [medId, setmedId] = useState("");
  const [manufacturer, setmanufacturer] = useState("");
  const [dosage, setDosage] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setexpiryDate] = useState("");
  const [quantityinStock, setquantityInStock] = useState("");
  const [shelfAddress, setshelfAddress] = useState("");

  const navigator = useNavigate();

  function addMedicine(e)
  {
      e.preventDefault();

      const medicine = {id , name , medId , manufacturer , dosage , price , expiryDate , quantityinStock , shelfAddress}

      createMedicine(medicine).then((response) => {
        console.log(response);
        navigator('/med');
      })
       .catch((err)=>{
         alert('Error in adding medicine');
       });
  }

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form className="" onSubmit={addMedicine}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">ID</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Id(unique)"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">MEDID</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="MedId(unique)"
              value={medId}
              onChange={(e) => setmedId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">NAME</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">MANUFACTURER</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Manufacturer"
              value={manufacturer}
              onChange={(e) => setmanufacturer(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">DOSAGE</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">PRICE</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">EXPIRY DATE</label>
            <input
              type="date"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Expiry Date"
              value={expiryDate}
              onChange={(e) => setexpiryDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">QUANTITY IN STOCK</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Quantity In Stock"
              value={quantityinStock}
              onChange={(e) => setquantityInStock(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">SHELF ADDRESS</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Shelf Address"
              value={shelfAddress}
              onChange={(e) => setshelfAddress(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default Medicine;
