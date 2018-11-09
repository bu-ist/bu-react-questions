import React from "react";
import { TrueFalse } from "./questions";

import "./Question.css";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      pristine: true,
      valid: null,
      submitted: false,
      correct: null,
      resetCount: 0
    };
    this.state = {
      ...this.initialState
    };
  }

  // This will likely get moved to inside of each specific question type.
  isCorrect = () => {
    return true;
  };

  // Handles the reset event.
  onReset = event => {
    event.preventDefault();

    this.setState(prevState => ({
      ...this.initialState,
      // Increment the reset count so that it will reset the child elements via the key prop.
      resetCount: prevState.resetCount + 1
    }));
  };

  // Handles the submit event.
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

  // Renders the correct question type.
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

  // Generates the string of classes to be passed to className.
  className = () => {
    const prefix = this.constructor.name;
    const classes = [];

    classes.push(this.state.pristine ? "pristine" : "dirty");
    classes.push(this.state.submitted ? "submitted" : "unsubmitted");

    if (this.state.correct !== null) {
      classes.push(this.state.correct ? "correct" : "wrong");
    }

    const prefixedClasses = classes.map(c => `${prefix}--state-${c}`);
    prefixedClasses.unshift(prefix);
    return prefixedClasses.join(" ");
  };

  render() {
    const { header, body } = this.props.questionData;
    return (
      <article className={this.className()}>
        <header className={`${this.constructor.name}__header`}>{header}</header>
        <div className={`${this.constructor.name}__body`}>{body}</div>
        <form onSubmit={this.onSubmit} onReset={this.onReset}>
          {this.renderQuestion()}
          {!this.state.pristine && <button type="reset">Reset</button>}
          {!this.state.submitted && (
            <button type="submit" disabled={this.state.pristine}>
              Check Answer
            </button>
          )}
        </form>
        {this.state.correct !== null && (
          <footer className={`${this.constructor.name}__feedback`}>
            {this.state.correct
              ? this.props.questionData.correctFeedback
              : this.props.questionData.incorrectFeedback}
          </footer>
        )}
      </article>
    );
  }
}

export default Question;
