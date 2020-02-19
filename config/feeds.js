module.exports = {
    facebook: {
        accessToken: process.env.facebookAccessToken
    },
    twitter: {
        consumerKey: process.env.twitterConsumerKey,
        consumerSecret: process.env.twitterConsumerSecret,
        bearerToken: process.env.twitterBearerToken,
        userName: process.env.twitterUserName
    },
    spotify: process.env.keySpotify,
    azure: {
        accessKey: process.env.azureAccessKey
    }
}