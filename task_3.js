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
    return 0;
}

ThirdOne('Wie heist du?');