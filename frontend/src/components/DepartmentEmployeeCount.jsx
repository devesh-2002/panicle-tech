import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const Card = ({ children, className }) => (
  <div className={`max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const DepartmentEmployeeCount = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [averageSalary, setAverageSalary] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/employee');
        const employees = response.data;

        // Department-wise employee count data
        const groupedData = employees.reduce((acc, employee) => {
          const { department } = employee;
          acc[department] = (acc[department] || 0) + 1;
          return acc;
        }, {});

        const departmentLabels = Object.keys(groupedData);
        const employeeCounts = Object.values(groupedData);

        setDepartmentData({
          labels: departmentLabels,
          datasets: [
            {
              data: employeeCounts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
              ],
            },
          ],
        });

        // Position-wise employee count data for histogram
        const positionGroupedData = employees.reduce((acc, employee) => {
          const { position } = employee;
          acc[position] = (acc[position] || 0) + 1;
          return acc;
        }, {});

        const positionLabels = Object.keys(positionGroupedData);
        const positionCounts = Object.values(positionGroupedData);

        setPositionData({
          labels: positionLabels,
          datasets: [
            {
              label: 'Employee Count',
              data: positionCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
            },
          ],
        });

        // Total employees and average salary data
        setTotalEmployees(employees.length);
        const totalSalary = employees.reduce((total, employee) => total + employee.salary, 0);
        setAverageSalary(totalSalary / employees.length);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
        setError('Error fetching employee data. Please try again.');
        setLoading(false);
      }
    };

    // Fetch data on mount
    fetchData();
  }, []);

  if (loading) {
    return (
      <Card>
        <p>Loading employee data...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p>{error}</p>
      </Card>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Card className="my-5 mx-5 md:w-full md:mr-1">
          <h2 className="text-2xl font-bold mb-4">Department-wise Employee Count</h2>
          <Pie data={departmentData} />
        </Card>

        <div className="flex flex-col md:flex-row md:w-full">
          <Card className="my-5 mx-5 md:w-1/2 md:mr-5">
            <h2 className="text-2xl font-bold mb-4">Total Employees</h2>
            <p>{totalEmployees}</p>
          </Card>

          <Card className="my-5 md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Average Salary</h2>
            <p>${averageSalary.toFixed(2)}</p>
          </Card>
        </div>

        <Card className="my-2 md:w-full mx-5">
          <h2 className="text-2xl font-bold mb-4">Position-wise Employee Count</h2>
          <Bar data={positionData} />
        </Card>
      </div>
    </>
  );
};

export default DepartmentEmployeeCount;
