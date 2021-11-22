import './Aufgabenliste.css';
import React from 'react';
import ListenElement from "../ListenElement/ListenElement";
import NeuesListenElement from "../NeuesListenElement/NeuesListenElement";
import {deleteTask, modifyTask, saveTask} from "../../actions/listAction";
import {connect} from 'react-redux'
import {increaseCounter} from "../../actions/counterAction";
class Aufgabenliste extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      overwatchTasks: [],
      blockedInput: false
    }
  }
  /*
  saveTask (newTask) {
    this.state.data.sort((a,b) => a.id - b.id);
    let lastId = this.state.data[this.state.data.length-1].id +1;
    let newEntry = {task: newTask, id: lastId }
    let tasks = this.state.data;
    tasks.push(newEntry);
    this.setState({data: tasks});
    this.props.handler();
  }

  deleteTask(task) {
    let tasks = this.state.data;
    let index = tasks.findIndex(x => x.id === task.id);
    if(index>=0) {
      tasks.splice(index,1);
      this.setState({data: tasks})
    }
  }
  editTask(task) {
    let tasks = this.state.data;
    let index = tasks.findIndex(x => x.id === task.id);
    if(index>=0) {
      tasks[index]=task;
      this.setState({data: tasks})
    }
  }
  */
  checkViewMode(mode, taskId) {
    let watchedTasks = this.state.overwatchTasks;
    if(watchedTasks.length > 0 ) {
      let task = watchedTasks.find(element => element.taskId === taskId);
      if(task) {
        task.view = mode;
      } else {
        watchedTasks.push({view: mode, taskId})
      }
    } else {
      watchedTasks.push({view: mode, taskId})
    }
    this.setState({overwatchTask: watchedTasks});
    const noEditLeft = (objectTest) => objectTest.view !== false;
    const editTest = this.state.overwatchTasks.every(noEditLeft);
    this.setState({blockedInput: !editTest})
  }

  render() {
    return(
      <div className={"todo-component"}>
        <section className={"todo-component__header-container"}>
          <header className={"todo-component__header-title"}>
            <h1>Meine Aufgaben</h1>
          </header>
          <NeuesListenElement blockedInput={this.state.blockedInput} save={this.props.saveTask} counter={this.props.increaseCounter}/>
        </section>
        <div>
          {
            this.props.todo.tasks.map((taskEntry) => <ListenElement key={taskEntry.id} checkViewMode={this.checkViewMode.bind(this)} task={taskEntry} edit={this.props.modifyTask} delete={this.props.deleteTask}/>)
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todo: state.listReducer,
    counter: state.counterReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask: (task) => {
      dispatch(deleteTask(task))
    },
    saveTask: (task) => {
      dispatch(saveTask(task))
    },
    modifyTask: (task) => {
      dispatch(modifyTask(task))
    },
    increaseCounter: () => {
      dispatch(increaseCounter());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aufgabenliste);
