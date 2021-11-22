import './App.css';
import React from 'react';
import Aufgabenliste from "./components/Aufgabenliste/Aufgabenliste";
import Counter from "./components/Counter/Counter";
import {Link, Route} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }
  /*
  handleCounter = () => {
    this.setState({counter: this.state.counter + 1});
  }*/
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/todo'}>Aufgabenliste</Link>
            </li>
            <li>
              <Link to={'/counter'}>Counter</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Route path={"/todo"}>
            <Aufgabenliste /*handler={this.handleCounter}*//>
          </Route>
          <Route path={"/counter"}>
            <Counter count={this.state.counter}/>
          </Route>
        </main>
      </div>
    );
  }
}

export default App;
