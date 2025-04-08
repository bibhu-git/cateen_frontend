import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FaMoneyBillWave, FaCalendarAlt, FaCheckCircle, FaExclamationCircle, FaUser } from "react-icons/fa";
import axios from "axios";
import { StoreContext } from "../context/StoreContextProvider";

const CashPayment = () => {
  const [canteenNumber, setCanteenNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [pendingAmount, setPendingAmount] = useState(null);
  const { URL, token } = useContext(StoreContext);

  // Sample Data (Replace with API call)

  const handleCheckOut = async () => {
    if (!canteenNumber) {
      toast.error("Please enter a canteen number!");
      return;
    }
    const response = await axios.get(URL + '/api/admin/payment/pending', {
      params: { canteenNo: canteenNumber },
      headers: {
        Authorization: `Bearer ${token}`
      }

    });
    console.log(response.data);

    if (response.data.success) {
      if (response.data.totalAmount !== 0) {
        setPendingAmount(response.data.totalAmount);

      }
      else {
        setPendingAmount(0);
        toast.info("No pending amount for this user.");
      }
    }
    else {
      toast.error("Something went wrong");
    }
  };

  const handlePayment = async () => {
    if (!canteenNumber || !amountPaid) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (parseFloat(amountPaid) > pendingAmount) {
      toast.warning("Amount paid exceeds pending amount.");
      return;
    }

    const response = await axios.post(URL + '/api/admin/payment/cash',
      { canteenNo: canteenNumber, amountPaid, paymentDate },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.success) {
      toast.success(`Payment of ₹${amountPaid} recorded for ${canteenNumber}`);
    }
    else {
      toast.error(response.data.error);
    }


    setCanteenNumber("");
    setAmountPaid("");
    setPaymentDate(new Date().toISOString().slice(0, 10));
    setPendingAmount(null);
  };

  return (
    <div className="min-h-[90vh]">
      <div className="max-w-lg mx-auto mt-20 p-8 bg-white shadow-xl rounded-xl border border-gray-200">
        {/* Header Section */}
        <div className="mb-6 flex justify-center">
          <h2 className="text-2xl text-center font-semibold text-gray-800 flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-500" /> Cash Payment
          </h2>
        </div>

        {/* Canteen Number Input */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium mb-2">Canteen Number</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={canteenNumber}
              onChange={(e) => setCanteenNumber(e.target.value)}
              placeholder="Enter Canteen No (e.g., C-101)"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Check Out Button */}
        <button
          onClick={handleCheckOut}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-all mb-4"
        >
          Check Pending Amount
        </button>

        {/* Pending Amount Display */}
        {pendingAmount !== null && (
          <div className={`mb-5 p-4 rounded-lg flex items-center font-medium ${pendingAmount > 0 ? "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800" : "bg-green-100 border-l-4 border-green-500 text-green-800"}`}>
            {pendingAmount > 0 ? <FaExclamationCircle className="mr-2" /> : <FaCheckCircle className="mr-2" />}
            Pending Amount: <span className="font-bold ml-2">₹{pendingAmount}</span>
          </div>
        )}

        {/* Amount Paid Input */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium mb-2">Amount Paid (₹)</label>
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Payment Date */}
        <div className="mb-5">
          <label className="block text-gray-600 font-medium mb-2">Payment Date</label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Confirm Payment Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg flex items-center justify-center transition-all"
        >
          <FaCheckCircle className="mr-2" /> Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default CashPayment;
