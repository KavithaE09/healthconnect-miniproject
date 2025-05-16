import React, { createContext, useState, useEffect } from 'react';
import medicinesData from '../data/medicines.json';

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        setMedicines(medicinesData);
    }, []);

    return (
        <MedicineContext.Provider value={{ medicines }}>
            {children}
        </MedicineContext.Provider>
    );
};
