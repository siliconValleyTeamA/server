function sortByPercent(a, b) {
  return a.percent > b.percent ? -1 : a.percent < b.percent ? 1 : 0;
}

function sortByAmount(a, b) {
  return a.amount > b.amount ? -1 : a.amount < b.amount ? 1 : 0;
}

function sortByClosing(a, b) {
  return a.dueDate < b.dueDate ? -1 : a.dueDate > b.dueDate ? 1 : 0;
}

function sortByJjim(a, b) {
  return a.jjim > b.jjim ? -1 : a.jjim < b.jjim ? 1 : 0;
}

module.exports = {
  sortByPercent,
  sortByAmount,
  sortByClosing,
  sortByJjim,
};
