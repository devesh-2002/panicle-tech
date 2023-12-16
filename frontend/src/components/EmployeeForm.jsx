import React, { useState } from 'react';
import axios from 'axios';

function EmployeeForm({ onEmployeeCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    salary: 0,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/employee', formData);
      console.log('Employee created:', response.data);

      // Notify the parent component about the new employee
      onEmployeeCreated(response.data);

      // Clear the form
      setFormData({
        name: '',
        department: '',
        position: '',
        salary: 0,
      });

      // Display success message
      setSuccessMessage('Employee created successfully!');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error creating employee:', error.message);

      setErrorMessage('Error creating employee. Please try again.');

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <>
      <h1 className="text-2xl my-5 text-center font-bold text-black">Employee Form</h1>
      <div className="max-w-md mx-auto bg-gray-900 my-5 p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="text-gray-400 text-sm">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full py-2.5 px-3 text-sm text-gray-200 bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="department" className="text-gray-400 text-sm">
              Department
            </label>
            <input
              type="text"
              name="department"
              id="department"
              value={formData.department}
              onChange={handleChange}
              className="block w-full py-2.5 px-3 text-sm text-gray-200 bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Enter your department"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="position" className="text-gray-400 text-sm">
              Position
            </label>
            <input
              type="text"
              name="position"
              id="position"
              value={formData.position}
              onChange={handleChange}
              className="block w-full py-2.5 px-3 text-sm text-gray-200 bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Enter your position"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="salary" className="text-gray-400 text-sm">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              id="salary"
              value={formData.salary}
              onChange={handleChange}
              className="block w-full py-2.5 px-3 text-sm text-gray-200 bg-transparent border-b-2 border-gray-500 focus:outline-none focus:border-blue-500"
              placeholder="Enter your salary"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>

          {successMessage && (
            <div className="text-green-500 mt-3 text-center">{successMessage}</div>
          )}

          {errorMessage && (
            <div className="text-red-500 mt-3 text-center">{errorMessage}</div>
          )}
        </form>
      </div>
    </>
  );
}

export default EmployeeForm;
