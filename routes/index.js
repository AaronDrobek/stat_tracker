const express = require("express");
const router = express.Router();
const models = require("../models/index");
const passport = require("passport");




router.get('/authorize',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        res.json({"hello": req.user})
    }
);
router.get("/poopface", function(req,res) {
  models.Stat.findAll()
  .then(function(data) {
    res.json({data:data, status:"shart"})
  })
})

router.get("/activities", function(req,res) {
  models.Activity.findAll({
      include: [{
        model: models.Stat,
        as: "Stats"
      }]
  })
  .then(function(data) {
    res.json({data:data, status: "success"})
  })
})

router.post("/activities", function(req,res) {
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

router.get("/activities/:id", function(req,res) {
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
router.put("/activities/:id", function(req,res) {
  models.Activity.update({
    activity: req.body.activity,
    measurement: req.body.measurement,
  }, {where:{
    id: req.params.id
  }})
  .then(function(data) {
    res.json({data:data, status: "success"})
  })
})

router.post("/activities/:id/stats", function(req,res) {
  models.Stat.create({
      activity_id: req.params.id,
      quantity: req.body.quantity
  })
  .then(function(data) {
    res.json({data:data, status: "success"})
  })
})

router.delete("/stats/:id", function(req,res) {
  models.Stat.destroy({
      where:{
        id: req.params.id
      }
  })
  .then(function(date) {
    res.json({data:data, status: "success"})
  })
  .catch(function(err) {
    res.json(err)
  })
})

router.delete("/activities/:id", function(req,res) {
  models.Stat.destroy({
      where: {
        activity_id: req.params.id
      }
  })
    .then(function(data) {
      models.Activity.destroy({
        where: {
          id: req.params.id
        }
      })
    })
    .then(function(data) {
      res.json({data:data, status: "success"})
    })
    .catch(function(err) {
      res.json(err)
    })
})

module.exports = router;
