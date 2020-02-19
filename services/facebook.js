const graph = require('fbgraph');
const feeds = require('../config/feeds');

graph.setAccessToken(feeds.facebook.accessToken);

const getPosts = function (callback) {
  const options = {
    timeout: 3000
    , pool: { maxSockets: Infinity }
    , headers: { connection: "keep-alive" }
  };

  graph
    .setOptions(options)
    .get("me?fields=id,name,posts", function (err, res) {
      const posts = res.posts.data;
      let idCount = 0;
      const test = posts.map((post) => { return { id: idCount++, language: "el", text: post.message, timestamp: post.created_time } });
      dummy = {}
      dummy.documents = test;
      callback(dummy);
    });
};

module.exports = {
  getPosts: getPosts
}