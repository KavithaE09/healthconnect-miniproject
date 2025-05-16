import React, { useContext, useState } from 'react';
import { MedicineContext } from '../store/MedicineStore';
import { useCart } from '../store/CartContext'; // ✅ Import useCart
import { Card, CardContent, CardMedia, Typography, Button, Grid, Container, TextField, Box } from '@mui/material';
import PrescriptionModal from '../components/PrescriptionModal';
import swal from 'sweetalert';

const Medicines = () => {
    const { medicines } = useContext(MedicineContext);
    const { addToCart } = useCart(); // ✅ Get addToCart from cart context
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [buyNowDetails, setBuyNowDetails] = useState(null);

    const filteredMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const createQuantityInput = () => {
        const inputDiv = document.createElement('div');
        inputDiv.innerHTML = `
            <label>Quantity:</label>
            <input type="number" id="quantity" class="swal-input" placeholder="Enter quantity" required>
        `;
        return inputDiv;
    };

    const handleAddToCart = (medicine) => {
        swal({
            title: "Enter Quantity",
            content: createQuantityInput(),
            buttons: {
                cancel: {
                    text: "Cancel",
                    visible: true,
                    className: "blue-cancel-button"
                },
                confirm: {
                    text: "Add",
                    className: "blue-confirm-button"
                }
            }
        }).then((confirm) => {
            if (confirm) {
                const quantity = parseInt(document.getElementById('quantity').value);
                if (isNaN(quantity) || quantity <= 0) {
                    swal("Error", "Please enter a valid quantity!", "error");
                    return;
                }

                addToCart({
                    id: medicine.id,
                    name: medicine.name,
                    price: medicine.price,
                    quantity: quantity,
                    image: medicine.image // optional, for cart display
                });

                swal({
                    title: "Added to Cart",
                    text: `${medicine.name} (x${quantity}) has been added to your cart!`,
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "OK",
                            className: "blue-confirm-button"
                        }
                    }
                });
            }
        });
    };

    const handleBuyNow = (medicine) => {
        swal({
            title: "Enter Quantity",
            content: createQuantityInput(),
            buttons: {
                cancel: {
                    text: "Cancel",
                    visible: true,
                    className: "blue-cancel-button"
                },
                confirm: {
                    text: "OK",
                    className: "blue-confirm-button"
                }
            }
        }).then((confirm) => {
            if (confirm) {
                const quantity = parseInt(document.getElementById('quantity').value);
                if (isNaN(quantity) || quantity <= 0) {
                    swal("Error", "Please enter a valid quantity!", "error");
                    return;
                }

                const totalPrice = medicine.price * quantity;
                const discount = totalPrice * 0.1;
                const finalPrice = totalPrice - discount;

                setBuyNowDetails({ medicine, quantity, totalPrice, discount, finalPrice });

                swal({
                    title: "Confirm Purchase",
                    text: `🛍️ Item: ${medicine.name}\n💰 Price: ₹${medicine.price}\n📦 Quantity: ${quantity}\n📊 Total: ₹${totalPrice}\n💸 Discount: ₹${discount}\n✅ Final Price: ₹${finalPrice}`,
                    icon: "info",
                    buttons: {
                        cancel: {
                            text: "Cancel",
                            visible: true,
                            className: "blue-cancel-button"
                        },
                        confirm: {
                            text: "Buy Now",
                            className: "blue-confirm-button"
                        }
                    }
                }).then((confirmPurchase) => {
                    if (confirmPurchase) {
                        swal({
                            title: "Success",
                            text: "Your order has been placed!",
                            icon: "success",
                            buttons: {
                                confirm: {
                                    text: "OK",
                                    className: "blue-confirm-button"
                                }
                            }
                        });
                    }
                });
            }
        });
    };

    const handleConfirm = (quantity, prescriptionFile) => {
        swal({
            title: "Added to Cart",
            text: `${selectedMedicine.name} (x${quantity}) has been added!`,
            icon: "success",
            buttons: {
                confirm: {
                    text: "OK",
                    className: "blue-confirm-button"
                }
            }
        });
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0zfvQDRZBNBsGzSpo0Xdf5yU5G4yTIebrmw&s")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                py: 4
            }}
        >
            <Typography variant="h4" sx={{ my: 3, textAlign: 'center', fontWeight: 600 }}>
                🏥 SHOP MEDICINES ONLINE
            </Typography>

            <TextField
                label="Search Medicines"
                variant="outlined"
                fullWidth
                sx={{
                    mb: 3,
                    '& label.Mui-focused': { color: '#1976D2' },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': { borderColor: '#1976D2' }
                    }
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Grid container spacing={3} justifyContent="center">
                {filteredMedicines.map((medicine) => (
                    <Grid item xs={12} sm={6} md={4} key={medicine.id}>
                        <Card sx={{ maxWidth: 400, height: 470, boxShadow: 5, borderRadius: 2 }}>
                            <Box 
                                sx={{ backgroundColor: "#f5f5f5", p: 1.5, borderRadius: 2, mx: 2, mt: 2, boxShadow: 3, display: "flex", justifyContent: "center" }}
                            >
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={medicine.image}
                                    alt={medicine.name}
                                    sx={{ objectFit: "cover", borderRadius: 2 }}
                                />
                            </Box>

                            <CardContent sx={{ textAlign: "justify", p: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, textAlign: "center" }}>
                                    {medicine.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {medicine.description}
                                </Typography>
                                <Typography variant="h6" sx={{ mt: 1, color: '#1976D2', fontWeight: 600, textAlign: "center" }}>
                                    ₹{medicine.price}
                                </Typography>
                            </CardContent>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, pb: 2 }}>
                                <Button 
                                    variant="contained" 
                                    sx={{
                                        backgroundColor: "#1976D2",
                                        color: "#ffffff",
                                        width: '40%',
                                        "&:hover": {
                                            backgroundColor: "#125ea9"
                                        }
                                    }}
                                    onClick={() => handleAddToCart(medicine)}
                                >
                                    Add to Cart
                                </Button>
                                <Button 
                                    variant="contained" 
                                    sx={{
                                        backgroundColor: "#1976D2",
                                        color: "#ffffff",
                                        width: '40%',
                                        "&:hover": {
                                            backgroundColor: "#125ea9"
                                        }
                                    }}
                                    onClick={() => handleBuyNow(medicine)}
                                >
                                    Buy Now
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <PrescriptionModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirm} />
        </Container>
    );
};

export default Medicines;
