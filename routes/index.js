var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uid2 = require("uid2")

var hotelInfosModel = require('../models/hotelInfos')
var userModel = require('../models/users')
var eventConfirmationModel = require('../models/eventConfirmation')
var eventsModel = require('../models/events')
var orderBreakfastsModel = require('../models/orderBreakfasts')
var recommandationsModel = require('../models/recommandations')
var foodModel = require('../models/foods')


//GET HOME IMAGE

router.get("/image", async function (req, res) {
  var saveImage = await hotelInfosModel.find()
  var images = saveImage[0].images
  result = false
  if (images) {
    result = true
  }
  res.json({ result, images })
})

/* POST SIGN-UP. */
router.post('/sign-up', async function (req, res, next) {

  var error = []
  var result = false
  var saveUser = null
  var token = null
  console.log('lastName', req.body.lastnameFromFront)
  console.log('email', req.body.emailFromFront)
  console.log('room', req.body.roomNumberFromFront)


  // CONDITIONS SIGN UP AVEC MESSAGES DERREURS SUR CHAMPS VIDE ET VOUS ETES DEJA INSCRITS
  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })
  if (data != null && req.body.lastnameFromFront != "undefined" && req.body.emailFromFront != "undefined" && req.body.roomNumberFromFront != "undefined"
  ) {
    error.push('Vous êtes déja inscrit. Veuillez vous connecter directement.')
  }
  else if (req.body.lastnameFromFront == "undefined"
    || req.body.emailFromFront == "undefined"
    || req.body.roomNumberFromFront == "undefined"
  ) {
    error.push('champs vides')
  }
  else if (error.length == 0) {
    var newUser = new userModel({
      lastName: req.body.lastnameFromFront,
      email: req.body.emailFromFront,
      roomNumber: req.body.roomNumberFromFront,
      token: uid2(32)
    })

    saveUser = await newUser.save()
    if (saveUser) {
      token = saveUser.token
      result = true
    }
  }
  console.log(error)

  res.json({ result, saveUser, error, token })

})


//POST SIGN-IN
router.post('/sign-in', async function (req, res, next) {
  var user = null
  var error = []
  var token = null
  var result = false

  console.log('lastNameIn', req.body.lastnameFromFront)
  console.log('emailIN', req.body.emailFromFront)
  console.log('roomIN', req.body.roomNumberFromFront)


  // CONDITIONS SIGN UP AVEC MESSAGES DERREURS SUR CHAMPS VIDE ET VOUS ETES DEJA INSCRITS

  if (req.body.emailFromFront == ''
    || req.body.lastnameFromFront == ''
    || req.body.roomNumberFromFront == ''
  ) {
    error.push("champs vides. Merci de saisir tous les champs")
  }
  console.log(error.length, "ugddjdgjdhjs")


  // SI CHAMPS REMPLI TU ENVOIES LE TOUT 
  // SI EMAIL NON CORRECT VS BDD ALORS TU DEMANDES DE S'INSCRIRE DABORD
  if (error.length == 0) {

    var user = await userModel.findOne({
      lastName: req.body.lastnameFromFront,
      email: req.body.emailFromFront,
      roomNumber: req.body.roomNumberFromFront,
    })
    console.log("user+++++: ", user)
  }

  if (user) {
    if (req.body.emailFromFront === user.email) {
      result = true
      token = user.token
    } else {
      result = false
      error.push('email incorrect')
    }
  } else {
    error.push("Veuillez d'abord vous inscrire avant de vous connecter ! Merci.")
  }
  console.log(user, "je suis inscrite")
  res.json({ result, user, error, token })
})


//Get EVENT (Carousel & detail EVENT)
router.get('/events', async function (req, res, next) {

  var events = await eventsModel.find()

  var result = false;
  if (events) {
    result = true;
  }
  res.json({ result, events })
})

//Get EVENT ID

router.get('/events/:id', async function (req, res, next) {

  var event = await eventsModel.findById(req.params.id)

  console.log('event', event)
  var result = false;
  if (event) {
    result = true;
  }
  res.json({ result, event })
})

//POST EVENT CONFIRMATION  
router.post('/confirmation', async function (req, res, next) {

  var user = await userModel.findOne({
    token: req.body.token,
  })
  var idUser = user.id
  var newEventConfirmation = new eventConfirmationModel({
    user: idUser,
    event: req.body.eventId,
    isComing: req.body.isComing
  })
  saveConfirmationEvent = await newEventConfirmation.save()

  var result = false;
  if (saveConfirmationEvent) {
    result = true;
  }

  res.json({ result,saveConfirmationEvent })
})


//GET RECOMMENDATION
router.get("/recommandation", async function (req, res) {

  const recommandations = await recommandationsModel.find()

  var result = false
  if (recommandations) {
    result = true
  }
  res.json({ result, recommandations })

})

router.get("/recommandation/:type/:name", async function (req, res) {

  const recommandations = await recommandationsModel.find({ typeRecommandation: req.params.type })
  var recommandationDetails = recommandations[0].recommandationDetails.filter(e => e.nameRecommandation == req.params.name)

  var result = false

  if (recommandationDetails) {
    result = true
  }
  res.json({ result, recommandationDetails })

})


router.get("/restauration/:route", async function (req, res) {
  var foodType = req.params.route;
  console.log('type',req.params.route)
  var food = await foodModel.find({ type: req.params.route });
console.log('fooddddddd',food)

  var result = false
  if (food) {
    result = true
  }

  res.json({result,food });
});

router.get("/restauration/:route/:id", async function (req, res) {
  var foodType = req.params.route;
  console.log('type',req.params.route)
  var food = await foodModel.findById( req.params.id);

  var result = false
  if (food) {
    result = true
  }

  res.json({result,food });
});

// send the order to the BDD 
router.post("/orderConfirmation", async function (req, res) {
  
  var saveUser = await userModel.findOne({
    token: req.body.token,
  })
  
  var idUser = saveUser.id
  var hhh = JSON.parse(req.body.details)

  let obj = {};
  const newOrder = new orderBreakfastsModel({
    total: req.body.price,
    quantity: req.body.quantity,
    lieu: req.body.lieu,
    userID: idUser,
      order: [
        {
          foodID: req.body.foodID,
          details:hhh.tabOrderFood,
        }, 
      ],
    
  });
  const order = await newOrder.save();
  console.log('newOrder',hhh.tabOrderFood)
  if(order.userID){
    res.json({result : "order saved"})
  }else if(!order.userID){
    res.json({result : "order has not "})
  }
});

//GET EVENT /USER
router.post('/account', async function (req, res, next) {

  console.log(req.body.token, "token")

  var saveUser = await userModel.findOne({
    token: req.body.token,
  })
  console.log(saveUser.id, 'useeeeeeeer')
  var idUser = saveUser.id
  var saveEvents = await eventConfirmationModel.find({
    user: idUser,
    isComing:true
  }).populate('event').exec()
  console.log('saveEvents', saveEvents)


  var resultUser = false;
  if (saveUser) {
    resultUser = true;
  }
  var resultEvent = false;
  if (saveEvents) {
    resultEvent = true;
  }
 


  res.json({ resultUser, resultEvent, saveUser, saveEvents })
})


module.exports = router;
