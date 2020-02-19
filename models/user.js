const mongoose = require('mongoose');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  feeds: [{
    timestamp: {
      type: Date
    },
    type: {
      type: String
    },
    result: {
      type: String
    }
  }]
});

// Create user / Use this from outside / Send it to the mongoDB
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

// Make the query and bring one user by the username from the DB
module.exports.getUserByUsername = function(username, callback) {
  const query = {
    username: username
  }
  User.findOne(query, callback);
}

module.exports.addFeed = function(username, timestamp, type, result, callback) {
  const feed = {
    timestamp: timestamp,
    type: type,
    result: result
  }

  User.updateOne({
      username: username
    }, {
      $push: {
        feeds: feed
      }
    },
    callback);
}

module.exports.getFeedsByTypes = function(usernameRecived, typeRecived, callback) {
  User.aggregate([{
    $match: {
      "username": usernameRecived
    }
  }, {
    $unwind: '$feeds'
  }, {
    $match: {
      'feeds.type': typeRecived
    }
  }, {
    $group: {
      _id: '$_id',
      feeds: {
        $push: '$feeds'
      }
    }
  }], callback);
}

module.exports.addUser = function(newUser, callback) {
  newUser.save(callback);
}
