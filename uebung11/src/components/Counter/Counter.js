import './Counter.css';
import React from 'react';
import {increaseCounter} from "../../actions/counterAction";
import {connect} from "react-redux";
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.count,
    }
  }

  render() {
    return(
      <div className={"counterContainer"}>
        <div>
          <h2>Counter</h2>
        </div>
        <div className={"counterContent"}>
          <div>
            Derzeitiger Stand:
          </div>
          <div>
            {this.props.counter.counter}
          </div>
        </div>
        <div>
          <button onClick={this.props.increaseCounter}>Count</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counterReducer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    increaseCounter: () => {
      dispatch(increaseCounter());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

