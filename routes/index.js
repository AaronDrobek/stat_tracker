const express = require("express");
const router = express.Router();
const models = require("../models/index");
const passport = require("passport");




router.get('/api/authorize',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        res.json({"hello": req.user})
    }
);
router.get("/api/poopface", function(req,res) {
  models.Stat.findAll()
  .then(function(data) {
    res.json({data:data, status:"shart"})
  })
})

router.get("/api/activities", function(req,res) {
  models.Activity.findAll({

  })
  .then(function(data) {
    res.json({data:data, status: "success"})
  })
})

router.post("/api/activities", function(req,res) {
  models.Activity.create({
    activity: req.body.activity,
    measurement: req.body.measurement
  })
  .then(function(data) {
    res.json({data:data, status: "success"})
  })
  .catch(function(err) {
    res.json(err)
  })
})

router.get("/api/activities/:id", function(req,res) {
  models.Activity.findOne({
    where: {
      id: req.params.id
    },
    include: [{ model: models.Stat, as: "Stats" }]
  })
  .then(function(data) {
    res.json({data:data, status: "success"})
  })
})




module.exports = router;
