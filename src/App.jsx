import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Doctors from './pages/Doctors.jsx'
import Appointment from './pages/Appointment.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import Chatbot from './components/chatbot.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
      </Routes>
      <Chatbot />
    </>
  )
}

export default App