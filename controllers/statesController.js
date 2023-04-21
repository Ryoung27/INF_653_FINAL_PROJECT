const State = require('../models/State');

const data = {
    states: require('../models/statesData.json'),
    setStates: function (data) { this.states = data }
}

const getAllStates = (req, res) => {
    res.json(data.states);
}


module.exports = {
    getAllStates,
}