const State = require('../models/State');

const data = {
    states: require('../models/statesData.json'),
    setStates: function (data) { this.states = data }
}

const getAllStates = (req, res) => {
    let allStates = data.states;
  
    //Didn't like using a magic number, but the non-contingous states are greater than 48.
    if (req.query.contig === 'true') {
      allStates = allStates.filter(state => state.admission_number <= 48);
    } else if (req.query.contig === 'false') {
      allStates = allStates.find(state => state.admission_number >=49);
    }
    
    res.json(allStates);
}

const getState = async (req, res) => {
    const state = data.states.find(state => state.code === req.params.state.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json(state);
}

const getStateNickName = async (req, res) => {
    const state = data.states.find(state => state.code === req.params.state.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json({"state": `${state.state}`, "nickname": `${state.nickname}`});
}

const getStateCapital = async (req, res) => {
    const state = data.states.find(state => state.code === req.params.state.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json({"state": `${state.state}`, "capital": `${state.capital_city}`});
}

const getStatePopulation = async (req, res) => {
    const state = data.states.find(state => state.code === req.params.state.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json({"state": `${state.state}`, "population": `${state.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`});
}

module.exports = {
    getAllStates,
    getState,
    getStateNickName,
    getStateCapital,
    getStatePopulation
}