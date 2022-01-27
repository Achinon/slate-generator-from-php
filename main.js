const parser = require('./parser');
const BCPayRequest = require('./bcpay');
const fs = require('fs');

const { request } = parser;

BCPayRequest
    .create(request)
    .then(result => {
        if(typeof result === 'object'){
            const erb = parser.setResponse(result).erb;

            fs.writeFile('./parser/_result.erb', erb,  err => {
                if (err) return console.log(err);
            });
        }
        console.log(result);
    })
