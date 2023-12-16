import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeDetails() {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    name: '',
    department: '',
    position: '',
    salary: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id, editSuccess, deleteSuccess]);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/employee/${id}`);
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error.message);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this employee?');
  
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/employee/${id}`);
        console.log('Employee deleted successfully');
        setDeleteSuccess(true);
        setTimeout(() => {
          setDeleteSuccess(false);
          navigate('/employee-list');
        }, 3000);
      } catch (error) {
        console.error('Error deleting employee:', error.message);
      }
    }
  };
  
  const handleInputChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:8000/employee/${id}`, employeeData);
      console.log('Employee details updated successfully');
      setEditSuccess(true);
      setTimeout(() => {
        setEditSuccess(false);
        setEditMode(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating employee details:', error.message);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const chartData = {
    labels: ["Jan"],
    datasets: [
      {
        label: "Monthly Salary",
        data: [employeeData.salary],
        backgroundColor: "blue",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Monthly Salary Chart",
      },
    },
    scales: {
      x: {
        labels: ["Jan"],
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="my-5 mx-2 md:w-1/2">
        <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-4 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {editMode ? 'Edit Employee Details' : 'Employee Details'}
          </h5>
          {editSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
              <p className="font-bold">Edit Successful!</p>
              <p>Employee details have been updated.</p>
            </div>
          )}
          {deleteSuccess && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p className="font-bold">Delete Successful!</p>
              <p>Employee has been deleted.</p>
            </div>
          )}
          {editMode ? (
            <form className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-600 dark:text-gray-400">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={employeeData.name}
                  onChange={handleInputChange}
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 dark:text-gray-400">Department:</label>
                <input
                  type="text"
                  name="department"
                  value={employeeData.department}
                  onChange={handleInputChange}
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 dark:text-gray-400">Position:</label>
                <input
                  type="text"
                  name="position"
                  value={employeeData.position}
                  onChange={handleInputChange}
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 dark:text-gray-400">Salary:</label>
                <input
                  type="number"
                  name="salary"
                  value={employeeData.salary}
                  onChange={handleInputChange}
                  className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <button
                type="button"
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
              >
                Save
              </button>
            </form>
          ) : (
            <>
              <h5 className="mb-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {employeeData.name}
              </h5>
              <p className="text-gray-700 dark:text-gray-400">
                Department: {employeeData.department}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                Position: {employeeData.position}
              </p>
              <p className="text-green-600 dark:text-green-400 font-bold">
                Salary: ${employeeData.salary.toLocaleString()}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={toggleEditMode}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="block mt-5 mx-2">
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Monthly Salary Chart
          </h5>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
