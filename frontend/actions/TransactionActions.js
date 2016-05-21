var Dispatcher = require('../dispatcher/dispatcher'),
    TransactionConstants = require('../constants/TransactionConstants');

var TransactionActions = {
  receiveAllTransactions: function(transactions) {
    Dispatcher.dispatch({
      actionType: TransactionConstants.RECEIVE_TRANSACTIONS,
      transactions: transactions
    })
  }
};

module.exports = TransactionActions;
