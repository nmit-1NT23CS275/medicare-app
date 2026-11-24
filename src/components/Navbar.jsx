import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>MediCare</h2>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/appointment">Book Appointment</Link>
        <Link to="/my-appointments">My Appointments</Link>
      </div>
    </nav>
  )
}