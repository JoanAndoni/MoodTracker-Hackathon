// Make the comunication with a server to create petitions
const express = require('express');
// Make the paths for the paths to create the petitions
const path = require('path');
// Parses the information in the body of petitions
const bodyParser = require('body-parser');
// Cross-Origin Resource Sharing needed for express to get headers
const cors = require('cors');
// Strategy for authenticating with a JSON Web Token.
const passport = require('passport');
// MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');
// Configuration of the database
const config = require('./config/database');

const user = require('./models/user')

const twitter = require('./services/twitter');
const facebook = require('./services/facebook');
const fs = require('fs');
const sentiment = require('./services/sentiment');
const spotify = require('./services/spotify_json');
const ClientOAuth2 = require('client-oauth2');

const request = require('request');

const PORT = process.env.PORT || 5000

// Connect to the database
mongoose.connect(config.database, {
  useNewUrlParser: true
});

// Connect to the database and log out if it was successful
mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});

// Logout if the connect was failed
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

// Start our server app to make the petitions
const app = express();

// Get all the routes for make the petitions in the backend
const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 5000;

// CORS Middleware its for make the routes to create the petitions
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware to grab the data that we send or recive
app.use(bodyParser.json());

// Use users as the domain to make the petitions
app.use('/users', users);

// Index Route / show as invalid end point
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Twitter
app.get('/twitter', (req, res) => {
  twitter.getTweets((tweets) => {
    res.send(tweets);
  });
});

// Twitter
app.get('/getTweetsInSentimentFormat', (req, res) => {
  twitter.getTweetsInSentimentFormat((tweets) => {
    res.send(tweets);
  });
});

// Twitter
app.get('/getTweetsSentiment', (req, res) => {
  twitter.getTweetsInSentimentFormat((tweets) => {

    sentiment.getSentiments(tweets, (sentimentResponse) => {
      sentimentResponseParsed = JSON.parse(sentimentResponse)
      sentimentResponseParsed.documents.forEach(element => {
        sentimentResponseParsed.documents[element.id - 1].timestamp = tweets.documents[element.id - 1].timestamp
        console.log(tweets.documents[element.id - 1].created_at)
        console.log(element)
        console.log(tweets.documents[element.id - 1])
      });
      res.send(JSON.stringify(sentimentResponseParsed));

    });
  });
});

// Twitter
app.get('/getTweetsSentiment', (req, res) => {
  twitter.getTweetsInSentimentFormat((tweets) => {

    sentiment.getSentiments(tweets, (sentimentResponse) => {
      sentimentResponseParsed = JSON.parse(sentimentResponse)
      sentimentResponseParsed.documents.forEach(element => {
        sentimentResponseParsed.documents[element.id - 1].timestamp = tweets.documents[element.id - 1].timestamp
        console.log(tweets.documents[element.id - 1].created_at)
        console.log(element)
        console.log(tweets.documents[element.id - 1])
      });
      res.send(JSON.stringify(sentimentResponseParsed));

    });
  });
});


// Twitter
app.get('/processTwitterData', (req, res) => {
  twitter.getTweetsInSentimentFormat((tweets) => {

    sentiment.getSentiments(tweets, (sentimentResponse) => {
      sentimentResponseParsed = JSON.parse(sentimentResponse)
      sentimentResponseParsed.documents.forEach(element => {
        sentimentResponseParsed.documents[element.id - 1].timestamp = tweets.documents[element.id - 1].timestamp
        console.log(tweets.documents[element.id - 1].created_at)
        console.log(element)
        console.log(tweets.documents[element.id - 1])
      });
      res.send(JSON.stringify(sentimentResponseParsed));
      sentimentResponseParsed.documents.forEach(element => {
        console.log(element)
        user.addFeed("giorgosb", element.timestamp, "twitter", element.score, () => {})
      });
    });
  });
});


// Spotify
app.get('/processSpotifyData', (req, res) => {
  spotify.getSongsInSentimentFormat((tweets) => {
    sentiment.getSentiments(tweets, (sentimentResponse) => {
      sentimentResponseParsed = JSON.parse(sentimentResponse)
      res.send(JSON.stringify(sentimentResponseParsed));
      sentimentResponseParsed.documents.forEach(element => {
        let currentTimeStamp = 0;
        user.addFeed("giorgosb", currentTimeStamp++, "spotify", element.score, () => {});
      });
    });
  });
});

app.get('/processFacebookData', (req, res) => {
  facebook.getPosts((tweets) => {
    sentiment.getSentiments(tweets, (sentimentResponse) => {
      sentimentResponseParsed = JSON.parse(sentimentResponse)
      res.send(JSON.stringify(sentimentResponseParsed));
      sentimentResponseParsed.documents.forEach(element => {
        let currentTimeStamp = 0;
        user.addFeed("giorgosb", currentTimeStamp++, "facebook", element.score, () => {});
      });
    });
  });
});

// Facebook
app.get('/facebook', (req, res) => {
  facebook.getPosts((posts) => {
    res.send(posts);
  });
});

// Sentiment
app.get('/sentiment', (req, res) => {
  sentiment.getSentiments(sentiment.docs, (sentimentResponse) => {
    res.send(sentimentResponse);
  });
});

// const spotifyAuth = new ClientOAuth2({
//   clientId: '5738d274c70e43b182f6e1d7058a8557',
//   clientSecret: '44a3674916b9452eae9323f74097f3a7',
//   accessTokenUri: 'https://accounts.spotify.com/api/token',
//   authorizationUri: 'https://accounts.spotify.com/authorize',
//   redirectUri: 'https://mood-insights.herokuapp.com/spotifyCallback',
//   scopes: ['user-read-recently-played']
// });

app.get('/spotify', function(req, res) {
  const data = fs.readFileSync('./services/spotify/songs.json');
  const songs = JSON.parse(data);
  res.send(songs);
});

// app.get('/spotify', function(req, res) {
//   const uri = spotifyAuth.code.getUri();
//   res.redirect(uri);
// });

// app.get('/spotifyCallback', function (request, response) {
//   spotifyAuth.code.getToken(request.originalUrl)
//     .then(function(user) {

//       let userToken = user.accessToken;

//       // Refresh the current users access token.
//       user.refresh().then(function(updatedUser) {
//         userToken = updatedUser.accessToken;
//         console.log(updatedUser !== user); //=> true
//       })

//       // Sign API requests on behalf of the current user.
//       user.sign({
//         method: 'get',
//         url: 'https://mood-insights.herokuapp.com'
//       });

//       // We should store the token into a database.
//       console.log("request!")
//       console.log(userToken);
//       request.get('https://api.spotify.com/v1/me/player/recently-played', { 'auth': { 'bearer': userToken } }, (err, req, res) => {
//         console.log("Success!")
//         response.send(res);
//       });
//     })
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server on the port setted
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
