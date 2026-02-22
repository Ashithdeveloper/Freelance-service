
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axois';

const Manager = () => {
    const [formData, setFormData] = useState({
      username: "",
      role: "Manager",
      password: "",
    });
    const [ listManagers , setListManagers] = useState([]);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      try {
        const response = await axiosInstance.post("/createManager", formData);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }

    };


    useEffect(() => {
       const listManager = async () => {
         try {
           const response = await axiosInstance.get("/listmanagers");
           console.log(response.data);
           setListManagers(response.data);
         } catch (error) {
           console.log(error);
         }
       };
       listManager();
    },[])
        
  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Add Manager Form */}
        <div className="w-full bg-white shadow-lg rounded-xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
            Add New Manager
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Add Manager
              </button>
            </div>
          </form>
        </div>

        {/* Managers List */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-6 text-gray-800">
            Managers List
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-600">
                    Password
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-600">
                    Role
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-center font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {listManagers.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">{item.username}</td>

                    <td className="px-4 sm:px-6 py-4">******</td>

                    <td className="px-4 sm:px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        {item.role}
                      </span>
                    </td>

                    <td className="px-4 sm:px-6 py-4 text-center space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Edit
                      </button>

                      <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Manager