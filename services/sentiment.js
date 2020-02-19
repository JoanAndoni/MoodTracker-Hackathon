'use strict';

let https = require('https');
const feeds = require('../config/feeds');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the accessKey string value with your valid access key.
let accessKey = feeds.azure.accessKey;

// Replace or verify the region.

// You must use the same region in your REST API call as you used to obtain your access keys.
// For example, if you obtained your access keys from the westus region, replace
// "westcentralus" in the URI below with "westus".

// NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
// a free trial access key, you should not need to change this region.
let uri = 'westcentralus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.1/sentiment';

let cb_response_handler = function (callback) {
    let response_handler = function (response) {
        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            let body_ = JSON.parse(body);
            let body__ = JSON.stringify(body_, null, '  ');
            callback(body__);
        });
        response.on('error', function (e) {
            callback('Error: ' + e.message);
        });
    }
    return response_handler
}

let get_sentiments = function (documents, callback) {
    let body = JSON.stringify(documents);

    let request_params = {
        method: 'POST',
        hostname: uri,
        path: path,
        headers: {
            'Ocp-Apim-Subscription-Key': "617e0cc9d985440f81c2077a07ff7b76",
        }
    };

    let req = https.request(request_params, cb_response_handler(callback));
    req.write(body);
    req.end();
}

let documents = {
    'documents': [
        { 'id': '1', 'language': 'en', 'text': 'I really enjoy the new XBox One S. It has a clean look, it has 4K/HDR resolution and it is affordable.' },
        { 'id': '2', 'language': 'es', 'text': 'Este ha sido un dia terrible, llegué tarde al trabajo debido a un accidente automobilistico.' },
    ]
};

module.exports = {
    getSentiments: get_sentiments,
    docs: documents
};
