var React = require('react'),
    ReactDOM = require('react-dom'),
    transactions = require('../app/assets/javascripts/transactions'),
    TransactionStore = require('./stores/TransactionStore'),
    ApiUtil = require('./util/apiutil'),
    Month = require('./components/month'),
    Cost = require('./components/cost'),
    Selection = require('./components/selection'),
    SelectionList = require('./components/selectionlist');

var Reports = React.createClass({
  getInitialState: function() {
    return {
      transactions: null,
      monthIndex: this.getMonthIndex(),
      currentYear: this.getCurrentYear(),
      optionDate: this.getCurrentYear(),
      selection: "vendor"
    }
  },

  getCurrentYear: function() {
    var date = new Date();
    return date.getFullYear();
  },

  getMonthIndex: function() {
    var date = new Date();
    return date.getMonth();
  },

  getCurrentMonths: function() {
    console.log(this.state.currentYear)
    var threeMonths = this.getPreviousTwoMonths(this.state.currentYear, this.state.monthIndex);

    threeMonths.push(this.state.currentYear + ", " + this.state.monthIndex)
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
      months: this.getCurrentMonths(),
      selection: this.state.selection
    }
    this.setState({transactions: TransactionStore.getCurrentTransactions(parameters)})
  },

  componentWillMount: function() {
    this.listener = TransactionStore.addListener(this.updateState)
    ApiUtil.fetchTransactions();
  },

  handleSwitchSelection: function(selection) {
    this.setState({selection: selection}, function() {
      this.updateState();
    })
  },

  handleMonthCycle: function(num) {
    var index = this.state.monthIndex + num;
    this.setState({monthIndex: index}, function() {
      this.updateState();
    })
  },

  render: function() {
    return (
      <table>
        <Month transactions={this.state.transactions} handleMonthCycle={this.handleMonthCycle} />
        <Cost transactions={this.state.transactions} />
        <Selection handleSwitchSelection={this.handleSwitchSelection} selection={this.state.selection}/>
        <SelectionList transactions={this.state.transactions} />
      </table>
    )
  }
})

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Reports />, document.getElementById("content"))
})
