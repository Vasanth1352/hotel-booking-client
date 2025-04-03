import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HotelDetails.css";

const HotelDetails = () => {
    const { id } = useParams(); // ✅ Get hotel_id from URL
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/routes/hotels/${id}`);
                setHotel(response.data);
            } catch (error) {
                console.error("Error fetching hotel details:", error);
            }
        };

        fetchHotelDetails();
    }, [id]);

    if (!hotel) return <p>Loading...</p>;

    return (
        <div className="hotel-details">
            <h2>{hotel.name}</h2>
            <p>{hotel.address}, {hotel.city}, {hotel.state}, {hotel.country} - {hotel.zip_code}</p>
            <p>📞 {hotel.phone_number} | ✉️ {hotel.email}</p>
            <p>⭐ Rating: {hotel.rating}</p>
            <img src={hotel.image_url} alt={hotel.name} className="hotel-image"/>
        </div>
    );
};

export default HotelDetails;
