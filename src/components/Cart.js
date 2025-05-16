import React, { useContext } from 'react';
import { CartContext } from '../store/CartStore';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Cart = () => {
    const { cart } = useContext(CartContext);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4">Your Cart</Typography>
            <List>
                {cart.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`${item.name} - ₹${item.price} x ${item.quantity}`}
                            secondary={item.prescriptionFile ? "Prescription Uploaded" : "No Prescription"}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Cart;
