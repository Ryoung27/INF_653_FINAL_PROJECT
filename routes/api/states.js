const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

router.route('/')
    .get(statesController.getAllStates)
    // .post(employeesController.createNewEmployee)
    // .put(employeesController.updateEmployee)
    // .delete(employeesController.deleteEmployee);

router.route('/:state/nickname')
    .get(statesController.getStateNickName);

router.route('/:state/capital')
    .get(statesController.getStateCapital);

router.route('/:state/population')
    .get(statesController.getStatePopulation);

router.route('/:state')
    .get(statesController.getState);




module.exports = router;