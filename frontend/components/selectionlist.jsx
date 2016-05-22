var React = require('react');

var SelectionList = React.createClass({
  render: function() {
    var lists = {};
    var transactions = this.props.transactions.slice();
    transactions.push(transactions.shift());
    
    for (var i = 0; i < transactions.length; i++) {
      for (var property in transactions[i]) {
        if (transactions[i].hasOwnProperty(property)) {
          var transaction = transactions[i][property];
          for (var prop in transaction) {
            if (transaction.hasOwnProperty(prop)) {
              if (prop !== "expense" && prop !== "income" && prop !== "total") {
                if (lists[prop]) {
                  lists[prop].push(<td key={i}>{transaction[prop]}</td>)
                } else {
                  lists[prop] = [<td key={i}>{transaction[prop]}</td>]
                }
              }
            }
          }
        }
      }
    }
    var masterList = [];

    for (var property in lists) {
      if (lists.hasOwnProperty(property)) {
        masterList.push(<tr key={property}><th>{property}</th>{lists[property]}</tr>)
      }
    }

    return (
      <tbody>
        {masterList}
      </tbody>
    )
  }
})

module.exports = SelectionList;
