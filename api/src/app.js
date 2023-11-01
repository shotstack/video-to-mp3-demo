require('dotenv').config();

const express = require('express');
const path = require('path');
const uniqid = require('uniqid');
const shotstack = require('./handler/shotstack/lib/shotstack');
const convert = require('./handler/shotstack/lib/convert');
const upload = require('./handler/upload/lib/upload');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '../../../web')));

app.post('/demo/shotstack', async (req, res) => {
    try {
        const json = convert.prepareRequestJson(req.body);
        const response = await shotstack.submit(json);

        res.header('Access-Control-Allow-Origin', '*');
        res.status(201);
        res.send({ status: 'success', message: 'OK', data: response.data });
    } catch (error) {
        console.log(error);
        res.header('Access-Control-Allow-Origin', '*');
        res.status(400);
        res.send({ status: 'fail', message: 'bad request', data: error.message || error });
    }
});

app.get('/demo/shotstack/:id', async (req, res) => {
    try {
        const response = await shotstack.status(req.params.id);

        res.header('Access-Control-Allow-Origin', '*');
        res.status(200);
        res.send({ status: 'success', message: 'OK', data: response });
    } catch (error) {
        console.log(error);
        res.header('Access-Control-Allow-Origin', '*');
        res.status(400);
        res.send({ status: 'fail', message: 'bad request', data: error });
    }
});

app.post('/demo/upload/sign', async (req, res) => {
    try {
        const data = req.body;
        const presignedPostData = await upload.createPresignedPost(
            uniqid() + '-' + data.name,
            data.type
        );

        res.header('Access-Control-Allow-Origin', '*');
        res.status(200);
        res.send({ status: 'success', message: 'OK', data: presignedPostData });
    } catch (error) {
        console.log(error);
        res.header('Access-Control-Allow-Origin', '*');
        res.status(400);
        res.send({ status: 'fail', message: 'bad request', data: error.message });
    }
});

app.listen(3000, () =>
    console.log('Server running...\n\nOpen http://localhost:3000 in your browser\n')
);
