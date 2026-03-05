import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

const emptyTemple = {
  name: '',
  location: '',
  city: '',
  state: '',
  description: '',
  timings: { open: '', close: '' }
};

const AdminTemplesPage = () => {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTemple);
  const [saving, setSaving] = useState(false);

  const loadTemples = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiClient.get('/temples');
      setTemples(res.data);
    } catch (err) {
      setError('Failed to load temples.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemples();
  }, []);

  const startCreate = () => {
    setEditing(null);
    setForm(emptyTemple);
  };

  const startEdit = (t) => {
    setEditing(t);
    setForm({
      name: t.name,
      location: t.location,
      city: t.city || '',
      state: t.state || '',
      description: t.description || '',
      timings: {
        open: t.timings?.open || '',
        close: t.timings?.close || ''
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'open' || name === 'close') {
      setForm((prev) => ({
        ...prev,
        timings: {
          ...prev.timings,
          [name]: value
        }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) {
        await apiClient.put(`/temples/${editing._id}`, form);
      } else {
        await apiClient.post('/temples', form);
      }
      await loadTemples();
      setEditing(null);
      setForm(emptyTemple);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save temple.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this temple and related data?')) return;
    try {
      await apiClient.delete(`/temples/${id}`);
      await loadTemples();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete temple.');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Manage Temples</h2>
        <button className="btn btn-primary" onClick={startCreate}>
          Add Temple
        </button>
      </div>
      <ErrorAlert message={error} />

      {loading ? (
        <div className="page-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid">
          {temples.map((t) => (
            <div key={t._id} className="card">
              <h3>{t.name}</h3>
              <p className="muted">
                {t.location} {t.city && `, ${t.city}`} {t.state && `, ${t.state}`}
              </p>
              <p>Timings: {t.timings?.open} - {t.timings?.close}</p>
              <div className="card-actions">
                <button className="btn btn-outline btn-sm" onClick={() => startEdit(t)}>
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(t._id)}
                >
                  Delete
                </button>
                <Link
                  to={`/admin/temples/${t._id}/slots`}
                  className="btn btn-secondary btn-sm"
                >
                  Manage Slots
                </Link>
              </div>
            </div>
          ))}
          {!temples.length && <p className="muted">No temples configured.</p>}
        </div>
      )}

      <section className="section">
        <h3>{editing ? 'Edit Temple' : 'Add Temple'}</h3>
        <form onSubmit={handleSubmit} className="form form-inline">
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            City
            <input name="city" value={form.city} onChange={handleChange} />
          </label>
          <label>
            State
            <input name="state" value={form.state} onChange={handleChange} />
          </label>
          <label>
            Opens At
            <input
              name="open"
              value={form.timings.open}
              onChange={handleChange}
              placeholder="05:00"
            />
          </label>
          <label>
            Closes At
            <input
              name="close"
              value={form.timings.close}
              onChange={handleChange}
              placeholder="22:00"
            />
          </label>
          <label className="full-width">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </label>
          <button className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Temple'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminTemplesPage;

