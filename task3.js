const fs = require('fs');
const { Transform } = require('stream')

//sumNumbersInString попросил написать нейронку
function sumNumbersInString(str) {
  const numbers = str.match(/-?\d+(\.\d+)?/g); // Ищем числа (включая отрицательные и дробные)
  if (!numbers) {
    return 0; // Возвращаем 0, если чисел нет
  }
  let sum = 0;
  for (const number of numbers) {
    sum += parseFloat(number); // Преобразуем в число и добавляем к сумме
  }
  return sum;
}

class TransformStream extends Transform {
    _transform(chunk, encoding, callback){
        const sum = sumNumbersInString(chunk.toString())
        this.push(sum.toString())
        callback()
    }
}

const readStream = fs.createReadStream('random_data_with_letters.txt')
const sumNumbers = new TransformStream()
const outStream = fs.createWriteStream('out.txt')

readStream.pipe(sumNumbers).pipe(outStream)

readStream.on('end', () => {
    console.log('good')
})