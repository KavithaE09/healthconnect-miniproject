import React from 'react';
import { useCart } from '../../store/CartContext';
import { Container, Typography, Box, Card, CardContent, CardMedia, Button, Divider } from '@mui/material';
import swal from 'sweetalert';

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    const handleRemove = (id) => {
        swal({
            title: "Remove Item",
            text: "Are you sure you want to remove this item from the cart?",
            icon: "warning",
            buttons: ["Cancel", "Remove"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                removeFromCart(id);
                swal("Item removed!", { icon: "success" });
            }
        });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 600 }}>
                Your Cart 🛒
            </Typography>

            <Card sx={{ p: 3, borderRadius: 4, boxShadow: 6 }}>
                {cartItems.length === 0 ? (
                    <Typography variant="h6" align="center" sx={{ mt: 5 }}>
                        Your cart is empty 🛍️
                    </Typography>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <Box 
                                key={item.id} 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    mb: 3, 
                                    p: 1.5, 
                                    borderRadius: 3, 
                                    backgroundColor: '#f9f9f9' 
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={item.image}
                                    alt={item.name}
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        objectFit: "cover",
                                        borderRadius: 2,
                                        mr: 2,
                                    }}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#555' }}>
                                        Price: ₹{item.price}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#777' }}>
                                        Quantity: {item.quantity}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    onClick={() => handleRemove(item.id)}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        '&:hover': {
                                            backgroundColor: '#c62828',
                                        },
                                    }}
                                >
                                    Remove
                                </Button>
                            </Box>
                        ))}

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 700 }}>
                            Total Price: ₹{calculateTotal().toFixed(2)}
                        </Typography>

                        <Box sx={{ textAlign: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                sx={{
                                    px: 5,
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    backgroundColor: '#2e7d32',
                                    '&:hover': {
                                        backgroundColor: '#1b5e20',
                                    },
                                }}
                                onClick={() => swal("Order Placed!", "Thank you for your purchase! 🎉", "success")}
                            >
                                Buy Now
                            </Button>
                        </Box>
                    </>
                )}
            </Card>
        </Container>
    );
};

export default CartPage;
