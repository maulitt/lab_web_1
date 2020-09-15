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
            if (stroka[j] == stroka[i])
            {
                array_for_each_symbol[j]++;
            }
        }
    }
    let i = 0;
    while(i < stroka.length)
    {
        if (array_for_each_symbol[i] == 1)
        {
            return stroka[i];
            break;
        }
        i++;
    }
    return 0;
}

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
    let result = '';
    let mark = false;
    let another_mark = false;
    for(let i = 0; i < stroka.length; i++)
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
    return result;
}