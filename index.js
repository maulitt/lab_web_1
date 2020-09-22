const express = require('express');

const app = express();
const func1 = require('./task_1.js');
const func2 = require('./task_2.js');
const func3 = require('./task_3.js');
//import {FirstOne} from 'task_1.js';

app.get('/api/Bayazitova/task1', function(req, res) {
    let ask = req.query.q;
    res.send(func1.FirstOne(ask));
});

app.get('/api/Bayazitova/task2', function(req, res) {
    let ask = req.query.q;
    res.send(func2.SecondOne(ask));
});

app.get('/api/Bayazitova/task3', function(req, res) {
    let ask = req.query.q;
    res.send(func3.ThirdOne(ask));
});


app.listen(1000);