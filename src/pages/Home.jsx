import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="page hero">
      <p
        style={{
          color: '#43e0c0',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}
      >
        YOUR HEALTH. YOUR PRIORITY.
      </p>

      <h1>
        Better healthcare,
        <br />
        one appointment away.
      </h1>

      <p>
        Discover trusted specialists, manage your appointments,
        and take the next step towards better health with MediCare.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '14px',
          flexWrap: 'wrap',
          marginTop: '8px',
        }}
      >
        <Link to="/appointment" className="btn">
          Book an Appointment →
        </Link>

        <Link
          to="/doctors"
          className="btn"
          style={{
            background: 'transparent',
            color: '#edf4ff',
            borderColor: 'rgba(148, 170, 202, 0.25)',
          }}
        >
          Explore Doctors
        </Link>
      </div>
    </main>
  )
}