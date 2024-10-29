function getFactorsSum(n) {
  let sum = 0
  for (let i = 1; i < n; i++) {
    if (n % i === 0) {
      sum += i
    }
  }
  return sum
}

function checkNumberType(n) {
  const factorSum = getFactorsSum(n)
  if (factorSum === n) {
    return "perfect"
  } else if (Math.abs(factorSum - n) === 1) {
    return "hampir"
  } else {
    return "bukan"
  }
}

// Input jumlah angka yang akan dicek
const Q = parseInt(prompt("Masukkan jumlah angka yang akan dicek:"))
const numbers = []

// Input angka-angka untuk dicek
for (let i = 0; i < Q; i++) {
  const num = parseInt(prompt(`Masukkan angka ke-${i + 1}:`))
  numbers.push(num)
}

// Proses setiap angka dan cetak hasilnya
const results = numbers.map(checkNumberType)
results.forEach((result) => console.log(result))
