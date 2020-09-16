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
    while(i < stroka.length)
    {
        if (array_for_each_symbol[i] === 1)
        {
            console.log(stroka[i]);
            break;
        }
        i++;

    }
    return 0;
}

FirstOne('gigihadid');