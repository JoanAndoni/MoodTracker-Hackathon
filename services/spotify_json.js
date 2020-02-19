music = require('musicmatch')({
  apikey: "361f2d7c1155af59081c33c5104e5aef"
});

const getSongsInSentimentFormat = function (callback) {
  const spotifyJSON = require('./spotify/songs.json');
  const songs = []

  spotifyJSON.items.forEach((tracks, index) => {
    var song = {
      title: "",
      author: "",
      lyrics: ""
    };
    // console.log(index);
    // console.log("TRACK NAME: " + tracks.track.name);
    song.title = tracks.track.name;
    tracks.track.artists.forEach((artist, index) => {
      // console.log("ARTIST: " + artist.name);
      song.author = artist.name;
    });
    music.matcherLyrics({
      q_track: song.title,
      q_artist: song.author
    })
    .then(function (data) {
        if (data.message.body.lyrics.lyrics_body) {
          const lyrics = data.message.body.lyrics.lyrics_body.replace("******* This Lyrics is NOT for Commercial use *******", "")
          song.lyrics = lyrics;
          song.lyrics = song.lyrics.replace(/\n/g, ".")
          songs.push(song);
          if (songs.length === 18) {
            let idCount = 0;
            const test = songs.map((song) => { return {id: idCount++, language: "en", text: song.lyrics, timestamp: 1}});
            dummy = {}
            dummy.documents = test;
            callback(dummy);
          }
        }
      }).catch(function (err) {
        console.log(err);
      })
  });
};

module.exports = {
  getSongsInSentimentFormat: getSongsInSentimentFormat
}