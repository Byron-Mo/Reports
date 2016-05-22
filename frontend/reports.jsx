var React = require('react'),
    ReactDOM = require('react-dom'),
    transactions = require('../app/assets/javascripts/transactions'),
    TransactionStore = require('./stores/TransactionStore'),
    ApiUtil = require('./util/apiutil'),
    Month = require('./components/month'),
    Cost = require('./components/cost'),
    Selection = require('./components/selection'),
    SelectionList = require('./components/selectionlist'),
    months = require('./constants/Months'),
    DropDown = require('./components/dropdown');

var Reports = React.createClass({
  getInitialState: function() {
    return {
      transactions: null,
      monthIndex: this.getMonthIndex(),
      currentYear: this.getCurrentYear(),
      optionDate: this.getCurrentYear(),
      selection: "vendor",
      dropdownActive: false
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

  updateState: function() {
    var parameters = {
      optionDate: this.state.optionDate,
      monthIndex: this.state.monthIndex,
      currentYear: this.state.currentYear,
      amount: 3,
      selection: this.state.selection
    }
    this.setState({transactions: TransactionStore.getCurrentTransactions(parameters), years: TransactionStore.getYears()})
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

  handleMonthCycle: function(monthVal) {
    var index = this.state.monthIndex + monthVal,
        year = this.state.currentYear;

    if (index < 0) {
      index = 11;
      year--;
    } else if (index > 11 ) {
      index = 0;
      year++;
    }

    this.setState({monthIndex: index, currentYear: year}, function() {
      this.updateState();
    })
  },

  handleDropdown: function(activeBoolean) {
    this.setState({dropdownActive: activeBoolean})
  },

  handleOptionChange: function(date) {
    this.setState({optionDate: date}, function() {
      this.updateState();
    })
  },


  render: function() {
    return (
      <div>
        <table>
          <Month
            transactions={this.state.transactions}
            handleMonthCycle={this.handleMonthCycle}
            monthIndex={this.state.monthIndex}
            handleDropdown={this.handleDropdown}
            dropdownActive={this.state.dropdownActive}
          />
          <Cost transactions={this.state.transactions} />
          <Selection handleSwitchSelection={this.handleSwitchSelection} selection={this.state.selection}/>
          <SelectionList transactions={this.state.transactions} />
        </table>
        <DropDown
          dropdownActive={this.state.dropdownActive}
          years={this.state.years}
          handleOptionChange={this.handleOptionChange}
          handleDropdown={this.handleDropdown}
        />
      </div>
    )
  }
})

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Reports />, document.getElementById("content"))
})

// getCurrentMonths: function() {
//   console.log(this.state.currentYear)
//   var threeMonths = this.getPreviousTwoMonths(this.state.currentYear, this.state.monthIndex);
//
//   threeMonths.push(this.state.currentYear + ", " + this.state.monthIndex)
//   return threeMonths;
// },
//
// getPreviousTwoMonths: function(currentYear, currentMonthIndex) {
//   var index = currentMonthIndex - 1,
//       twoMonths = [];
//
//   for (var i = 0; i < 2; i++) {
//     if (index < 0) {
//       index = months.length - 1
//     }
//     twoMonths.unshift(currentYear + ", " + index)
//     index--;
//   }
//   return twoMonths;
// },
