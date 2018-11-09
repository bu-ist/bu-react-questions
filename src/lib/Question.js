import React from "react";
import { TrueFalse } from "./questions";

import "./Question.css";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      pristine: true,
      valid: false,
      submitted: false,
      correct: null
    };
    this.state = {
      ...this.initialState,
      resetCount: 0
    };
  }

  isCorrect = () => {
    return true;
  };

  onReset = event => {
    event.preventDefault();

    this.setState(prevState => ({
      ...this.initialState,
      resetCount: prevState.resetCount + 1
    }));
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.state.submitted) {
      return false;
    }

    const correct = this.isCorrect();

    this.setState({
      pristine: false,
      submitted: true,
      correct
    });
  };

  renderQuestion = () => {
    switch (this.props.questionData.type) {
      case "true-false":
        return (
          <TrueFalse {...this.props.questionData} key={this.state.resetCount} />
        );
      default:
        return null;
    }
  };
  render() {
    const { header, body } = this.props.questionData;
    return (
      <article className="Question">
        <header>{header}</header>
        <div>{body}</div>
        <form onSubmit={this.onSubmit} onReset={this.onReset}>
          {this.renderQuestion()}
          {!this.state.pristine && <button type="reset">Reset</button>}
          {!this.state.submitted && <button type="submit">Check Answer</button>}
        </form>
        {this.state.correct !== null && (
          <footer>General correct/incorrect feedback</footer>
        )}
      </article>
    );
  }
}

export default Question;
