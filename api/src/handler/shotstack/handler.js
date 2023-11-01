'use strict';

const response = require('../../shared/response');
const shotstack = require('./lib/shotstack');
const convert = require('./lib/convert');

module.exports.submit = async (event) => {
    try {
        const data = JSON.parse(event.body);
        const json = convert.prepareRequestJson(data);
        const transformation = await shotstack.submit(json);

        return response.format(201, 'success', 'OK', transformation.data);
    } catch (error) {
        console.error(error);
        return response.format(400, 'fail', 'Bad Request', error.message || error);
    }
};

module.exports.status = async (event) => {
    try {
        const status = await shotstack.status(event.pathParameters.id);

        return response.format(201, 'success', 'OK', status);
    } catch (error) {
        console.error('Fail: ', error);
        return response.format(400, 'fail', 'Bad Request', error);
    }
};
