import React from 'react';
import './NeuesListenElement.css';
class NeuesListenElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {canBeSaved: false, newEntry: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({newEntry: event.target.value, canBeSaved: event.target.value !== ''})
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.newEntry.length > 0 ) {
      this.props.save(this.state.newEntry);
      this.props.counter();
    }
    this.setState({newEntry: '', canBeSaved: false})
  }

  render() {
    return (
      <div className={"todo-component__header-input"}>
        <form onSubmit={this.handleSubmit}>
          <input name={"task"} disabled={this.props.blockedInput} value={this.state.newEntry} onChange={this.handleChange}/>
          <button type={"submit"} disabled={!this.state.canBeSaved}>Save</button>
        </form>
      </div>
    );
  }
}

export default NeuesListenElement;
