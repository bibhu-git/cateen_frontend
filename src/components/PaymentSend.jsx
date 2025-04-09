import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContextProvider";
import { toast } from "react-toastify";
import QRcode from '/QRcode.jpg';

export default function PaymentPage() {
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [amount, setAmount] = useState("");
  const [pendingAmount, setPendingAmount] = useState(null);
  const { URL, token } = useContext(StoreContext);

  useEffect(() => {
    if (token) {
      fetchPendingAmount();
    }
  }, [token]);

  const fetchPendingAmount = async () => {
    try {
      const response = await axios.get(`${URL}/api/user/payment/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.success) {
        setPendingAmount(response.data.totalAmount);
      } else {
        toast.error(response.data.error || "Unable to fetch pending amount");
      }
    } catch (error) {
      toast.error("Error fetching pending amount.");
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("transactionId", transactionId);
    formData.append("image", screenshot);
    try {
      const response = await axios.post(`${URL}/api/user/payment/submit`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success("Payment information submitted successfully");
        setTransactionId("");
        setAmount("");
        setScreenshot(null);
        fetchPendingAmount(); // refresh pending amount
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Payment submission failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Payment Page
        </h2>

        {/* Pending Amount Section */}
        <div className="mb-6 text-center">
          {pendingAmount !== null ? (
            <div className="text-lg font-semibold text-gray-700 bg-yellow-100 px-6 py-3 rounded-md inline-block shadow">
              Pending Amount: <span className="text-red-600">₹{pendingAmount}</span>
            </div>
          ) : (
            <p className="text-gray-500">Loading pending amount...</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center">
          {/* QR Code Section */}
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <img
              src={QRcode}
              alt="Payment QR Code"
              className="w-56 h-64 object-cover rounded-lg border border-gray-300"
            />
          </div>

          {/* Payment Form Section */}
          <div className="md:w-2/3 md:pl-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Amount Paid
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter the amount paid"
                  className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Transaction ID
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter your transaction ID"
                  className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Payment Screenshot
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
              >
                Submit Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
