import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/authUtils';

export default function Navbar() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    window.location.reload(); // quick fix to re-render the UI
  };

  return (
    <div className="w-full flex justify-center mb-20">
      <nav className="mt-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-2 flex items-center justify-between w-full max-w-7xl text-sm text-gray-300 shadow-md">
        {/* Left Side — Logo */}
        <div className="font-semibold text-white tracking-wide">
          <Link to="/">Lyra AI</Link>
        </div>

        {/* Center Links */}
        <div className="flex space-x-8">
          <Link to="/about" className="hover:text-white">About</Link>
          {/* <Link to="/how-it-works" className="hover:text-white">How it works</Link> */}
          <Link to="/privacy" className="hover:text-white">Privacy</Link>
        </div>

        {/* Right Side — Auth */}
        <div className="flex space-x-3 items-center">
          {user ? (
            <>
              <span className="text-white text-sm">Hello, {user.username}</span>
              <button
                onClick={handleLogout}
                className="text-sm hover:text-white border border-purple-500 rounded-full px-3 py-1"
              >
                Logout
              </button>
              <Link to="/favorites" className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700 transition">
                ❤️ Favorites
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-white">Login</Link>
              <Link to="/signup" className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
