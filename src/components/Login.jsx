import { useForm } from "react-hook-form";
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { StoreContext } from "../context/StoreContextProvider";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setToken, URL } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      phone: data.phone,
      password: data.password,
    };
    setLoading(true);
    try {
      const response = await axios.post(URL + "/api/user/login", userInfo);
      if (response.data.success) {
        toast.success(response.data.message);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log("Error in login " + error);
      toast.error("Internal Server Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4">
      <div className="bg-white p-8 sm:p-10 shadow-2xl rounded-2xl w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-700 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Phone Number */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Phone Number</label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-100">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                autoFocus
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="w-full bg-gray-100 focus:outline-none"
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <div className="flex items-center border rounded-lg p-2 bg-gray-100">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters",
                  },
                })}
                className="w-full bg-gray-100 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-3 rounded-lg font-bold text-lg transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
