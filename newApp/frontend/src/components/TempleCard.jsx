import { Link } from 'react-router-dom';

const TempleCard = ({ temple }) => {
  return (
    <div className="card temple-card">
      <h3>{temple.name}</h3>
      <p className="muted">
        {temple.location} {temple.city && `, ${temple.city}`} {temple.state && `, ${temple.state}`}
      </p>
      <p>Timings: {temple.timings?.open} - {temple.timings?.close}</p>
      <p>Crowd: <span className={`badge badge-${temple.crowdStatus?.toLowerCase()}`}>{temple.crowdStatus}</span></p>
      <Link to={`/temples/${temple._id}`} className="btn btn-primary btn-sm">
        View Details
      </Link>
    </div>
  );
};

export default TempleCard;

