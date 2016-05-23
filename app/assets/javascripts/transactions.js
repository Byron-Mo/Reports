var categories = ["Taxes", "Restaurants", "Business", "Transportation", "Accommodations"],
    vendors = ["Walmart", "Target", "Best Buy", "Home Depot", "Macy's", "Radio Shack"],
    years = [2016, 2015],
    days = [],
    months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
    transactions = [];

for (var i = 1; i <= 31; i++) {
  days.push(i)
}

var randomItem = function(arr) {
  var randNum = Math.floor(Math.random() * arr.length);
  return arr[randNum];
}

var selectCost = function() {
  var num = parseFloat((Math.random() * 100).toFixed(2));
  num *= Math.floor(Math.random() * 2) === 0 ? 1 : -1
  return num
}

var randomDate = function() {
  var iso;
  while (iso === undefined || isNaN(iso)) {
    iso = Date.parse(randomItem(months) + " " + randomItem(days) + " " + randomItem(years))
  }
  return iso
}

for (var i = 1; i <= 700; i++) {
  var transaction = {
    id: i,
    date: randomDate(),
    cost: selectCost(),
    category: randomItem(categories),
    vendor: randomItem(vendors)
  };

  transactions.push(transaction)
}

module.exports = transactions;
