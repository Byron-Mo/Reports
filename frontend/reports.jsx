var React = require('react'),
    ReactDOM = require('react-dom'),
    transactions = require('../app/assets/javascripts/transactions'),
    TransactionStore = require('./stores/TransactionStore'),
    ApiUtil = require('./util/apiutil');

var Reports = React.createClass({
  getInitialState: function() {
    return {transactions: ""}
  },

  updateState: function() {
    this.setState({transactions: TransactionStore.all()})
  },

  componentDidMount: function() {
    this.listener = TransactionStore.addListener(this.updateState)
    ApiUtil.fetchTransactions();
  },

  render: function() {
    return (
      <div>
        Hello
      </div>
    )
  }
})

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Reports />, document.getElementById("content"))
})
