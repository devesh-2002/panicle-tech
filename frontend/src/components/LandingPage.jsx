import React from 'react'
import DepartmentEmployeeCount from './DepartmentEmployeeCount'
import BoxPlotChart from './BoxPlotChart'
function LandingPage() {
  const Card = ({ children, className }) => (
    <div className={`max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow ${className}`}>
      {children}
    </div>
  );
  
  return (
    <div>
      <DepartmentEmployeeCount />
      <Card className="mb-5 mx-5">
        <div className="text-center font-bold"> Salary Boxplot</div>
        <BoxPlotChart />
      </Card>
      
    </div>
  )
}

export default LandingPage