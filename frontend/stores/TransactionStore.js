var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher'),
    TransactionConstants = require('../constants/TransactionConstants'),
    _transactions = [],
    TransactionStore = new Store(Dispatcher);

TransactionStore.getCurrentTransactions = function(parameters) {

};

TransactionStore.all = function() {
  var dupTransactions = _transactions.slice();
  return dupTransactions;
}

TransactionStore.resetTransactions = function(transactions) {
  _transactions = transactions;
  TransactionStore.__emitChange();
};

TransactionStore.__onDispatch = function(payload) {
  TransactionStore.resetTransactions(payload.transactions)
};

module.exports = TransactionStore
