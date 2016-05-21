var React = require('react'),
    ReactDOM = require('react-dom');

var Reports = React.createClass({
  render: function() {
    return (
      <div>
        Hello
      </div>
    )
  }
})

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Reports />, document.getElementById("content"))
})
