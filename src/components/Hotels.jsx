import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get("http://localhost:3000/routes/hotels");
                setHotels(response.data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };
        fetchHotels();
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 2,
                p: 2,
            }}
        >
            {hotels.map((hotel) => (
                <Card key={hotel.hotel_id}>
                    <CardActionArea
                        onClick={() => {
                            setSelectedHotel(hotel.hotel_id);
                            navigate(`/hotel/${hotel.hotel_id}`);
                        }}
                        data-active={selectedHotel === hotel.hotel_id ? "" : undefined}
                        sx={{
                            height: "100%",
                            "&[data-active]": {
                                backgroundColor: "action.selected",
                                "&:hover": {
                                    backgroundColor: "action.selectedHover",
                                },
                            },
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="200"
                            image={`https://source.unsplash.com/300x200/?hotel,${hotel.city}`}
                            alt={hotel.name}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {hotel.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {hotel.city}, {hotel.state}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ⭐ Rating: {hotel.rating}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
};

export default Hotels;
