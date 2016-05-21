var TransactionActions = require('../actions/TransactionActions'),
    $ = require('jquery'),
    transactions = require('../../app/assets/javascripts/transactions');

ApiUtil = {
  fetchTransactions: function() {
    // $.ajax({
    //   url: "./transactions",
    //   type: "GET",
    //   success: function(transactions) {
    //     TransactionActions.receiveAllTransactions(transactions)
    //   }
    // })
    TransactionActions.receiveAllTransactions(transactions)
  }
}

module.exports = ApiUtil;
