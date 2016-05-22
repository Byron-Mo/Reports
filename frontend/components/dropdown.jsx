var React = require('react'),
    months = require('../constants/Months'),
    $ = require('jquery');

var DropDown = React.createClass({
  handleClick: function(event) {
    event.preventDefault();
    var $event = $(event.currentTarget);
    this.props.handleOptionChange($event.data("date"))
    this.props.handleDropdown(false)
  },

  render: function() {
    var yearList,
        monthList = [];

    if (this.props.dropdownActive) {
      yearList = this.props.years.map(function(year, index) {
        return <li key={index} data-date={year} onClick={this.handleClick}>{year}</li>
      }.bind(this))
      yearList.unshift(<li key={"year"}><strong>Year</strong></li>)

      for (var i = 0; i < months.length; i++) {
        for (var j = 0; j < this.props.years.length; j++) {
          var month = months[i][0].toUpperCase().concat(months[i].slice(1, months[i].length))
          monthList.push(<li
            key={month + " " + this.props.years[j]}
            data-date={this.props.years[j] + ", " + i}
            onClick={this.handleClick}>
            {month + " " + this.props.years[j]}
          </li>)
        }
      }
      monthList.unshift(<li key={"month"}><strong>Month</strong></li>)
    }

    return (
      <div>
        <ul>{yearList}</ul>
        <ul>{monthList}</ul>
      </div>
    )
  }
})

module.exports = DropDown;
