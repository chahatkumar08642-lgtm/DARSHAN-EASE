import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/apiClient';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { useAuth } from '../context/AuthContext';

const TempleDetailsPage = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const [attendees, setAttendees] = useState(1);
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchTemple = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiClient.get(`/temples/${id}`);
        setTemple(res.data.temple);
        setSlots(res.data.upcomingSlots);
      } catch (err) {
        setError('Failed to load temple details.');
      } finally {
        setLoading(false);
      }
    };
    fetchTemple();
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please login to book a darshan slot.');
      return;
    }
    if (!selectedSlotId) {
      setError('Please select a time slot.');
      return;
    }
    setError('');
    setSuccess('');
    setBookingLoading(true);
    try {
      await apiClient.post('/bookings', {
        templeId: id,
        timeSlotId: selectedSlotId,
        attendees: Number(attendees)
      });
      setSuccess('Booking created successfully. Check your email for confirmation.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!temple) {
    return (
      <div className="page">
        <ErrorAlert message={error || 'Temple not found.'} />
      </div>
    );
  }

  return (
    <div className="page">
      <h2>{temple.name}</h2>
      <p className="muted">
        {temple.location}
        {temple.city && `, ${temple.city}`} {temple.state && `, ${temple.state}`}
      </p>
      <p>Timings: {temple.timings?.open} - {temple.timings?.close}</p>
      <p>Facilities: {temple.facilities?.join(', ') || 'N/A'}</p>
      <p>
        Crowd Status:{' '}
        <span className={`badge badge-${temple.crowdStatus?.toLowerCase()}`}>
          {temple.crowdStatus}
        </span>
      </p>
      {temple.description && <p>{temple.description}</p>}

      <section className="section">
        <h3>Available Darshan Slots</h3>
        <ErrorAlert message={error} />
        {success && <div className="alert alert-success">{success}</div>}
        {slots.length === 0 ? (
          <p className="muted">No upcoming slots configured yet.</p>
        ) : (
          <form onSubmit={handleBook} className="form-inline">
            <select
              value={selectedSlotId}
              onChange={(e) => setSelectedSlotId(e.target.value)}
              required
            >
              <option value="">Select time slot</option>
              {slots.map((slot) => (
                <option key={slot._id} value={slot._id}>
                  {new Date(slot.date).toDateString()} - {slot.startTime} to {slot.endTime} (
                  {slot.capacity - slot.bookedCount} left)
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              max="10"
              value={attendees}
              onChange={(e) => setAttendees(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={bookingLoading}>
              {bookingLoading ? 'Booking...' : 'Book Slot'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default TempleDetailsPage;

