import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { StoreContext } from "../context/StoreContextProvider";
import { toast } from "react-toastify";

export default function AddCustomer() {
  const { URL , token} = useContext(StoreContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const studentInfo = {
        name: data.name,
        phone: data.phone,
        parentPhone: data.parentPhone,
        department: data.department,
        rollNo: data.rollNo,
        canteenNo: data.canteenNo,
        address: data.address
      }
      const response = await axios.post(URL+'/api/admin/register',studentInfo,{headers: { Authorization: `Bearer ${token}` }});
      if(response.data.success)
      {
        toast.success("User created successfully");
      }
      else{
        toast.error(response.data.error);
      }
      console.log(response.data);
    } catch (error) {
      console.log("Error in resister "+error);
      toast.error("Somthing went wrong!");
    }
    reset();
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 p-1 md:p-6 mt-10">
      <div className="bg-white py-7 px-4 md:px-8 shadow-md rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Enter Name"
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Phone</label>
              <input
                {...register("phone", { required: "Phone is required" })}
                className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Enter Phone"
              />
              <p className="text-red-500 text-sm">{errors.phone?.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Department</label>
              <input
                {...register("department", { required: "Department is required" })}
                className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Enter Department"
              />
              <p className="text-red-500 text-sm">{errors.department?.message}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Roll No</label>
              <input
                {...register("rollNo", { required: "Roll No is required" })}
                className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Enter Roll No"
              />
              <p className="text-red-500 text-sm">{errors.rollNo?.message}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Canteen No</label>
              <input
                {...register("canteenNo", { required: "Canteen No is required" })}
                className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Enter Canteen No"
              />
              <p className="text-red-500 text-sm">{errors.canteenNo?.message}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Parent's Phone</label>
              <input
                {...register("parentPhone", { required: "Parent's Phone is required" })}
                className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Enter Parent's Phone"
              />
              <p className="text-red-500 text-sm">{errors.parentPhone?.message}</p>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Address</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="Enter Address"
            ></textarea>
            <p className="text-red-500 text-sm">{errors.address?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
