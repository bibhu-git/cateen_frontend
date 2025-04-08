import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { StoreContext } from "../context/StoreContextProvider";
import { toast } from "react-toastify";

export default function Attendance() {
    const { URL, token } = useContext(StoreContext);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get(`${URL}/api/admin/mealOn`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setStudents(response.data.students);
                } else {
                    toast.error("Error in fetching record");
                }
            } catch (error) {
                console.error("Error fetching students:", error);
                toast.error("Network error");
            }
        };
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mealRates = { breakfast: 20, lunch: 50, dinner: 20 };
    const extraRates = { Milk: 10, Fruit: 15 };

    const calculateTotal = (student) => {
        let total = 0;
        Object.keys(mealRates).forEach((meal) => {
            if (student[meal] === true) {
                total += mealRates[meal];
            }
        });
        total += student.rsExtra || 0;
        return total;
    };

    const handleSelection = (index, mealType, value) => {
        setStudents((prev) => {
            const updated = [...prev];
            updated[index][mealType] = value;
            updated[index].rsTotal = calculateTotal(updated[index]);
            return updated;
        });
    };

    const handleExtraChange = (index, value) => {
        setStudents((prev) => {
            const updated = [...prev];
            updated[index].extra = value;
            updated[index].rsExtra = extraRates[value] || 0;
            updated[index].rsTotal = calculateTotal(updated[index]);
            return updated;
        });
    };

    const handleSubmit = async (student) => {
        try {
            const attendanceData = {
                canteenNo: student.canteenNo,
                breakfast: student.breakfast,
                lunch: student.lunch,
                dinner: student.dinner,
                extra: student.extra,
                rsExtra: student.rsExtra,
                rsTotal: student.rsTotal
            };
            const response = await axios.post(`${URL}/api/admin/submitAttendance`, attendanceData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error in attendance", error);
            toast.error("Failed to submit attendance");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-xl mt-24 sm:mt-20 overflow-x-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Student Attendance Form</h2>

            <div className="min-w-[800px] sm:min-w-full">
                <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="border p-1 sm:p-2">Canteen No.</th>
                            <th className="border p-1 sm:p-2">Name</th>
                            <th className="border p-1 sm:p-2">Breakfast</th>
                            <th className="border p-1 sm:p-2">Lunch</th>
                            <th className="border p-1 sm:p-2">Dinner</th>
                            <th className="border p-1 sm:p-2">Extra</th>
                            <th className="border p-1 sm:p-2">RS Extra</th>
                            <th className="border p-1 sm:p-2">RS Total</th>
                            <th className="border p-1 sm:p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.canteenNo} className="text-center bg-gray-50">
                                <td className="border p-1 sm:p-2 font-medium">{student.canteenNo}</td>
                                <td className="border p-1 sm:p-2 font-medium">{student.name}</td>

                                {['breakfast', 'lunch', 'dinner'].map((meal) => (
                                    <td key={meal} className="border p-1 sm:p-2">
                                        <div className="flex justify-center gap-1">
                                            <button
                                                className={`px-2 sm:px-4 py-1 rounded-md text-xs sm:text-sm ${student[meal] === true ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                                                onClick={() => handleSelection(index, meal, true)}
                                                disabled={student[meal] !== null && student[meal] !== true}
                                            >
                                                Y
                                            </button>
                                            <button
                                                className={`px-2 sm:px-4 py-1 rounded-md text-xs sm:text-sm ${student[meal] === false ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
                                                onClick={() => handleSelection(index, meal, false)}
                                                disabled={student[meal] !== null && student[meal] !== false}
                                            >
                                                N
                                            </button>
                                        </div>
                                    </td>
                                ))}

                                <td className="border p-1 sm:p-2">
                                    <select
                                        className="border p-1 rounded-md w-full text-xs sm:text-sm"
                                        value={student.extra}
                                        onChange={(e) => handleExtraChange(index, e.target.value)}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="Milk">Milk</option>
                                        <option value="Fruit">Fruit</option>
                                    </select>
                                </td>

                                <td className="border p-1 sm:p-2">
                                    <input
                                        type="number"
                                        className="w-full border p-1 text-center text-xs sm:text-sm"
                                        value={student.rsExtra}
                                        readOnly
                                    />
                                </td>

                                <td className="border p-1 sm:p-2">
                                    <input
                                        type="number"
                                        className="w-full border p-1 text-center text-xs sm:text-sm"
                                        value={student.rsTotal}
                                        readOnly
                                    />
                                </td>

                                <td className="border p-1 sm:p-2">
                                    <button
                                        onClick={() => handleSubmit(student)}
                                        className="w-full bg-blue-500 text-white px-2 py-1 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-blue-600"
                                    >
                                        Action
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
