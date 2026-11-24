const doctors = [
  { id: 1, name: 'Dr. Anita Sharma', specialty: 'Cardiologist' },
  { id: 2, name: 'Dr. Rahul Mehta', specialty: 'Dermatologist' },
  { id: 3, name: 'Dr. Priya Nair', specialty: 'Pediatrician' },
  { id: 4, name: 'Dr. Arjun Rao', specialty: 'Orthopedic' },
]

export default function Doctors() {
  return (
    <div className="page">
      <h1>Our Doctors</h1>

      <div className="grid">
        {doctors.map((doctor) => (
          <div className="card" key={doctor.id}>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  )
}