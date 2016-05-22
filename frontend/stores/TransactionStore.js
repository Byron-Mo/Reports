var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    TransactionConstants = require('../constants/TransactionConstants'),
    _transactions = [],
    _sortedTransactionIds = [],
    TransactionStore = new Store(Dispatcher);

TransactionStore.getCurrentTransactions = function(parameters) {
  _sortedTransactionIds = [];
  // get all transaction ids with the optionDate
  // get all transaction ids within three months
  // get all transaction ids
  var results = getSelections(parameters, _transactions);
  var selections = results.selection;

  for (var property in results) {
    if (results.hasOwnProperty(property)) {
      if (property !== "selection") {
        var column = {};
        column[property] = getColumn(results[property], selections);
        _sortedTransactionIds.push(column)
      }
    }
  }
  return _sortedTransactionIds;
};

TransactionStore.resetTransactions = function(transactions) {
  _transactions = transactions;
  TransactionStore.__emitChange();
};

TransactionStore.__onDispatch = function(payload) {
  TransactionStore.resetTransactions(payload.transactions)
};

var getSelections = function(parameters, _transactions) {
  var results = {};
  results[parameters.optionDate] = [];
  for (var i = 0; i < 3; i++) {
    results[parameters.months[i]] = [];
  }
  results.selection = {};

  for (var j = 0; j < _transactions.length; j++) {
    var date = new Date(_transactions[j].date),
        year = date.getFullYear(),
        monthIndex = date.getMonth(),
        category = _transactions[j].category,
        vendor = _transactions[j].vendor,
        id = _transactions[j].id;

    var dateString = year + ", " + monthIndex;
    if (dateString === parameters.optionDate || year === parameters.optionDate) {
      results[parameters.optionDate].push(id)
    }

    if (results[dateString]) {
      results[dateString].push(id)
    }

    if (parameters.selection === "vendor") {
      if (results.selection[vendor]) {
        results.selection[vendor].push(id)
      } else {
        results.selection[vendor] = [id]
      }
    } else if (parameters.selection === "category") {
      if (results.selection[category]) {
        results.selection[category].push(id)
      } else {
        results.selection[category] = [id]
      }
    }
  }

  return results
};

var getIntersections = function(optionDates, selectionArr) {
  var ids = new Set();
  var set = new Set();
  for (var i = 0; i < optionDates.length; i++) {
    set.add(optionDates[i])
  }

  for (var j = 0; j < selectionArr.length; j++) {
    if (set.has(selectionArr[j])) {
      ids.add(selectionArr[j])
    }
  }
  return ids;
};

var getTotalCost = function(selection, ids, _transactions) {
  var totalCost = 0;
  for (var i = 0; i < _transactions.length; i++) {
    if (ids.has(_transactions[i].id) && (_transactions[i].category === selection || _transactions[i].vendor === selection)) {
      totalCost += _transactions[i].cost
    }
  }
  return totalCost.toFixed(2);
};

var getTotalExpense = function(ids, _transactions) {
  var income = 0,
      expense = 0;

  for (var i = 0; i < _transactions.length; i++) {
    for (var j = 0; j < ids.length; j++) {
      if (ids[j] === _transactions[i].id) {
        var cost = _transactions[i].cost
        if (cost < 0) {
          expense += (-1 * cost)
        } else {
          income += cost
        }
      }
    }
  }
  return [income.toFixed(2), expense.toFixed(2)];
}

var getColumn = function(optionDates, selections) {
  var column = {
    income: 0,
    expense: 0,
    total: 0
  }

  var amount = getTotalExpense(optionDates, _transactions);
  column.income = amount[0]
  column.expense = amount[1]
  column.total = (column.income - column.expense).toFixed(2);

  // selections is a hash that contains property as category with value as array of ids
  for (var property in selections) {
    if (selections.hasOwnProperty(property)) {
      var selectionArr = selections[property];
      var ids = getIntersections(optionDates, selectionArr);
      var totalCost = getTotalCost(property, ids, _transactions);
      column[property] = totalCost
    }
  }
  return column;
}

module.exports = TransactionStore
