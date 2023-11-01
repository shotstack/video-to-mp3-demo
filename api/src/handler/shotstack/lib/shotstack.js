'use strict';

const axios = require('axios').default;
const shotstackUrl = process.env.SHOTSTACK_HOST;
const shotstackApiKey = process.env.SHOTSTACK_API_KEY;

const submit = (json) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: shotstackUrl + 'sources',
            headers: {
                'x-api-key': shotstackApiKey,
                'content-type': 'application/json'
            },
            data: json
        })
        .then((response) => {
            return resolve(response.data)
        }, (error) => {
            return reject(error)
        });
    })
}

const status = (id) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: shotstackUrl + 'sources/' + id,
            headers: {
                'x-api-key': shotstackApiKey
            }
        })
        .then((response) => {
            return resolve(response.data.data.attributes);
        }), (error) => {
            return reject(error);
        }
    })
}

module.exports = {
    submit,
    status
}
