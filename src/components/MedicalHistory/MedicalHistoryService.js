import axios from "axios";

const API_URL = "http://localhost:5000/medicalHistory";

export const getMedicalHistory = () => axios.get(API_URL);
export const addMedicalRecord = (record) => axios.post(API_URL, record);
export const deleteMedicalRecord = (id) => axios.delete(`${API_URL}/${id}`);
