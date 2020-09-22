const express = require('express');

const app = express();
const func1 = require('./task_1.js');
const func2 = require('./task_2.js');
const func3 = require('./task_3.js');


app.get('/api/Bayazitova/task1', middleware_,function(req, res) {
    let ask = req.query.q;
    res.send(func1.FirstOne(ask));
});

app.get('/api/Bayazitova/task2', requests,function(req, res) {
    let ask = req.query.q;
    res.send(func2.SecondOne(ask));
});

app.get('/api/Bayazitova/task3', requests,function(req, res) {
    let ask = req.query.q;
    res.send(func3.ThirdOne(ask));
});

function middleware_(req, res, next) {
    if (req.query.admin === 'true')
    {
        console.log('Request: '+req.query.q);
        next();
    }
    else
    {
        res.status(404).send('Not enough rights.')
    }
}
function requests(req, res, next){
    console.log('Your Request: '+req.query.q);
    next();
}



app.listen(1000);