import React, { useEffect, useState } from 'react';
import API from '../api/api';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    API.get('/hotels/upcoming-bookings')
      .then((res) => setHotels(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Hotels</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Total Booking Count</th>
            <th>Upcoming Booking Count</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.hotel_id + hotel.room_number}>
              <td>{hotel.hotel_id}</td>
              <td>{hotel.hotel_name}</td>
              <td>{hotel.room_number}</td>
              <td>{hotel.room_type}</td>
              <td>{hotel.total_booking_count}</td>
              <td>{hotel.upcoming_booking_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Hotels;
