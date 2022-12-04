function random(num) {
  let numbers = []
  let numbersCount = []
  let randomNumber = 0
  let randomNumberCount = 0

          for (let i = 0; i < num ; i++) {
              randomNumber = Math.floor(Math.random() * 1000)
              randomNumberCount = 0
              for (let j = 0; j < numbers.length; j++) {
                  if (randomNumber == numbers[j]) {
                      randomNumberCount++
                  }
              }
              if (randomNumberCount == 0) {
                  numbers.push(randomNumber)
                  numbersCount.push({ number: randomNumber, count: 1 })
              } else {
                  numbersCount[randomNumberCount].count++
              }
          }
          return JSON.stringify(numbersCount)

}

process.on ('message', (data) => {
  console.log('Mensaje recibido', data)
  const n = data
  const result = random(n)
  console.log('Mensaje enviado', result)
  process.send(result)
})




export default random