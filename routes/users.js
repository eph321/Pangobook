const express = require("express");
const router = express.Router();
const pangolinModel = require("../models/pangolins");
const bcrypt = require('bcrypt');
const uid2 = require('uid2');


router.post("/sign-up", async function(req, res) {
  const cost = 10;
  const hash = bcrypt.hashSync(req.body.password, cost);

  const alreadyExist = await pangolinModel.findOne({email: req.body.email.trim().toLowerCase()})
  if(!alreadyExist) {
    const newPangolin = new pangolinModel({
      token: uid2(32),
      email: req.body.email.trim().toLowerCase(),
      name: req.body.name,
      password: hash,
      roles: req.body.roles,
      types: req.body.types,
      hp: req.body.hp,
      friends: [],
    });
    const saveNewPangolin = await newPangolin.save();
    res.json(saveNewPangolin.token)
  } else {
    res.json({result: false, error: "Adresse e-mail déja utilisé"})
  }
});

router.post("/sign-in", async function(req, res) {
  let isLoggedIn;
  if(req.body.email !== undefined && req.body.password !== undefined) {
    const searchPangolin = await pangolinModel.findOne({
      email: req.body.email.trim().toLowerCase()
    });
    if(searchPangolin && bcrypt.compareSync(req.body.password, searchPangolin.password)) {
      isLoggedIn = searchPangolin.token;
    } else {
      isLoggedIn = false;
    };
  } else {
    isLoggedIn = false
  };
  console.log(isLoggedIn, "login")
  res.json(isLoggedIn)
});

router.get("/pangolins-list/:token", async function(req, res) {
  const pangolinList = await pangolinModel.find();
  const withoutCurrentPangolin = pangolinList.filter(pangolin => pangolin.token !== req.params.token)
  res.json(withoutCurrentPangolin)
});

router.get("/pangolin-detail/:token", async function(req, res) {
  const findPangolin = await pangolinModel.findOne({token: req.params.token})
  res.json(findPangolin)
});

router.put("/edit-pangolin", async function(req, res) {
  const cost = 10;
  const hash = bcrypt.hashSync(req.body.password, cost);

  let findPangolin = await pangolinModel.findOneAndUpdate({token : req.body.token}, {
    name: req.body.name,
    email: req.body.email.trim().toLowerCase(),
    password: hash,
    hp: req.body.hp,
    roles: req.body.roles,
    types: req.body.types,
  });
  if(findPangolin){
    res.json({edited :true, message: "Pangolin mis à jour !"})
  } else {
    res.json({edited :false, message: "Pangolin non trouvé !"})
  } 
});

router.put("/add-friend/", async function(req, res) {
  const currentPangolin = await pangolinModel.findOne({token: req.body.currentPangolin});
  const searchPangolin = await pangolinModel.findOne({token: req.body.friendToken});

  let existingFriend = currentPangolin.friends.includes(searchPangolin.id);
  if(!existingFriend){
    currentPangolin.friends = [...currentPangolin.friends, searchPangolin.id];
    await currentPangolin.save()
    let friendList = await currentPangolin.populate("friends")
    res.json(friendList.friends)
  } else {
    res.json(false)
  }
});

router.get("/friends-list/:token", async function(req, res) {
  const currentPangolin = await pangolinModel.findOne({token: req.params.token}).populate("friends");
  res.json(currentPangolin.friends)
});

router.put("/delete-friend", async function(req, res) {
  const currentPangolin = await pangolinModel.findOne({token: req.body.currentPangolin}).populate("friends");
  const searchPangolin = await pangolinModel.findOne({token: req.body.friendToken});

  const deleteFriend = currentPangolin.friends.filter(pangolin => pangolin.id !== searchPangolin.id);
  currentPangolin.friends = deleteFriend;
  const updateFriendsList = await currentPangolin.save();
  const friendList = await updateFriendsList.populate("friends");
  res.json(updateFriendsList ? friendList.friends : false)
});



module.exports = router;
