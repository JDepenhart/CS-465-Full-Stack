const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register model
const Model = mongoose.model('trips');

//GET: /trips - list all the trips
//regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    // Uncomment this to show querey results 
    // on the console
    //console.log(q);

    if(!q)
    { // Retun no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res  
            .status(200)
            .json(q);
    }

};

//GET: /trips:/tripCpde - list a singlr trip
//regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // Return single records
        .exec();

    // Uncomment this to show querey results 
    // on the console
    //console.log(q);

    if(!q)
    { // Retun no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res  
            .status(200)
            .json(q);
    }

};

module.exports = {
    tripsList,
    tripsFindByCode
};