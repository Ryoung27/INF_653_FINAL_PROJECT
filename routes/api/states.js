const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

router.route('/')
    .get(statesController.getAllStates)
    // .post(employeesController.createNewEmployee)
    // .put(employeesController.updateEmployee)
    // .delete(employeesController.deleteEmployee);

// router.route('/:id')
    // .get(employeesController.getEmployee);


module.exports = router;