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

function sortByCartTime(a, b) {
  return a.cart_date.getTime() > b.cart_date.getTime() ? -1 : a.cart_date.getTime() < b.cart_date.getTime() ? 1 : 0;
}

function sortByJjimTime(a, b) {
  var x = new Date(a.jjim_date);
  var y = new Date(b.jjim_date);

  return x.getTime() > y.getTime() ? -1 : x.getTime() < y.getTime() ? 1 : 0;
}

function dateFormat(n, digits) {
  let zero = '';
  n = n.toString();
  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++) zero += '0';
  }
  return zero + n;
}

function createDate() {
  const date = new Date();
  const createdDate = dateFormat(date.getFullYear(), 4) + '-' + dateFormat(date.getMonth() + 1, 2) + '-' + dateFormat(date.getDate(), 2);
  return createdDate;
}

function createJjimData(goodsData, id) {
  var data = {
    id: id,
    title: goodsData.title,
    percent: goodsData.percent,
    amount: goodsData.amount,
    dueDate: goodsData.dueDate,
    jjim_date: createDate(),
  };
  return data;
}
module.exports = {
  sortByPercent,
  sortByAmount,
  sortByClosing,
  sortByJjim,
  createJjimData,
  sortByJjimTime,
};
