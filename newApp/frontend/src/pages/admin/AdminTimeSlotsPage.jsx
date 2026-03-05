import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

const AdminTimeSlotsPage = () => {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    date: '',
    startTime: '',
    endTime: '',
    capacity: 100
  });
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [templeRes, slotsRes] = await Promise.all([
        apiClient.get(`/temples/${id}`),
        apiClient.get(`/temples/${id}/slots`)
      ]);
      setTemple(templeRes.data.temple);
      setSlots(slotsRes.data);
    } catch (err) {
      setError('Failed to load time slots.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await apiClient.post(`/temples/${id}/slots`, {
        ...form,
        capacity: Number(form.capacity)
      });
      setForm({
        date: '',
        startTime: '',
        endTime: '',
        capacity: 100
      });
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create time slot.');
    } finally {
      setSaving(false);
    }
  };

  const deleteSlot = async (slotId) => {
    if (!window.confirm('Delete this time slot?')) return;
    try {
      await apiClient.delete(`/temples/${id}/slots/${slotId}`);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete time slot.');
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
      <h2>Manage Time Slots - {temple.name}</h2>
      <ErrorAlert message={error} />

      <section className="section">
        <h3>Existing Slots</h3>
        {slots.length === 0 ? (
          <p className="muted">No slots configured yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Capacity</th>
                  <th>Booked</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((s) => (
                  <tr key={s._id}>
                    <td>{new Date(s.date).toDateString()}</td>
                    <td>
                      {s.startTime} - {s.endTime}
                    </td>
                    <td>{s.capacity}</td>
                    <td>{s.bookedCount}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteSlot(s._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="section">
        <h3>Add New Slot</h3>
        <form onSubmit={handleSubmit} className="form form-inline">
          <label>
            Date
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Start Time
            <input
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              placeholder="07:00"
              required
            />
          </label>
          <label>
            End Time
            <input
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              placeholder="08:00"
              required
            />
          </label>
          <label>
            Capacity
            <input
              type="number"
              name="capacity"
              min="1"
              value={form.capacity}
              onChange={handleChange}
            />
          </label>
          <button className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Add Slot'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminTimeSlotsPage;

