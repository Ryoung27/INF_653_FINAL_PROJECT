const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const abbrevCheck = require('../../middleware/abbrevHandler')




router.route('/')
    .get(statesController.getAllStates)

router.route('/:state/nickname')
    .get(statesController.getStateNickName);

router.route('/:state/capital')
    .get(statesController.getStateCapital);

    //Ronnie use the abbrevCheck for a post!!!
router.route('/:state/population')
    .get(abbrevCheck, statesController.getStatePopulation);

router.route('/:state/funfact')
    .get(statesController.getFunFact)

router.route('/:state/funfact')
    .post(statesController.createNewState);

router.route('/:state/funfact')
    .patch(statesController.updateState);


router.route('/:state/funfact')
    .delete(statesController.deleteFunFact);

router.route('/:state')
    .get(statesController.getState);

module.exports = router;