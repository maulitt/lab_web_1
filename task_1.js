function FirstOne(string){
    //найти первый не повторяющийся символ в строке
    let array_for_each_symbol = [];
    for (let i = 0; i < string.length; i++)
    {
        array_for_each_symbol.push(0);
    }
    for (let j = 0; j < string.length; j++)
    {
        for (let i = 0; i < string.length; i++)
        {
            if (string[j] === string[i])
            {
                array_for_each_symbol[j]++;
            }
        }
    }
    let i = 0;
    let result;
    while(i < string.length)
    {
        if (array_for_each_symbol[i] === 1)
        {
            console.log(string[i]);
            result = string[i];
            break;
        }
        i++;

    }
    return result;
}



