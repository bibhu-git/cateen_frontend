import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

export default function ViewProfile() {
  const [canteenNo, setCanteenNo] = useState("");
  const [record, setRecord] = useState(null);
  const [error, setError] = useState("");
  const { URL, token } = useContext(StoreContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${URL}/api/admin/userInfo`, {
        params: { canteenNo },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setRecord(response.data.data);
        setError("");
      } else {
        toast.error(response.data.error);
        setRecord(null);
        setError(`Record not found for canteen no: ${canteenNo}`);
      }
    } catch (err) {
      setRecord(null);
      setError("Something went wrong while fetching data.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center px-4 py-10 sm:py-16">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6">
          View Student Profile
        </h2>

        <form onSubmit={handleSearch} className="space-y-3 sm:space-y-4 mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Enter Canteen Number
          </label>
          <div className="flex flex-col sm:flex-row">
            <input
              type="text"
              value={canteenNo}
              onChange={(e) => setCanteenNo(e.target.value)}
              className="w-full px-4 py-2 border rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="e.g. CN2023001"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:bg-blue-700 transition-all font-semibold mt-2 sm:mt-0"
            >
              Search
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-600 text-center font-medium mb-4">
            {error}
          </div>
        )}

        {record && (
          <div className="bg-blue-50 border border-blue-200 p-4 sm:p-6 rounded-lg shadow-md space-y-2 sm:space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-blue-700">
              {record.name}
            </h3>
            <div className="text-gray-800 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <p><span className="font-medium">Canteen No:</span> {record.canteenNo}</p>
              <p><span className="font-medium">Department:</span> {record.department}</p>
              <p><span className="font-medium">Roll No:</span> {record.rollNo}</p>
              <p><span className="font-medium">Phone:</span> {record.phone}</p>
              <p><span className="font-medium">Parent's Phone:</span> {record.parentPhone}</p>
              <p><span className="font-medium">Address:</span> {record.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
