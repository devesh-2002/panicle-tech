import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMinSalary, setFilterMinSalary] = useState('');
  const [filterMaxSalary, setFilterMaxSalary] = useState('');

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/employee');
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error.message);
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  const filterByString = (value) => {
    if (typeof value === 'number') {
      value = value.toString();
    }
    return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filterBySalaryRange = (employee) => {
    const salary = employee.salary;
    return (
      (!filterMinSalary || salary >= parseFloat(filterMinSalary)) &&
      (!filterMaxSalary || salary <= parseFloat(filterMaxSalary))
    );
  };

  const filteredEmployees = employeeData.filter((employee) => {
    return (
      filterByString(employee.name) ||
      filterByString(employee.department) ||
      filterByString(employee.position) ||
      filterBySalaryRange(employee)
    );
  });

  const sortedAndFilteredEmployees = filteredEmployees
    .slice()
    .sort((a, b) => {
      if (!sortConfig) return 0;

      const key = sortConfig.key;
      const direction = sortConfig.direction === 'asc' ? 1 : -1;

      const valueA = key === 'salary' ? a[key] : filterByString(a[key]) ? a[key].toUpperCase() : a[key];
      const valueB = key === 'salary' ? b[key] : filterByString(b[key]) ? b[key].toUpperCase() : b[key];

      if (valueA < valueB) return -direction;
      if (valueA > valueB) return direction;
      return 0;
    })
    .filter(filterBySalaryRange);

  const currentEmployees = sortedAndFilteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full mx-auto mt-8 p-4 sm:p-8">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Employee List</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name, Position or Dept"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <span>Salary Range:</span>
          <input
            type="number"
            placeholder="Min Salary"
            value={filterMinSalary}
            onChange={(e) => setFilterMinSalary(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Max Salary"
            value={filterMaxSalary}
            onChange={(e) => setFilterMaxSalary(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-gray border border-gray-300 rounded-md overflow-hidden shadow-md">
          <thead className="bg-blue-700 text-white">
            <tr>
              <TableHeader label="Name" onClick={() => handleSort('name')} sortConfig={sortConfig} field="name" />
              <TableHeader label="Department" onClick={() => handleSort('department')} sortConfig={sortConfig} field="department" />
              <TableHeader label="Position" onClick={() => handleSort('position')} sortConfig={sortConfig} field="position" />
              <TableHeader label="Salary" onClick={() => handleSort('salary')} sortConfig={sortConfig} field="salary" />
              <th className="py-2 px-4 sm:py-3 sm:px-6 border-b border-gray-300 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee._id} className="hover:bg-gray-100 transition">
                <td className="py-2 sm:py-4 px-2 sm:px-4 border-b border-gray-300 text-sm">{employee.name}</td>
                <td className="py-2 sm:py-4 px-2 sm:px-4 border-b border-gray-300 text-sm">{employee.department}</td>
                <td className="py-2 sm:py-4 px-2 sm:px-4 border-b border-gray-300 text-sm">{employee.position}</td>
                <td className="py-2 sm:py-4 px-2 sm:px-4 border-b border-gray-300 text-sm">${employee.salary.toLocaleString()}</td>
                <td className="py-2 sm:py-4 px-2 sm:px-4 border-b border-gray-300 text-sm">
                  <Link to={`/employee-details/${employee._id}`} className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded-md">
                    {window.innerWidth > 600 ? 'View More' : 'View'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mb-10">
        {Array.from({ length: Math.ceil(sortedAndFilteredEmployees.length / employeesPerPage) }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className="mx-1 bg-blue-700 text-white px-3 py-1 rounded-md"
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

const TableHeader = ({ label, onClick, sortConfig, field }) => {
  const isSorted = sortConfig && sortConfig.key === field;
  const arrow = isSorted ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '';

  return (
      <th className="py-2 px-4 sm:py-3 sm:px-6 border-b border-gray-300 text-left text-sm font-medium" onClick={onClick}>
        <div className="flex items-center">
          <span className="ml-1 mr-1">{label} {arrow}</span>
          <svg height="20" viewBox="0 0 48 48" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 36h12v-4h-12v4zm0-24v4h36v-4h-36zm0 14h24v-4h-24v4z" />
            <path d="M0 0h48v48h-48z" fill="none" />
          </svg>
        </div>
      </th>

  );
};

export default EmployeeList;
