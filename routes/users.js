const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register a user
router.post('/register', (req, res, next) => {
  // Create a new user with the information that they subscribed
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username
  });

  // Add the user to the db
  User.addUser(newUser, (err, user) => {
    // Return the success state as false if it couldn't be registered
    if (err) {
      res.json({
        success: false,
        msg: 'Failed to register user'
      });
      // Return the success state as true if it could be registered
    } else {
      res.json({
        success: true,
        msg: 'User registered'
      });
    }
  });
});

router.post('/getUser', (req, res, next) => {
  let username = req.body.username;
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          username: user.username,
          feeds: user.feeds
        }
      });
    } else {
      return res.json({
        success: false,
        msg: 'No existe un alumno con esa matricula'
      });
    }
  })
});

router.post('/addFeed', (req, res, next) => {
  let username = req.body.username;
  let timestamp = req.body.timestamp;
  let type = req.body.type;
  let result = req.body.result;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'We didnt find the user'
      });
    } else {
      User.addFeed(username, timestamp, type, result, (err, user) => {
        if (err) {
          res.json({
            success: false,
            msg: 'We couldnt add the feed'
          });
        } else {
          res.json({
            success: true,
            msg: 'The feed is added successfully'
          });
        }
      });
    }
  });
});

router.post('/getFeedsByType', (req, res, next) => {
  let username = req.body.username;
  let type = req.body.type;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        msg: 'We didnt find the user'
      });
    } else {
      User.getFeedsByTypes(username, type, (err, user) => {
        if (err) {
          res.json({
            success: false,
            msg: 'We couldnt get the feeds'
          });
        } else {
          res.json({
            success: true,
            msg: user
          });
        }
      });
    }
  });
});

// Router module for make the petitions
module.exports = router;
