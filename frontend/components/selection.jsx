var React = require('react');

var Selection = React.createClass({
  handleClick: function(event) {
    event.preventDefault();
    this.props.handleSwitchSelection(event.currentTarget.textContent.toLowerCase())
  },

  render: function() {
    var row;
    if (this.props.selection === "vendor") {
      row = <td colSpan="3"><span onClick={this.handleClick}><strong>Vendor</strong></span> | <span onClick={this.handleClick}>Category</span></td>
    } else if (this.props.selection === "category") {
      row = <td colSpan="3"><span onClick={this.handleClick}>Vendor</span> | <span onClick={this.handleClick}><strong>Category</strong></span></td>
    }

    return (
      <tbody>
        <tr>
          {row}
        </tr>
      </tbody>
    )
  }
})

module.exports = Selection;
