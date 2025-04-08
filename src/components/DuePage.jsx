import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function DuePage() {
  const [searchCanteenNo, setSearchCanteenNo] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { URL, token } = useContext(StoreContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(URL + '/api/admin/due', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setFilteredData(response.data.user);
        } else {
          toast.error(response.data.error);
        }
      } catch (err) {
        toast.error("Something went wrong.");
      }
    };
    loadData();
  }, [URL, token]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchCanteenNo) return toast.error("Please enter canteen No.");

    try {
      const response = await axios.post(URL + '/api/admin/specific',
        { canteenNo: searchCanteenNo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setFilteredData(response.data.user);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log("Error in due page " + error);
      toast.error("Internal server error!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-20 sm:p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Student Due Information
        </h2>

        <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row justify-center items-stretch gap-2">
          <input
            type="text"
            placeholder="Enter Canteen No"
            value={searchCanteenNo}
            onChange={(e) => setSearchCanteenNo(e.target.value)}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="p-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-sm sm:text-base">
                <th className="p-3 border text-left">Canteen No</th>
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">Department</th>
                <th className="p-3 border text-right">Total Due</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-100 text-sm sm:text-base">
                    <td className="p-3 border">{student.canteenNo}</td>
                    <td className="p-3 border">{student.name}</td>
                    <td className="p-3 border">{student.department}</td>
                    <td className="p-3 border text-right">₹{student.totalAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 border text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
