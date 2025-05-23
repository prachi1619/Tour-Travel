import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { FaCalendar, FaUsers, FaDollarSign } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormProps {
  destinationId: string;
  destinationName: string;
  pricePerDay: number;
}

const BookingForm: React.FC<BookingFormProps> = ({
  destinationId,
  destinationName,
  pricePerDay,
}) => {
  const { currentUser } = useAuth();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * pricePerDay * guests;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setError('Please log in to make a booking');
      return;
    }

    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const booking = {
        userId: currentUser.uid,
        destinationId,
        destinationName,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guests,
        pricePerDay,
        totalPrice: calculateTotalPrice(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'bookings'), booking);
      setSuccess('Booking submitted successfully!');
      
      // Reset form
      setStartDate(null);
      setEndDate(null);
      setGuests(1);
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Book Your Trip</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Check-in Date</label>
          <DatePicker
            selected={startDate}
            // onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            className="w-full p-2 border rounded"
            placeholderText="Select check-in date"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Check-out Date</label>
          <DatePicker
            selected={endDate}
            // onChange={(date: Date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            className="w-full p-2 border rounded"
            placeholderText="Select check-out date"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Number of Guests</label>
          <input
            type="number"
            min="1"
            max="10"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Price per day:</span>
            <span className="font-medium">${pricePerDay}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Number of days:</span>
            <span className="font-medium">
              {startDate && endDate
                ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
                : 0}
            </span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Price:</span>
            <span>${calculateTotalPrice()}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !currentUser}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : currentUser ? 'Book Now' : 'Please Log In to Book'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm; 