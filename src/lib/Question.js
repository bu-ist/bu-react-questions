import React from "react";
import "./Question.css";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }
  render() {
    if (this.state.clicked) {
      return "I will become an interactive question in the future";
    }
    return (
      <div className="question">
        <pre onClick={() => this.setState({ clicked: true })}>
          {JSON.stringify(this.props, null, 2)}
        </pre>
      </div>
    );
  }
}

export default Question;
