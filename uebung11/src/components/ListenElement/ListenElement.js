import React from 'react';
import './ListenElement.css';
class ListenElement extends React.Component {
  constructor(props) {
    super(props);
    this.oldEntry = props.task.task;
    this.state = {entry: props.task, editMode: false}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let taskEntry = this.state.entry;
    taskEntry.task = event.target.value;
    this.setState({saveButton: taskEntry.task.length > 0})
  }

  switchToEdit() {
    this.setState({editMode: true})
    this.props.checkViewMode(false, this.state.entry.id);
  }

  switchToView() {
    let task = this.state.entry;
    task.task = this.oldEntry;
    this.setState({editMode: false, entry:task})
    this.props.checkViewMode(true, this.state.entry.id);
  }

  deleteEntry() {
    this.props.delete(this.state.entry)
  }

  saveEntry(event) {
    event.preventDefault();
    if(this.state.entry.task.length > 0) {
      this.props.edit(this.state.entry);
    }
    this.setState({editMode:false})
  }

  renderViewMode() {
    return (
      <div className={"entry-readonly"}>
        <div>{this.state.entry.task}</div>
        <button type={"button"} onClick={()=>this.switchToEdit()}>Edit</button>
        <button type={"button"} onClick={() => this.deleteEntry()}>Delete</button>
      </div>
    );
  }

  renderEditMode() {
    return (
      <div className={"entry-editable"}>
        <form onSubmit={(event) => this.saveEntry(event)}>
          <div><input name={"task"} value={this.state.entry.task} onChange={this.handleChange}/></div>
          <button type={"submit"} disabled={!this.state.saveButton}>Save</button>
          <button type={"button"} onClick={()=>this.switchToView()}>Abort</button>
        </form>
      </div>
    );
  }

  render() {
    return (
      !this.state.editMode  ? this.renderViewMode() : this.renderEditMode()
    );
  }
}

export default ListenElement;
