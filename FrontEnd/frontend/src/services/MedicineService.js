import axios from "axios";

const REST_API_BASE_URl = "http://localhost:8080/api/v1/medicine";

export const getMedicineList = ()=> {
    return  axios.get(REST_API_BASE_URl);
}

export const createMedicine = (medicine) => {
    return axios.post(REST_API_BASE_URl , medicine);
}

export async function checkIfIdExists(id) {
    try {
      const response = await axios.get(REST_API_BASE_URl + "/" + id);
      
      if(response !== null)
      {
        return false;
      }
      return true
    } catch (error) {
      console.error('Error checking if ID exists:', error);
      throw error;
    }
  }

export const  updateMedicine = (id, updatedMedicine)=> {
    
   return axios.put(REST_API_BASE_URl+"/"+id,updatedMedicine);
}