const State = require('../models/State');

const data = {
    states: require('../models/statesData.json'),
    setStates: function (data) { this.states = data }
}

const getAllStates = async (req, res) => {
    let allStates = data.states;
  
    //Didn't like using a magic number, but the non-contingous states are greater than 48.
    if (req.query.contig === 'true') {
      allStates = allStates.filter(state => state.admission_number <= 48);
    } else if (req.query.contig === 'false') {
      allStates = allStates.filter(state => state.admission_number >= 49);
    }

    try{
        const mongoState = await State.find().exec()
        for(let i = 0; i< allStates.length; i++){
            const state = mongoState.find(state => state.stateCode === allStates[i].code);
            if(state !== undefined){
                allStates[i].funfacts = [];
                allStates[i].funfacts.push(...state.funfacts);
            }
        }
        res.json(allStates);
    } catch (err) {
        console.error(err);
    }
}

const getState = async (req, res) => {
    const state = data.states.find(state => state.code === req.params.state.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    try{
        const mongoState = await State.findOne({ stateCode: state.code }).exec()
        state.funfacts = [];
        for(let i = 0; i< mongoState.funfacts.length; i++){
            state.funfacts.push(mongoState.funfacts[i]);
        }
        res.json(state);
    } catch (err) {
        console.error(err);
    }
    
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

const getStateAdmission = async (req, res) => {
    const state = data.states.find(state => state.code === req.params.state.toUpperCase());
    if (!state) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
    res.json({"state": `${state.state}`, "admission": `${state.admission_date}`});}

const getFunFact = async (req, res) => {

    const userState = data.states.find(state => state.code === req.params.state.toUpperCase());

    const state = await State.findOne({ stateCode: userState.code }).exec();
    const funFactLength = state.funfacts.length
    const randomValue = Math.floor(Math.random() * funFactLength);

    res.json({"funfact": `${state.funfacts[randomValue]}`});
}


const createNewState = async (req, res) => {
    if (!req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'State fun facts value required'});
    }
    if (!req?.body?.stateCode) {
        return res.status(400).json({ 'message': 'Invalid state abbreviation parameter'});
    }

    try {
        const state = await State.findOne({ stateCode: req.body.stateCode }).exec();
        if(!state){
            const result = await State.create({
                stateCode: req.body.stateCode,
                funfacts: req.body.funfacts
            });
            res.status(201).json(result);
        }else{
            const result = await State.findOneAndUpdate({
                stateCode: req.body.stateCode
            },
            {
                $push: { funfacts: req.body.funfacts },
            },
            {new: true}
            );
            res.status(201).json(result);
        }
    } catch (err) {
        console.error(err);
    }
}

const updateState = async (req, res) => {
    if (!req?.body?.index) {
        return res.status(400).json({ 'message': 'State fun fact index value required'});
    }
    if (!req?.body?.stateCode) {
        return res.status(400).json({ 'message': 'Invalid state abbreviation parameter'});
    }
    if (!req?.body?.funfact) {
        return res.status(400).json({ 'message': 'State fun fact value required'});
    }

    const funFactsIndex = req.body.index - 1;
    const state = await State.findOne({ stateCode: req.body.stateCode }).exec();
    const stateJSONData = data.states.find(state => state.code === req.body.stateCode.toUpperCase());

    if (req.body.index > state.funfacts.length) {
        return res.status(404).json({ "message": `No Fun Fact found at that index for ${stateJSONData.state}` })
    }

    state.funfacts.splice(funFactsIndex, 1);
    state.funfacts.splice(funFactsIndex, 0, req.body.funfact[0]);

    const result = await State.findOneAndUpdate({
        stateCode: req.body.stateCode
    },
    {
        funfacts: state.funfacts,
    },
    {new: true}
    );
    res.status(201).json(result);
}

const deleteFunFact = async (req, res) => {
    if (!req?.body?.index) {
        return res.status(400).json({ 'message': 'State fun fact index value required'});
    }
    if (!req?.body?.stateCode) {
        return res.status(400).json({ 'message': 'Invalid state abbreviation parameter'});
    }

    const funFactsIndex = req.body.index - 1;

    const state = await State.findOne({ stateCode: req.body.stateCode }).exec();
    const stateJSONData = data.states.find(state => state.code === req.body.stateCode.toUpperCase());

    if (req.body.index > state.funfacts.length) {
        return res.status(404).json({ "message": `No Fun Fact found at that index for ${stateJSONData.state}` })
    }
    state.funfacts.splice(funFactsIndex, 1);

    const result = await State.findOneAndUpdate({
        stateCode: req.body.stateCode
    },
    {
        funfacts: state.funfacts,
    },
    {new: true}
    );
    res.status(201).json(result);
}

module.exports = {
    getAllStates,
    getState,
    getStateNickName,
    getStateCapital,
    getStatePopulation,
    getFunFact,
    getStateAdmission,
    createNewState,
    updateState,
    deleteFunFact
}