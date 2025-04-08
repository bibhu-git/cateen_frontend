import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContextProvider";
import { toast } from "react-toastify";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState({ login: false, menu: false, mobile: false });
  const { setUserType, token, setToken, roll } = useContext(StoreContext);
  const mobileMenuRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logout Successfully.");
  };

  const toggleMobileMenu = () => {
    setIsOpen((prev) => ({ ...prev, mobile: !prev.mobile }));
  };

  // Close hamburger menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsOpen((prev) => ({ ...prev, mobile: false }));
      }
    };

    if (isOpen.mobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen.mobile]);

  return (
    <nav className="bg-gray-900 text-white py-4 px-4 md:px-10 fixed top-0 z-20 w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"}>
          <h1 className="text-xl font-bold">Campus Kitchen</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center">
          <li><ScrollLink to="Home" smooth={true} duration={500} className="hover:text-gray-400 cursor-pointer">Home</ScrollLink></li>
          <li><ScrollLink to="About" smooth={true} duration={500} className="hover:text-gray-400 cursor-pointer">About</ScrollLink></li>
          <li><ScrollLink to="Contact" smooth={true} duration={500} className="hover:text-gray-400 cursor-pointer">Contact</ScrollLink></li>
          <li>
            {!token ? (
              <Link
                to="/Login"
                onClick={() => setUserType("User")}
                className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </Link>
            ) : (
              <>
                <button
                  className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700"
                  onClick={() => setIsOpen((prev) => ({ ...prev, menu: !prev.menu }))}
                >
                  Menu ▼
                </button>

                {isOpen.menu && (
                  <ul className="absolute right-10 bg-black text-white mt-2 w-44 rounded-lg z-10 shadow-lg">
                    {roll === "admin" ? (
                      <>
                        <li><Link to="/AddCustomer" className="block px-4 py-2 hover:bg-gray-700">New Customer</Link></li>
                        <li><Link to="/Attendance" className="block px-4 py-2 hover:bg-gray-700">Attendance</Link></li>
                        <li><Link to="/MealManage" className="block px-4 py-2 hover:bg-gray-700">On/Off</Link></li>
                        <li><Link to="/VerifyPayment" className="block px-4 py-2 hover:bg-gray-700">Payments</Link></li>
                        <li><Link to="/CashPayment" className="block px-4 py-2 hover:bg-gray-700">Cash Pay</Link></li>
                        <li><Link to="/Due" className="block px-4 py-2 hover:bg-gray-700">Due</Link></li>
                        <li><Link to="/CheckRecord" className="block px-4 py-2 hover:bg-gray-700">Check Record</Link></li>
                        <li><Link to="/ViewProfile" className="block px-4 py-2 hover:bg-gray-700">View Profile</Link></li>
                        <li><Link to="/ChangePassword" className="block px-4 py-2 hover:bg-gray-700">Change Password</Link></li>
                        <li><div className="block px-4 py-2 hover:bg-gray-700"><button onClick={logout}>Logout</button></div></li>
                      </>
                    ) : (
                      <>
                        <li><Link to="/ViewAttendance" className="block px-4 py-2 hover:bg-gray-700">Check Attendance</Link></li>
                        <li><Link to="/MealRequest" className="block px-4 py-2 hover:bg-gray-700">On/Off</Link></li>
                        <li><Link to="/SendPayment" className="block px-4 py-2 hover:bg-gray-700">Payments</Link></li>
                        <li><Link to="/ChangePassword" className="block px-4 py-2 hover:bg-gray-700">Change Password</Link></li>
                        <li><div className="block px-4 py-2 hover:bg-gray-700"><button onClick={logout}>Logout</button></div></li>
                      </>
                    )}
                  </ul>
                )}
              </>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isOpen.mobile ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen.mobile && (
        <div ref={mobileMenuRef} className="md:hidden mt-4 px-4">
          <ul className="space-y-4 text-center">
            <li><ScrollLink to="Home" smooth={true} duration={500} className="hover:text-gray-400 block cursor-pointer">Home</ScrollLink></li>
            <li><ScrollLink to="About" smooth={true} duration={500} className="hover:text-gray-400 block cursor-pointer">About</ScrollLink></li>
            <li><ScrollLink to="Contact" smooth={true} duration={500} className="hover:text-gray-400 block cursor-pointer">Contact</ScrollLink></li>
            {!token ? (
              <li><Link to="/Login" onClick={() => setUserType("User")}>Login</Link></li>
            ) : (
              <>
                {roll === "admin" ? (
                  <>
                    <li><Link to="/AddCustomer">New Customer</Link></li>
                    <li><Link to="/Attendance">Attendance</Link></li>
                    <li><Link to="/MealManage">On/Off</Link></li>
                    <li><Link to="/VerifyPayment">Payments</Link></li>
                    <li><Link to="/CashPayment">Cash Pay</Link></li>
                    <li><Link to="/Due">Due</Link></li>
                    <li><Link to="/CheckRecord">Check Record</Link></li>
                    <li><Link to="/ViewProfile">View Profile</Link></li>
                    <li><Link to="/ChangePassword">Change Password</Link></li>
                    <li><button onClick={logout}>Logout</button></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/ViewAttendance">Check Attendance</Link></li>
                    <li><Link to="/MealRequest">On/Off</Link></li>
                    <li><Link to="/SendPayment">Payments</Link></li>
                    <li><Link to="/ChangePassword">Change Password</Link></li>
                    <li><button onClick={logout}>Logout</button></li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
