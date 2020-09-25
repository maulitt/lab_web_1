
const express = require('express');
//const hbs = require('hbs');
const app = express();
const hbs = require('hbs');
const func1 = require('./task_1.js');
const func2 = require('./task_2.js');
const func3 = require('./task_3.js');
const fs = require('fs');


app.set('view engine', 'hbs');
app.set('views', 'views');

app.use('/', function (req, res) {
    res.render('mainpage.hbs', {
        title: 'Главная страница приложения',
        name: 'Регины'
    })
})


app.get('/api/Bayazitova/task1', check_Auth,function(req, res) {
    let ask = req.query.q;
    res.send(func1.FirstOne(ask));
});

app.get('/api/Bayazitova/task2', requests,function(req, res) {
    let ask = req.query.q;
    res.send(func2.SecondOne(ask));
});

app.get('/api/Bayazitova/task3', requests, function(req, res) {
    let ask = req.query.q;
    res.send(func3.ThirdOne(ask));
});

app.use(function(req, res, next) {       // ошибка 404 обрабатывается по-особенному 0_о
    const err = new Error('Not Found');
    err.statusCode = 404;
    res.send('What?');
    next(err);
});

app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;  //  если нет какого-то кода, то это 500
    res.status(err.statusCode).send(err.message);
    next(err);
})

app.use(function (err, req, res, next) {
    let now = Date();
    fs.appendFile('logging.txt', 'Error '+ now, function(err) {
        if (err)
        {
            console.log('failed to save in log');
            throw err;
        }
        console.log('(saved to log)');
    });
})


function check_Auth (req, res, next) {         // обработка 403 как у Спартака с логированием в консоль
    if (req.query.admin === 'true')
    {
        console.log('Request: '+req.query.q);
        next();
    }
    else
    {
        let err = new Error('No chance');
        err.statusCode = 403;
        res.send('Not enough rights.');
        //err.statusCode = 403;
        next(err);
    }
}

function requests(req, res, next) {      // мидлваре для логирования в консоль запросов
    console.log('Your Request: '+req.query.q);
    next();
}

//function log_to_file(req, res, next) {
//    let now = Date();
//    fs.writeFileSync('logging.txt', 'Error '+ now);
//    next();
//}


app.listen(3000, '127.0.0.1');