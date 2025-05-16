import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';

const PrescriptionModal = ({ open, onClose, onConfirm }) => {
    const [quantity, setQuantity] = useState(1);
    const [prescriptionRequired, setPrescriptionRequired] = useState(false);
    const [prescriptionFile, setPrescriptionFile] = useState(null);

    const handleConfirm = () => {
        onConfirm(quantity, prescriptionFile);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 2, width: 400, margin: 'auto', mt: 10 }}>
                <Typography variant="h6">Enter Details</Typography>
                
                <TextField
                    label="Quantity"
                    type="number"
                    fullWidth
                    sx={{ mt: 2 }}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <Button
                    variant="contained"
                    color={prescriptionRequired ? "error" : "primary"}
                    sx={{ mt: 2 }}
                    onClick={() => setPrescriptionRequired(!prescriptionRequired)}
                >
                    {prescriptionRequired ? "Prescription Required ✅" : "No Prescription Needed"}
                </Button>

                {prescriptionRequired && (
                    <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => setPrescriptionFile(e.target.files[0])}
                        style={{ marginTop: 10 }}
                    />
                )}

                <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={handleConfirm}>
                    Confirm
                </Button>
            </Box>
        </Modal>
    );
};

export default PrescriptionModal;
