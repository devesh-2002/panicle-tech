const Employee = require("../model/employee");

const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee({
      name: req.body.name,
      department: req.body.department,
      position: req.body.position,
      salary: req.body.salary,
    });

    const savedEmployee = await employee.save();
    res.json(savedEmployee);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          department: req.body.department,
          position: req.body.position,
          salary: req.body.salary,
        },
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.deleteOne({ _id: req.params.id });
    if (deletedEmployee.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }
    res.json({
      success: true,
      message: 'Employee deleted successfully',
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
