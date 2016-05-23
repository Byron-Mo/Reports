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
    var list = [];
    var listItem = []
    if (this.props.dropdownActive) {
      for (var j = 0; j < this.props.years.length; j++) {
        list.push(<li
          key={j}
          data-date={this.props.years[j]}
          onClick={this.handleClick}
          className="year-item">
          <strong>{this.props.years[j]}</strong>
        </li>)
        for (var i = 0; i < months.length; i++) {
          var month = months[i][0].toUpperCase().concat(months[i].slice(1, months[i].length))
          list.push(<li
            key={month + " " + this.props.years[j]}
            data-date={this.props.years[j] + ", " + i}
            onClick={this.handleClick}
            className={i % 2 === 0 ? "even-list-item" : "odd-list-item"}>
            {month + " " + this.props.years[j].slice(2, this.props.years[j].length)}
          </li>)
        }
        listItem.push(<ul key={j} className="dropdown-items">{list}</ul>)
        list = []
      }
    }

    return (
      <div className="report-child">
        {listItem}
      </div>
    )
  }
})

module.exports = DropDown;
