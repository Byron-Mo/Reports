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
    var threeMonths = [];

    for (var i = 1; i <= this.props.transactions.length; i++) {
      for (var property in this.props.transactions[i]) {
        if (this.props.transactions[i].hasOwnProperty(property)) {
          threeMonths.push(property)
        }
      }
    }

    threeMonths = threeMonths.map(function(month, index) {
      var monthIndex = parseInt(month.split(", ")[1])
      var item = months[monthIndex][0].toUpperCase().concat(months[monthIndex].slice(1, months[monthIndex].length)) + " " + month.split(", ")[0];

      if (index === 0) {
        return <th key={index}><span onClick={this.handleClick}>&lt;</span> {item}</th>
      } else if (index === threeMonths.length - 1) {
        return <th key={index}>{item} <span onClick={this.handleClick}>&gt;</span></th>
      } else {
        return <th key={index}>{item}</th>
      }
    }.bind(this))

    for (var property in this.props.transactions[0]) {
      var optionDate = property;
    }

    return (
      <thead>
        <tr>
          <th>Reports</th>
          {threeMonths}
          <th onClick={this.handleDropdown}>{optionDate}</th>
        </tr>
      </thead>
    )
  }
})

module.exports = Month;
