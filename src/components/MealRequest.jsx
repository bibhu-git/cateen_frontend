import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

export default function MealRequest() {
  const [currentMealStatus, setCurrentMealStatus] = useState(null);
  const [requestedMealStatus, setRequestedMealStatus] = useState(null);
  const [notes, setNotes] = useState("");
  const [user, setUser] = useState({});

  const { token, URL } = useContext(StoreContext);

  useEffect(() => {
    const getMealStatus = async () => {
      if (!token) {
        toast.error("Unauthorized. Please login again.");
        return;
      }

      try {
        const response = await axios.get(`${URL}/api/user/meal/status`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          setCurrentMealStatus(response.data.user.status);
          setRequestedMealStatus(!response.data.user.status); // initialize toggle opposite of current status
          setUser(response.data.user);
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        console.log("Error fetching meal status:", error);
        toast.error("Error loading meal status.");
      }
    };

    getMealStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleToggle = () => {
    setRequestedMealStatus((prev) => !prev);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        canteenNo: user.canteenNo,
        name: user.name,
        currentMealStatus,
        requestedMealStatus,
        notes
      };

      const response = await axios.post(`${URL}/api/user/mealRequest/submit`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log("Error in mealRequest:", error);
      toast.error("Failed to send request.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-6">
      <div className="bg-white p-6 sm:p-8 shadow-md rounded-lg w-full max-w-lg">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 mb-6">
          Meal Request Form
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
            <span className="text-sm sm:text-lg w-[85%]">
              {currentMealStatus === true
                ? "Meal is currently ON. Request to turn it OFF."
                : currentMealStatus === false
                ? "Meal is currently OFF. Request to turn it ON."
                : "Fetching current status..."}
            </span>
            <button
              onClick={handleToggle}
              className={`${
                requestedMealStatus === currentMealStatus
                  ? "bg-green-600"
                  : "bg-red-600"
              } relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
              <span
                className={`${
                  requestedMealStatus === currentMealStatus
                    ? "translate-x-6"
                    : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </button>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special request or reason..."
            className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold text-lg"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
