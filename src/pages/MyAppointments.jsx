import { useState, useEffect } from 'react'

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([])

  function loadAppointments() {
    const savedAppointments = JSON.parse(
      localStorage.getItem('appointments') || '[]'
    )

    setAppointments(savedAppointments)
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  function cancelAppointment(id) {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    )

    localStorage.setItem(
      'appointments',
      JSON.stringify(updatedAppointments)
    )

    setAppointments(updatedAppointments)
  }

  return (
    <div className="page">
      <h1>My Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <div className="grid">
          {appointments.map((appointment) => (
            <div className="card" key={appointment.id}>
              <h3>{appointment.name}</h3>

              <p>
                <strong>Doctor:</strong> {appointment.doctor}
              </p>

              <p>
                <strong>Date:</strong> {appointment.date}
              </p>

              <button
                className="btn cancel-btn"
                onClick={() => cancelAppointment(appointment.id)}
              >
                Cancel Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}