import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Darshan Ease</h1>
        <p>
          Book darshan slots online, avoid long queues, and get real-time temple updates from the
          comfort of your home.
        </p>
        <div className="hero-actions">
          <Link to="/temples" className="btn btn-primary">
            Browse Temples
          </Link>
          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

