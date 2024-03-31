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
    
    if(response.status === 200) {
      return true;
    } else if (response.status === 404) {
      return false;
    } else {
      console.error('Unexpected status code:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error checking if ID exists:', error);
    return false;
  }
}

export const  getMedicinebyId = (id)=> {
   return axios.put(REST_API_BASE_URl+"/"+id);
}

export const  getMedicinebyId2 = (id)=> {
  return axios.get(REST_API_BASE_URl+"/"+id);
}

export const updateMedicine = (id , medicine) => {
  return axios.put(REST_API_BASE_URl + "/"+id, medicine);
}

export const deleteMedicine = (id) => {
  return axios.delete(REST_API_BASE_URl + "/" + id);
}

export const getMedicineByName = (name) => {
  return axios.get(`http://localhost:8080/api/v1/medicine/name/${name}`)
}