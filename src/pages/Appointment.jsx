import { useState } from 'react'

export default function Appointment() {
  const [name, setName] = useState('')
  const [doctor, setDoctor] = useState('Dr. Anita Sharma')
  const [date, setDate] = useState('')
  const [booked, setBooked] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    const newAppointment = {
      id: Date.now(),
      name,
      doctor,
      date,
    }

    const existingAppointments = JSON.parse(
      localStorage.getItem('appointments') || '[]'
    )

    existingAppointments.push(newAppointment)

    localStorage.setItem(
      'appointments',
      JSON.stringify(existingAppointments)
    )

    setBooked(true)
  }

  if (booked) {
    return (
      <div className="page">
        <h1>Appointment Confirmed! ✅</h1>

        <p>Name: {name}</p>
        <p>Doctor: {doctor}</p>
        <p>Date: {date}</p>

        <button
          className="btn"
          onClick={() => {
            setName('')
            setDoctor('Dr. Anita Sharma')
            setDate('')
            setBooked(false)
          }}
        >
          Book Another Appointment
        </button>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Book Appointment</h1>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="doctor">Choose Doctor</label>
        <select
          id="doctor"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        >
          <option>Dr. Anita Sharma</option>
          <option>Dr. Rahul Mehta</option>
          <option>Dr. Priya Nair</option>
          <option>Dr. Arjun Rao</option>
        </select>

        <label htmlFor="date">Appointment Date</label>
        <input
          id="date"
          type="date"
          min={new Date().toLocaleDateString('en-CA')}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button className="btn" type="submit">
          Confirm Appointment
        </button>
      </form>
    </div>
  )
}