import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="page page-center">
    <h2>Page Not Found</h2>
    <p className="muted">The page you are looking for does not exist.</p>
    <Link to="/" className="btn btn-primary">
      Go Home
    </Link>
  </div>
);

export default NotFoundPage;

