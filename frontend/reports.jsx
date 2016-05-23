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
    DropDown = require('./components/dropdown'),
    $ = require('jquery');

var Reports = React.createClass({
  getInitialState: function() {
    return {
      transactions: null,
      monthIndex: this.getMonthIndex(),
      currentYear: this.getCurrentYear(),
      optionDate: this.getCurrentYear(),
      selection: "vendor",
      dropdownActive: false,
      amount: 3
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
      amount: this.state.amount,
      selection: this.state.selection
    }
    this.setState({transactions: TransactionStore.getCurrentTransactions(parameters), years: TransactionStore.getYears()})
  },

  componentWillMount: function() {
    this.listener = TransactionStore.addListener(this.updateState)
    ApiUtil.fetchTransactions();

    this.mqls = [
      window.matchMedia("(min-width: 1200px)"),
      window.matchMedia("(max-width: 1024px)"),
      window.matchMedia("(max-width: 768px)")
    ]

    for (var i = 0; i < this.mqls.length; i++) {
      this.mediaQueryResponse(this.mqls[i]);
      this.mqls[i].addListener(this.mediaQueryResponse)
    }
  },

  mediaQueryResponse: function(mql) {
    if (this.mqls[0].matches) {
      this.setState({amount: 6}, function() {
        this.updateState();
      })
    }
    if (this.mqls[1].matches) {
      this.setState({amount: 4}, function() {
        this.updateState()
      })
    }
    if (this.mqls[2].matches) {
      this.setState({amount: 3}, function() {
        this.updateState()
      })
    }
  },

  componentWillUnmount: function() {
    this.listener.remove();
    for (var i = 0; i < this.mqls.length; i++) {
      this.mqls.removeListener(this.mediaQueryResponse)
    }
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
      <div className="report">
        <table className="">
          <Month
            transactions={this.state.transactions}
            handleMonthCycle={this.handleMonthCycle}
            monthIndex={this.state.monthIndex}
            handleDropdown={this.handleDropdown}
            dropdownActive={this.state.dropdownActive}
          />
          <Cost transactions={this.state.transactions} />
          <Selection
            handleSwitchSelection={this.handleSwitchSelection}
            selection={this.state.selection}
          />
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
