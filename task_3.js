function ThirdOne(stroka)
{
    //отсортировать символы в строке
    let array_of_symbols = [];
    for(let i = 0; i < stroka.length; i++)
    {
        if(stroka[i] !== ' ' && stroka[i] !== '.' && stroka[i] !== ',' && stroka[i] !== '?')
        {
            array_of_symbols.push(stroka[i].toLowerCase());
        }
    }
    array_of_symbols.sort();
    let result = '';
    for (let i = 0; i < array_of_symbols.length; i++)
    {
        result += array_of_symbols[i];
    }
    console.log(result);
    return result;
}

//ThirdOne('Wie heist du?');

const express = require('express');

const app = express();

app.get('/api/Bayazitova/task3', function(req, res) {
    let ask = req.query.q;
    let answer = ThirdOne(ask);
    res.send(answer);
});

app.listen(1000);