import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Darshan Ease
        </Link>
      </div>
      <nav className="navbar-links">
        <NavLink to="/temples">Temples</NavLink>
        {isAuthenticated && !isAdmin && <NavLink to="/bookings">My Bookings</NavLink>}
        {isAdmin && (
          <>
            <NavLink to="/admin">Dashboard</NavLink>
            <NavLink to="/admin/temples">Temples</NavLink>
            <NavLink to="/admin/bookings">Bookings</NavLink>
          </>
        )}
      </nav>
      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <NavLink to="/profile" className="navbar-username">
              {user?.name}
            </NavLink>
            <button onClick={handleLogout} className="btn btn-outline">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="btn btn-outline">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-primary">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

