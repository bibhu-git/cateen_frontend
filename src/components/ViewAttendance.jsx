import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/StoreContextProvider";
import { toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

const ViewAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(false);
  const { URL, token } = useContext(StoreContext);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (token) {
      fetchAttendance(selectedMonth);
    }
  }, [selectedMonth, token]);

  const fetchAttendance = async (month) => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/api/user/viewAttendance`, {
        params: { month },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setAttendance(response.data.data);
      } else {
        toast.error(response.data.error || "Failed to fetch attendance");
      }
    } catch (error) {
      toast.error("Error fetching attendance.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[90vh]">
      <div className="max-w-8xl mx-auto p-6 mt-20">
        <div className="bg-white text-gray-900 shadow-lg rounded-lg p-4 sm:p-6 border min-h-[80vh] sm:min-h-full">
          <h2 className="text-2xl font-bold text-center mb-6">📅 View Attendance</h2>

          {/* Month Picker */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-gray-100 text-gray-900 px-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Attendance Table */}
          <div className="w-full overflow-hidden">
            {loading ? (
              <p className="text-center text-gray-500 animate-pulse">Loading attendance...</p>
            ) : (
              <div className="grid grid-cols-1 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-center border border-gray-300 rounded-lg text-sm sm:text-base">
                    <thead className="bg-gray-200 text-gray-800">
                      <tr>
                        <th className="px-2 py-2 border">Canteen No</th>
                        <th className="px-2 py-2 border">Date</th>
                        <th className="px-2 py-2 border">Breakfast</th>
                        <th className="px-2 py-2 border">Lunch</th>
                        <th className="px-2 py-2 border">Dinner</th>
                        <th className="px-2 py-2 border">Extra</th>
                        <th className="px-2 py-2 border">Extra Cost</th>
                        <th className="px-2 py-2 border">Total Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {attendance.length > 0 ? (
                        attendance.map((record, index) => (
                          <tr key={index} className="hover:bg-gray-100 transition-all">
                            <td className="px-2 py-2 border">{record.canteenNo}</td>
                            <td className="px-2 py-2 border">{record.date.toString().slice(0, 10)}</td>
                            <td className="px-2 py-2 border">
                              <span
                                className={`px-2 py-1 rounded-md text-sm ${
                                  record.breakfast ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                                }`}
                              >
                                {record.breakfast ? "Yes" : "No"}
                              </span>
                            </td>
                            <td className="px-2 py-2 border">
                              <span
                                className={`px-2 py-1 rounded-md text-sm ${
                                  record.lunch ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                                }`}
                              >
                                {record.lunch ? "Yes" : "No"}
                              </span>
                            </td>
                            <td className="px-2 py-2 border">
                              <span
                                className={`px-2 py-1 rounded-md text-sm ${
                                  record.dinner ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                                }`}
                              >
                                {record.dinner ? "Yes" : "No"}
                              </span>
                            </td>
                            <td className="px-2 py-2 border">
                              <span
                                className={`px-2 py-1 rounded-md text-sm ${
                                  record.extra ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                                }`}
                              >
                                {record.extra ? "Yes" : "No"}
                              </span>
                            </td>
                            <td className="px-2 py-2 border text-yellow-600 font-semibold">₹{record.extraAmount}</td>
                            <td className="px-2 py-2 border font-bold text-blue-600">₹{record.total}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center px-4 py-3 text-gray-500">
                            No attendance records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;
