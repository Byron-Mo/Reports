var React = require('react'),
    months = require('../constants/Months');

var Month = React.createClass({
  handleClick: function(event) {
    event.preventDefault();
    if (event.currentTarget.textContent === "<") {
      this.props.handleMonthCycle(-1)
    } else if (event.currentTarget.textContent === ">") {
      this.props.handleMonthCycle(1)
    }
  },

  handleDropdown: function(event) {
    event.preventDefault();
    this.props.handleDropdown(!this.props.dropdownActive)
  },

  render: function() {
    var mainMonths = [];

    for (var i = 1; i <= this.props.transactions.length; i++) {
      for (var property in this.props.transactions[i]) {
        if (this.props.transactions[i].hasOwnProperty(property)) {
          mainMonths.push(property)
        }
      }
    }

    mainMonths = mainMonths.map(function(month, index) {
      var monthIndex = parseInt(month.split(", ")[1])
      var currentMonth = months[monthIndex]
      var currentYear = month.split(", ")[0].slice(2, month.split(", ")[0].length)
      var item = currentMonth[0].toUpperCase().concat(currentMonth.slice(1, currentMonth.length)) + " " + currentYear;

      if (index === 0) {
        return <th key={index} className="first-month"><span onClick={this.handleClick}>&lt;</span> {item}</th>
      } else if (index === mainMonths.length - 1) {
        return <th key={index} className="last-month">{item}<span onClick={this.handleClick}>&gt;</span></th>
      } else {
        return <th key={index}>{item}</th>
      }
    }.bind(this))

    for (var property in this.props.transactions[0]) {
      var date = property.toString().split(", ");
      if (date.length === 1) {
        date = date[0]
      } else {
        var month = months[parseInt(date[1])]
        var month = month[0].toUpperCase().concat(month.slice(1, month.length))
        var year = date[0].slice(2, date[0].length)
        date = month + " " + year;
      }
    }

    return (
      <thead>
        <tr>
          <th>Reports</th>
          {mainMonths}
          <th onClick={this.handleDropdown} className="dropdown">{date} <span className="dropdown-arrow">+</span></th>
        </tr>
      </thead>
    )
  }
})

module.exports = Month;
