const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register model
const Model = mongoose.model('trips');
const User = mongoose.model("users");

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

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
    await getUser(req, res, (req, res) => {
      const q = Model.create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.send(err);
        });
    });
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    await getUser(req, res, (req, res) => {
      try {
        const q = Model.findOneAndUpdate(
          { code: req.params.tripCode },
          {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description,
          }
        ).exec();
        if (!q) {
          // Database returned no data
          return res.status(404).json({ message: "Trip not found" });
        } else {
          // Return resulting updated trip
          return res.status(200).json(q);
        }
      } catch (error) {
        console.error("Error updating trip:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
};

const tripsDeleteTrip =  async (req, res) => {
  console.log("Delete trip called", req.params.tripCode);
  await getUser(req, res, (req, res) => {
    try {
      const q = Model.findOneAndDelete (
        { code: req.params.tripCode }
      ).exec();
      if (!q) {
        // Database returned no data
        return res.status(404).json({ message: "Trip not found" });
      } else {
        // Return resulting updated trip
        return res.status(200).json(q);
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

const getUser = async (req, res, callback) => {
    if (req.auth && req.auth.email) {
      try {
        const user = await User.findOne({ email: req.auth.email }).exec();
        if (!user) {
          return res.status(404).json({ message: "User not found1" });
        }
        callback(req, res, user.name);
      } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "User not found2" });
      }
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};