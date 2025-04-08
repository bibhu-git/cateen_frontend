import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

export default function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const { URL, token } = useContext(StoreContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`${URL}/api/admin/payment/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          const sortedPayments = response.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPayments(sortedPayments);
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        toast.error("Server error while fetching payments");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setProcessingId(id);
      const response = await axios.post(
        `${URL}/api/admin/payment/update`,
        { id, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setPayments((prev) =>
          [...prev.map((payment) =>
            payment._id === id ? { ...payment, status } : payment
          )].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
        toast.success("Status updated");
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Error updating status");
      console.log(error);
    } finally {
      setProcessingId(null);
    }
  };

  const hasPending = payments.some((p) => p.status === "Pending");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading payments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 mt-12">
      <div className="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
          Payment Management
        </h2>

        {/* Table for medium and large screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Canteen No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Amount Paid</th>
                <th className="p-3 text-left">Transaction ID</th>
                <th className="p-3 text-left">Screenshot</th>
                <th className="p-3 text-left">Status</th>
                {hasPending && <th className="p-3 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="border-b hover:bg-gray-100 transition">
                  <td className="p-3">{payment.canteenNo}</td>
                  <td className="p-3">{payment.name}</td>
                  <td className="p-3">₹{payment.amount}</td>
                  <td className="p-3">{payment.transactionId}</td>
                  <td className="p-3">
                    <a
                      href={`${URL}/images/${payment.image}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`${URL}/images/${payment.image}`}
                        alt="Payment Screenshot"
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    </a>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-md text-sm font-semibold ${
                        payment.status === "Accepted"
                          ? "bg-green-200 text-green-700"
                          : payment.status === "Rejected"
                          ? "bg-red-200 text-red-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  {hasPending && (
                    <td className="p-3 space-x-2">
                      {payment.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(payment._id, "Accepted")}
                            disabled={processingId === payment._id}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:bg-gray-400"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(payment._id, "Rejected")}
                            disabled={processingId === payment._id}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {payments.length === 0 && (
            <p className="text-center mt-4 text-gray-600">No payment records found.</p>
          )}
        </div>

        {/* Card style view for small screens */}
        <div className="md:hidden space-y-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-gray-50 p-4 rounded-md shadow border"
            >
              <p className="text-sm"><strong>Canteen No:</strong> {payment.canteenNo}</p>
              <p className="text-sm"><strong>Name:</strong> {payment.name}</p>
              <p className="text-sm"><strong>Amount:</strong> ₹{payment.amount}</p>
              <p className="text-sm"><strong>Txn ID:</strong> {payment.transactionId}</p>
              <div className="my-2">
                <a
                  href={`${URL}/images/${payment.image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${URL}/images/${payment.image}`}
                    alt="Payment Screenshot"
                    className="w-full h-40 object-cover rounded-md border"
                  />
                </a>
              </div>
              <p className="text-sm mb-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-md text-sm font-semibold ${
                    payment.status === "Accepted"
                      ? "bg-green-200 text-green-700"
                      : payment.status === "Rejected"
                      ? "bg-red-200 text-red-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {payment.status}
                </span>
              </p>

              {payment.status === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(payment._id, "Accepted")}
                    disabled={processingId === payment._id}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:bg-gray-400"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(payment._id, "Rejected")}
                    disabled={processingId === payment._id}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
