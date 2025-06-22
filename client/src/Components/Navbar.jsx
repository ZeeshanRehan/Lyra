export default function Navbar() {
  return (
    <div className="w-full flex justify-center mb-20">
      <nav className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-2 flex items-center justify-between w-full max-w-7xl text-sm text-gray-300 shadow-md">
        {/* Left Side — Logo / Name */}
        <div className="font-semibold text-white tracking-wide">
          VibePilot
        </div>

        {/* Center Links */}
        <div className="flex space-x-8">
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">How it works</a>
          <a href="#" className="hover:text-white">Privacy</a>
        </div>

        {/* Right Side — Auth */}
        <div className="flex space-x-3">
          <button className="hover:text-white">Login</button>
          <button className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700 transition">
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  );
}
