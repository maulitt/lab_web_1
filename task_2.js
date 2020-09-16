function SecondOne(stroka)
{
    // превратить в верблюжий регистр строку
    let array_of_numbers = [];
    let array_of_separators = [' ', ',', '.']
    for(let i = 0; i < stroka.length; i++)
    {
        let mark = false;
        for(let j = 0; j < 3; j++)
        {
            if(stroka[i] === array_of_separators[j])
            {
                mark = true;
            }
        }
        if(mark === true)
        {
            array_of_numbers.push(i);
        }
    }
    let result = stroka[0].toUpperCase();
    let mark = false;
    let another_mark = false;
    for(let i = 1; i < stroka.length; i++)
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
            result += stroka[i];
        }
        else if(!mark && another_mark)
        {
            result += stroka[i].toUpperCase();
            another_mark = false;
        }
        else if(mark)
        {
            another_mark = true;
        }
    }
    console.log(result);
}

SecondOne('hi my name is maulitt');