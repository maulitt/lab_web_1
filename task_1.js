function FirstOne(stroka){
    //найти первый не повторяющийся символ в строке
    let array_for_each_symbol = [];
    for (let i = 0; i < stroka.length; i++)
    {
        array_for_each_symbol.push(0);
    }
    for (let j = 0; j < stroka.length; j++)
    {
        for (let i = 0; i < stroka.length; i++)
        {
            if (stroka[j] === stroka[i])
            {
                array_for_each_symbol[j]++;
            }
        }
    }
    let i = 0;
    let result;
    while(i < stroka.length)
    {
        if (array_for_each_symbol[i] === 1)
        {
            console.log(stroka[i]);
            result = stroka[i];
            break;
        }
        i++;

    }
    return result;
}

const express = require('express');

const app = express();

app.get('/api/Bayazitova/task1', function(req, res) {
    let ask = req.query.q;
    let answer = FirstOne(ask);
    res.send(answer);
});

app.listen(1000);

