import { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiClient.get('/admin/dashboard');
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="page-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="page">
        <ErrorAlert message={error || 'No data available.'} />
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      <ErrorAlert message={error} />
      <div className="grid grid-3">
        <div className="card metric-card">
          <h3>Today&apos;s Bookings</h3>
          <p className="metric">{stats.todayBookings}</p>
        </div>
        <div className="card metric-card">
          <h3>Total Bookings</h3>
          <p className="metric">{stats.totalBookings}</p>
        </div>
        <div className="card metric-card">
          <h3>Active Slots</h3>
          <p className="metric">{stats.activeSlots}</p>
        </div>
      </div>

      <section className="section">
        <h3>Bookings Per Day (Last 7 Days)</h3>
        <ul>
          {stats.bookingsPerDay.map((d) => (
            <li key={d._id}>
              {d._id}: {d.count}
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h3>Peak Hours</h3>
        <ul>
          {stats.peakHours.map((h) => (
            <li key={h._id}>
              {h._id}: {h.count} bookings
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboardPage;

