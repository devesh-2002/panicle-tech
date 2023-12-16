const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

const { getEmployee, createEmployee,updateEmployee,deleteEmployee,getEmployeeById } = require("./controllers/employee");
router.get("/employee", getEmployee);
router.get('/employee/:id', getEmployeeById);
router.post("/employee", createEmployee);
router.put("/employee/:id",updateEmployee)
router.delete("/employee/:id",deleteEmployee);


module.exports = router;
