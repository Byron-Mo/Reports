var React = require('react'),
    ReactDOM = require('react-dom'),
    transactions = require('../app/assets/javascripts/transactions'),
    TransactionStore = require('./stores/TransactionStore'),
    ApiUtil = require('./util/apiutil'),
    Month = require('./components/month'),
    Cost = require('./components/cost');

var Reports = React.createClass({
  getInitialState: function() {
    return {
      transactions: null,
      currentMonths: this.getCurrentMonths(),
      optionDate: this.getCurrentYear(),
      selection: "vendor"
    }
  },

  getCurrentYear: function() {
    var date = new Date();
    return date.getFullYear();
  },

  getCurrentMonths: function() {
    var currentDate = new Date(),
        currentMonthIndex = currentDate.getMonth(),
        currentYear = currentDate.getFullYear(),
        threeMonths = this.getPreviousTwoMonths(currentYear, currentMonthIndex);

    threeMonths.push(currentYear + ", " + currentMonthIndex)
    return threeMonths;
  },

  getPreviousTwoMonths: function(currentYear, currentMonthIndex) {
    var index = currentMonthIndex - 1,
        twoMonths = [];

    for (var i = 0; i < 2; i++) {
      if (index < 0) {
        index = months.length - 1
      }
      twoMonths.unshift(currentYear + ", " + index)
      index--;
    }
    return twoMonths;
  },

  updateState: function() {
    var parameters = {
      optionDate: this.state.optionDate,
      months: this.state.currentMonths,
      selection: this.state.selection
    }
    this.setState({transactions: TransactionStore.getCurrentTransactions(parameters)})
  },

  componentWillMount: function() {
    this.listener = TransactionStore.addListener(this.updateState)
    ApiUtil.fetchTransactions();
  },

  render: function() {
    // console.log(this.state.transactions)
    return (
      <table>
        <Month transactions={this.state.transactions} />
        <Cost transactions={this.state.transactions} />
      </table>
    )
  }
})

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Reports />, document.getElementById("content"))
})
