const exactChange = (price, cash, cid) => {
  const denominations = { 'PENNY': 1, 'NICKEL': 5, 'DIME': 10, 'QUARTER': 25, 'ONE': 100, 'FIVE': 500, 'TEN': 1000, 'TWENTY': 2000, 'ONE HUNDRED': 10000 }
  let changeDue = (cash * 100 - price * 100)
  const register = cid
    .reverse()
    .map(el => [el[0], Math.round(el[1] * 100)])

  const registerTotal = register
    .reduce((sum, elem) => (sum + elem[1]), 0)

  if (changeDue > registerTotal) return 'Insufficient Funds'
  if (changeDue === registerTotal) return 'Closed'

  let partial
  let change = register
    .reduce((acc, elem) => {
      partial = Math.min(elem[1], Math.floor(changeDue / denominations[elem[0]]) * denominations[elem[0]])
      if (partial > 0) {
        changeDue -= partial
        acc.push([elem[0], partial / 100])
      } return acc
    }, [])

  if (changeDue > 0) return 'Insufficient Funds'

  return change
}

module.exports = exactChange
