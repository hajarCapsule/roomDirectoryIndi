var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uid2 = require("uid2")

var hotelInfosModel = require('../models/hotelInfos')
var userModel = require('../models/users')
var eventConfirmationModel = require('../models/eventConfirmation')
var eventsModel = require('../models/events')
var orderBreakfastsModel = require('../models/orderBreakfasts')
var recommandationsModel = require('../models/recommandationsDetails')
var foodModel = require('../models/foods')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

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
      lastName: req.body.lastnameFromFront.toLowerCase(),
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

  res.json({ result, saveUser, error, token })

})


//POST SIGN-IN
router.post('/sign-in', async function (req, res, next) {

  var user = null
  var error = []
  var token = null
  var result = false

  // CONDITIONS SIGN UP AVEC MESSAGES DERREURS SUR CHAMPS VIDE ET VOUS ETES DEJA INSCRITS
  if (req.body.emailFromFront == ''
    || req.body.lastnameFromFront == ''
    || req.body.roomNumberFromFront == ''
  ) {
    error.push("champs vides. Merci de saisir tous les champs")
  }


  // SI CHAMPS REMPLI TU ENVOIES LE TOUT 
  // SI EMAIL NON CORRECT VS BDD ALORS TU DEMANDES DE S'INSCRIRE DABORD
  if (error.length == 0) {

    var user = await userModel.findOne({
      lastName: req.body.lastnameFromFront.toLowerCase(),
      email: req.body.emailFromFront,
      roomNumber: req.body.roomNumberFromFront,
    })
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

//Récupérer l'event sélectionné au niveau du front
router.get('/events/:id', async function (req, res, next) {

  var event = await eventsModel.findById(req.params.id)
  var result = false;

  if (event) {
    result = true;
  }

  res.json({ result, event })
})

//Ajouter une confirmation de la participation à l'événement sélectionné par user
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


//Récupérer les recommandations de la DB
router.get("/recommandation", async function (req, res) {

  const recommandations = await recommandationsModel.find()

  var result = false
  if (recommandations) {
    result = true
  }

  res.json({ result, recommandations })
})

//Récupérer la recommandation sélectionnée par le user par type et name
router.get("/recommandation/:type/:name", async function (req, res) {

  const recommandations = await recommandationsModel.find({ typeRecommandation: req.params.type })
  var recommandationDetails = recommandations[0].recommandationDetails.filter(e => e.nameRecommandation == req.params.name)

  var result = false
  if (recommandationDetails) {
    result = true
  }

  res.json({ result, recommandationDetails })
})

//Récupérer les repas selon leur type(petit dej)
router.get("/restauration/:route", async function (req, res) {

  var foodType = req.params.route;
  var food = await foodModel.find({ type: req.params.route });

  var result = false
  if (food) {
    result = true
  }

  res.json({result,food });
});

//Récupérer les repas selon leur type(petit dej)et l'id du petit dej(parisien ou gourmand)
router.get("/restauration/:route/:id", async function (req, res) {

  var foodType = req.params.route;
  var food = await foodModel.findById( req.params.id);

  var result = false
  if (food) {
    result = true
  }

  res.json({result,food });
});

//Ajouter une commande dans la DB
router.post("/orderConfirmation", async function (req, res) {
  
  var saveUser = await userModel.findOne({
    token: req.body.token,
  })
  
  var idUser = saveUser.id
  var detail = JSON.parse(req.body.details)

  let obj = {};
  const newOrder = new orderBreakfastsModel({
    total: req.body.price,
    quantity: req.body.quantity,
    lieu: req.body.lieu,
    userID: idUser,
    foodID: req.body.foodID,
      order: [
        {
          details:detail.tabOrderFood,
        }, 
      ],
    
  });
  const order = await newOrder.save();

  if(order.userID){
    res.json({result : "order saved"})
  }else if(!order.userID){
    res.json({result : "order has not "})
  }
});

//Recap des events sélectionné par utilisateur
router.post('/account', async function (req, res, next) {

  var saveUser = await userModel.findOne({
    token: req.body.token,
  })
  var idUser = saveUser.id
  var saveEvents = await eventConfirmationModel.find({
    user: idUser,
    isComing:true
  }).populate('event').exec()


  var saveOrder = await orderBreakfastsModel.find({
    userID: idUser,
    }).populate('foodID').exec()
    console.log('saveOrder',saveOrder)

    
  
    var resultUser = false;
    if (saveUser) {
      resultUser = true;
    }
    var resultEvent = false;
    if (saveEvents) {
      resultEvent = true;
    }
    var resultOrder = false;
    if (saveOrder) {
      resultOrder = true;
    }
  
  res.json({ resultOrder,resultUser,resultEvent,saveUser,saveEvents,saveOrder})
})


module.exports = router;
