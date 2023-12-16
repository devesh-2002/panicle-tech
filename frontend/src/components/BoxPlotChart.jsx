import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { Chart, LinearScale, CategoryScale } from 'chart.js';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';

Chart.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale);

const BoxPlotChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/employee');
        const employeeData = response.data;

        const ctx = chartContainer.current.getContext('2d');

        const data = {
          labels: ['Salary Distribution'],
          datasets: [
            {
              label: 'Salary Range',
              data: employeeData.map((employee) => ({
                min: employee.salary - 20000, // Adjust for better visualization
                q1: employee.salary - 10000,
                median: employee.salary,
                q3: employee.salary + 10000,
                max: employee.salary+20000, // Adjust for better visualization
              })),
            },
          ],
        };

        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: 'boxplot',
          data: data,
          options: {
            scales: {
              x: {
                type: 'category',
                title: {
                  display: true,
                  text: 'Salary Distribution',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Salary',
                },
              },
            },
          },
        });
      } catch (error) {
        console.error('Error fetching employee data:', error.message);
      }
    };

    fetchData();
  }, []);

  return <canvas ref={chartContainer} />;
};

export default BoxPlotChart;
