function SecondOne(string)
{
    // превратить в верблюжий регистр строку
    let array_of_numbers = [];
    let array_of_separators = [' ', ',', '.']
    for(let i = 0; i < string.length; i++)
    {
        let mark = false;
        for(let j = 0; j < 3; j++)
        {
            if(string[i] === array_of_separators[j])
            {
                mark = true;
            }
        }
        if(mark === true)
        {
            array_of_numbers.push(i);
        }
    }
    let result = string[0].toUpperCase();
    let mark = false;
    let another_mark = false;
    for(let i = 1; i < string.length; i++)
    {
        mark = false;
        for(let j = 0; j < array_of_numbers.length; j++)
        {
            if(i === array_of_numbers[j])
            {
                mark = true;
            }
        }
        if(!mark && !another_mark)
        {
            result += string[i];
        }
        else if(!mark && another_mark)
        {
            result += string[i].toUpperCase();
            another_mark = false;
        }
        else if(mark)
        {
            another_mark = true;
        }
    }
    console.log(result);
    return result;
}

//SecondOne('hi my name is maulitt');
//const express = require('express');

//const app = express();

exports.SecondOne = SecondOne;

//app.listen(1000);