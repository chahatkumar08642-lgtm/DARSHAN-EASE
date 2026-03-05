import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiClient.get('/bookings/me');
        setBookings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="page">
      <h2>My Bookings</h2>
      <ErrorAlert message={error} />
      {loading ? (
        <div className="page-center">
          <LoadingSpinner />
        </div>
      ) : bookings.length === 0 ? (
        <p className="muted">No bookings yet.</p>
      ) : (
        <div className="grid">
          {bookings.map((b) => (
            <div key={b._id} className="card">
              <h3>{b.temple?.name}</h3>
              <p className="muted">
                {new Date(b.timeSlot?.date).toDateString()} {b.timeSlot?.startTime}-
                {b.timeSlot?.endTime}
              </p>
              <p>Status: <span className="badge">{b.status}</span></p>
              <p>Attendees: {b.attendees}</p>
              {b.qrCodeDataUrl && (
                <div className="qr-wrapper">
                  <img src={b.qrCodeDataUrl} alt="QR Code" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistoryPage;

