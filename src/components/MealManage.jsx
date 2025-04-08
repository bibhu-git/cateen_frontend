import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { StoreContext } from "../context/StoreContextProvider";
import { toast } from "react-toastify";

export default function MealManagePage() {
  const [requests, setRequests] = useState([]);
  const { register } = useForm();
  const { URL, token } = useContext(StoreContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${URL}/api/admin/meal/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setRequests(response.data.data);
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        console.error("Error fetching meal requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const onSubmit = async ({ id, status }) => {
    try {
      const response = await axios.post(
        `${URL}/api/admin/meal/update`,
        { id, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setRequests((prev) =>
          prev.map((req) => (req._id === id ? { ...req, status } : req))
        );
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-2 py-6 sm:px-4 md:px-6 lg:px-8 mt-12">
      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-4 sm:mb-6">
          Meal On/Off Requests
        </h2>
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="p-3 sm:p-4 border rounded-md bg-gray-50"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      {req.name} ({req.canteenNo})
                    </h3>
                    <p className="text-sm text-gray-600">
                      Current: {req.currentMealStatus ? "Meal On" : "Meal Off"} | Request:{" "}
                      {req.requestedMealStatus ? "Meal On" : "Meal Off"}
                    </p>
                  </div>
                  <div>
                    {req.status !== "Pending" && (
                      <span
                        className={`font-semibold text-sm ${
                          req.status === "Accepted" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {req.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Notes Above Buttons */}
                <p className="text-sm text-gray-700 mb-2">{req.notes}</p>

                {req.status === "Pending" && (
                  <form className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                    <input type="hidden" {...register("id")} value={req._id} />
                    <button
                      type="button"
                      onClick={() => onSubmit({ id: req._id, status: "Accepted" })}
                      className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-green-700 transition"
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => onSubmit({ id: req._id, status: "Rejected" })}
                      className="bg-red-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-sm">No meal requests found.</p>
        )}
      </div>
    </div>
  );
}
