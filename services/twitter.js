const Twitter = require('twitter');
const feeds = require('../config/feeds');

const client = new Twitter({
    consumer_key: feeds.twitter.consumerKey,
    consumer_secret: feeds.twitter.consumerSecret,
    bearer_token: feeds.twitter.bearerToken
});

const getTweets = function(callback) {
    const params = { screen_name: feeds.twitter.userName };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            callback(tweets);
        }
    });
};

const getTweetsInSentimentFormat = function(callback) {
    console.log(process.env.twitterConsumerKey)
    const params = { screen_name: feeds.twitter.userName };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            //console.log(tweets)
            //tweetsParsed = JSON.parse(tweets)
            idCount=1
            tweetsinSentimentFormat = tweets.map((tweet) => { return {id: idCount++, language: "en", text: tweet.text, timestamp: tweet.created_at}})
            dummy = {}
            dummy.documents = tweetsinSentimentFormat
            callback(dummy)
        }
    });
};

module.exports = {
    getTweets: getTweets,
    getTweetsInSentimentFormat: getTweetsInSentimentFormat
}