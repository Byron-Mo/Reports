var React = require('react'),
    months = require('../constants/Months');

var Month = React.createClass({
  render: function() {
    var threeMonths = [];

    for (var i = 1; i <= this.props.transactions.length; i++) {
      for (var property in this.props.transactions[i]) {
        if (this.props.transactions[i].hasOwnProperty(property)) {
          threeMonths.push(property)
        }
      }
    }

    threeMonths = threeMonths.map(function(month) {
      var index = parseInt(month.split(", ")[1])
      var item = months[index][0].toUpperCase().concat(months[index].slice(1, months[index].length));

      var index = threeMonths.indexOf(month);

      if (index === 0) {
        return <th key={index}><span>&lt;</span>{item}</th>
      } else if (index === threeMonths.length - 1) {
        return <th key={index}>{item}<span>&gt;</span></th>
      } else {
        return <th key={index}>{item}</th>
      }
    })

    for (var property in this.props.transactions[0]) {
      var optionDate = property;
    }

    return (
      <thead>
        <tr>
          <th>Reports</th>
          {threeMonths}
          <th>{optionDate}</th>
        </tr>
      </thead>
    )
  }
})

module.exports = Month;
