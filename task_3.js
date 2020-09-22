function ThirdOne(string)
{
    //отсортировать символы в строке
    let array_of_symbols = [];
    array_of_symbols = string.split('');
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

exports.ThirdOne = ThirdOne;



