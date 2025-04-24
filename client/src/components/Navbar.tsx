import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">💬 PulseChat</Link>
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
        <li><Link to="/auth" className="hover:text-orange-400">Unlock Access</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
