import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import TempleCard from '../components/TempleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

const TempleListPage = () => {
  const [temples, setTemples] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTemples = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await apiClient.get('/temples', {
          params: search ? { search } : {}
        });
        setTemples(res.data);
      } catch (err) {
        setError('Failed to load temples.');
      } finally {
        setLoading(false);
      }
    };
    fetchTemples();
  }, [search]);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Temples</h2>
        <input
          type="search"
          placeholder="Search temples..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      <ErrorAlert message={error} />
      {loading ? (
        <div className="page-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid">
          {temples.map((t) => (
            <TempleCard key={t._id} temple={t} />
          ))}
          {!temples.length && <p className="muted">No temples found.</p>}
        </div>
      )}
    </div>
  );
};

export default TempleListPage;

