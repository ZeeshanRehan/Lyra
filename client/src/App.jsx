import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './Hero';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Favorites from './Pages/Favorites';
import About from './Pages/About';
// import HowitWorks from './Pages/HowitWorks'
import Privacy from './Pages/Privacy';
import Navbar from './Components/Navbar'; // ✅ make sure this is correct path

function App() {
  return (
    <div
      className="min-h-screen overflow-hidden text-white"
      style={{
        backgroundColor: '#030205',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238755d8' fill-opacity='0.26'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }}
    >
      <Router>
        <Navbar /> {/* ✅ Add this here to show nav on every page */}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/how-it-works" element={<HowitWorks />} /> */}
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
