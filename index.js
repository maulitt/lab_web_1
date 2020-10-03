
const express = require('express');
const app = express();
const hbs = require('hbs');
const mongoose = require('mongoose');
const user = require('./models/user_model');
const func1 = require('./task_1.js');
const func2 = require('./task_2.js');
const func3 = require('./task_3.js');
const auth_routes = require('./routes_auth');
const passport = require('./config/passport');
const fs = require('fs');


//connect to mongodb as Denis said
let dbname = 'mydatabase';
const uri = "mongodb+srv://maulit:edozub13@cluster0.shosj.mongodb.net/mydatabase?retryWrites=true&w=majority";

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Mongo is connected!!!!')
    })
    .catch((err) => console.log(err.message + 'Not connected for some reasons('))

mongoose.connection.on('error', err => {
    console.log('Error while running: ' + err.message);
})

//to use templates
app.set('view engine', 'hbs');
app.set('views', 'views');
hbs.registerPartials(__dirname+'/views/partials')

//всякие обработчики маршрутов
app.get('/', function (req, res) {
    res.render('mainpage.hbs', {
        title: 'Главная страница приложения',
        name: 'Регины'
    })
})

app.get('/api/Bayazitova/first', function (req, res) {
    res.render('enter.hbs', {
        number: '1',
        pathname: 'task1'
    })
})

app.get('/api/Bayazitova/second', function (req, res) {
    res.render('enter.hbs', {
        number: '2',
        pathname: 'task2'
    })
})

app.get('/api/Bayazitova/third', function (req, res) {
    res.render('enter.hbs', {
        number: '3',
        pathname: 'task3'
    })
})

app.get('/api/Bayazitova/task1', check_Auth, requests, function(req, res) {
    let ask = req.query.string;
    //res.send(func1.FirstOne(ask));
    res.render('output.hbs', {
        request: ask,
        result: func1.FirstOne(ask)
    })
});

app.get('/api/Bayazitova/task2', requests,function(req, res) {
    let ask = req.query.string;
    res.render('output.hbs', {
        request: ask,
        result: func2.SecondOne(ask)
    })
});

app.get('/api/Bayazitova/task3', requests, function(req, res) {
    let ask = req.query.string;
    res.render('output.hbs', {
        request: ask,
        result: func3.ThirdOne(ask)
    })
});

//мидлвари для ошибок
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
    if (req.query.user === 'admin')
    {
        console.log('Request: '+req.query.string);
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
    console.log('Your Request: '+req.query.string);
    next();
}




app.listen(3000, '127.0.0.1');