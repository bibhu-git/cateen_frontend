import axios from "axios";
import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContextProvider";
import { toast } from "react-toastify";

export default function CheckRecord() {
  const [canteenNo, setCanteenNo] = useState("");
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const [month, setMonth] = useState(currentMonth);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const { URL, token } = useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canteenNo) {
      toast.error("Please enter canteen number");
      return;
    }

    try {
      const response = await axios.get(`${URL}/api/admin/checkAttendance`, {
        params: { canteenNo },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const filtered = response.data.records.filter((record) => {
          const recordMonth = record.date.substring(5, 7);
          return recordMonth === month;
        });
        setFilteredRecords(filtered);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching records.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg w-full max-w-7xl">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
          Check Attendance Records
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end justify-center"
        >
          <div className="flex flex-col w-full sm:w-1/3">
            <label className="text-gray-600 mb-1 text-sm sm:text-base">
              Canteen Number
            </label>
            <input
              type="text"
              value={canteenNo}
              onChange={(e) => setCanteenNo(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter canteen number"
              required
            />
          </div>

          <div className="flex flex-col w-full sm:w-1/3">
            <label className="text-gray-600 mb-1 text-sm sm:text-base">
              Select Month
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((name, index) => (
                <option key={index} value={String(index + 1).padStart(2, "0")}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-semibold w-full sm:w-auto"
          >
            Search
          </button>
        </form>

        {filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base text-center border border-gray-300 rounded-lg">
              <thead className="bg-gray-200 text-gray-800">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border">Canteen No</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border">Date</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border">Breakfast</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border">Lunch</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border">Dinner</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border">Extra</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border">Extra Cost</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 border">Total Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {filteredRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition-all">
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border">{record.canteenNo}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border">{record.date.slice(0, 10)}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border">
                      <span className={`px-2 py-1 rounded-md text-sm ${record.breakfast ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                        {record.breakfast ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border">
                      <span className={`px-2 py-1 rounded-md text-sm ${record.lunch ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                        {record.lunch ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border">
                      <span className={`px-2 py-1 rounded-md text-sm ${record.dinner ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                        {record.dinner ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border">
                      <span className={`px-2 py-1 rounded-md text-sm ${record.extra ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                        {record.extra ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border text-yellow-600 font-semibold">
                      ₹{record.extraAmount}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 border font-bold text-blue-600">
                      ₹{record.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">
            No records found for the specified canteen number and month.
          </p>
        )}
      </div>
    </div>
  );
}
