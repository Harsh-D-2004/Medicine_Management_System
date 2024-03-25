import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getMedicineList } from '../services/MedicineService';
import {useNavigate} from 'react-router-dom'

const MedicinalItems = () => {
    const [medicines, setMedicines] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await getMedicineList();
                setMedicines(response.data);
            } catch (error) {
                console.error('Error fetching medicines:', error);
            }
        };

        fetchMedicines();
    
    }, []);

    function addMedicine()
    {
        navigator('/addMedicine');
    }

    function updateMedicine()
    {
        navigator('/updateMedicine')
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Medicinal Items</h1>
            <div class = 'container my-3'>
                <button type="button" class="btn btn-dark" onClick={addMedicine}>Add Medicine</button>
            </div>
            <div className="row">
                {medicines.map(medicine => (
                    <div key={medicine.id} className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100">
                            <img src={medicine.image} className="card-img-top" alt={medicine.name} />
                            <div className="card-body">
                                <h4 className="card-title">{medicine.name}</h4>
                                <h2 className="card-title">{medicine.price}</h2>
                                <p className="card-text">Dosage : {medicine.dosage}</p>
                                <p className="card-text">Manufacturer : {medicine.manufacturer}</p>
                                <p className="card-text">Expiry Date : {medicine.expiryDate}</p>
                                <p className="card-text">Sheld Address : {medicine.shelfAddress}</p>
                                <p className="card-text">Stock : {medicine.quantityInStock}</p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary" onClick={updateMedicine}>Update</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MedicinalItems;