var React = require('react');

var Cost = React.createClass({
  render: function() {
    var expenses = [],
        income = [],
        total = [];

    var transactions = this.props.transactions.slice();
    transactions.push(transactions.shift())

    for (var i = 0; i < transactions.length; i++) {
      for (var property in transactions[i]) {
        if (transactions[i].hasOwnProperty(property)) {
          expenses.push(<td key={i}>{transactions[i][property].expense}</td>);
          income.push(<td key={i}>{transactions[i][property].income}</td>);
          total.push(<td key={i}>{transactions[i][property].total}</td>);
        }
      }
    };

    return (
      <tbody>
        <tr>
          <th>Income</th>
          {income}
        </tr>
        <tr>
          <th>Expense</th>
          {expenses}
        </tr>
        <tr>
          <th>Total</th>
          {total}
        </tr>
      </tbody>
    )
  }
})

module.exports = Cost;
