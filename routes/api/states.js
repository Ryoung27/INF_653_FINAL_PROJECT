const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const abbrevCheck = require('../../middleware/abbrevHandler')
// router.all('/:state', abbrivCheck)




router.route('/')
    .get(statesController.getAllStates)
    .post(statesController.createNewState)
    // .put(employeesController.updateEmployee)
    // .delete(employeesController.deleteEmployee);
    
// router.all('/:state', abbrevCheck);

router.route('/:state/nickname')
    .get(statesController.getStateNickName);

router.route('/:state/capital')
    .get(statesController.getStateCapital);

    //Ronnie use the abbrevCheck for a post!!!
router.route('/:state/population')
    .get(abbrevCheck, statesController.getStatePopulation);

router.route('/:state')
    .get(statesController.getState);

    // app.use("/states/:state/funfact", myMiddleWare);




module.exports = router;