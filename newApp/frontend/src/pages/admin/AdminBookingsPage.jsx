import { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const loadBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiClient.get('/bookings');
      setBookings(res.data);
    } catch (err) {
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await apiClient.put(`/bookings/${id}/status`, { status });
      await loadBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="page">
      <h2>All Bookings</h2>
      <ErrorAlert message={error} />
      {loading ? (
        <div className="page-center">
          <LoadingSpinner />
        </div>
      ) : bookings.length === 0 ? (
        <p className="muted">No bookings found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Temple</th>
                <th>User</th>
                <th>Date/Time</th>
                <th>Attendees</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.temple?.name}</td>
                  <td>{b.user?.name}</td>
                  <td>
                    {new Date(b.timeSlot?.date).toDateString()} {b.timeSlot?.startTime}-
                    {b.timeSlot?.endTime}
                  </td>
                  <td>{b.attendees}</td>
                  <td>{b.status}</td>
                  <td>
                    <button
                      className="btn btn-sm"
                      disabled={updatingId === b._id}
                      onClick={() => updateStatus(b._id, 'CONFIRMED')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      disabled={updatingId === b._id}
                      onClick={() => updateStatus(b._id, 'CANCELLED')}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBookingsPage;

