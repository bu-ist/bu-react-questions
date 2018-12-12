import React from "react";
import {
  TrueFalse,
  MultipleChoice,
  MultipleAnswer,
  CalculatedNumeric
} from "./questions";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.answerComponentRef = React.createRef();
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

    // Check with answerComponent if answer is correct or not.
    const correct = this.answerComponentRef.current.isCorrect();

    // Abort submission if correct is null.
    if (correct === null) {
      this.setState({
        pristine: false
      });
      return false;
    }

    this.setState({
      pristine: false,
      submitted: true,
      correct
    });
    return true;
  };

  onChange = (pristine = false, valid = null) => {
    this.setState({
      pristine,
      valid
    });
  };

  // Renders the correct question type.
  renderAnswerComponent = () => {
    switch (this.props.questionData.type) {
      case "true-false":
        return (
          <TrueFalse
            key={this.state.resetCount}
            ref={this.answerComponentRef}
            submitted={this.state.submitted}
            {...this.props.questionData}
            onChange={this.onChange}
          />
        );
      case "multiple-choice":
        return (
          <MultipleChoice
            key={this.state.resetCount}
            ref={this.answerComponentRef}
            submitted={this.state.submitted}
            {...this.props.questionData}
            onChange={this.onChange}
          />
        );
      case "multiple-answer":
        return (
          <MultipleAnswer
            key={this.state.resetCount}
            ref={this.answerComponentRef}
            submitted={this.state.submitted}
            {...this.props.questionData}
            onChange={this.onChange}
          />
        );
      case "calculated-numeric":
        return (
          <CalculatedNumeric
            key={this.state.resetCount}
            ref={this.answerComponentRef}
            submitted={this.state.submitted}
            {...this.props.questionData}
            onChange={this.onChange}
          />
        );
      default:
        console.error(
          `'${this.props.questionData.type}' is not a recognized question type.`
        );
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
      classes.push(this.state.correct ? "correct" : "incorrect");
    }

    const prefixedClasses = classes.map(c => `${prefix}--state-${c}`);
    prefixedClasses.unshift(prefix);
    return prefixedClasses.join(" ");
  };

  renderFeedback = () => {
    if (this.state.correct === null) {
      return null;
    }
    const { feedback } = this.props.questionData;
    console.log(this.props.questionData, feedback, typeof feedback);

    let renderedFeedback = "";
    if (typeof feedback === "string") {
      renderedFeedback = feedback;
    } else {
      renderedFeedback = this.state.correct
        ? feedback.correct
        : feedback.incorrect;
    }

    return (
      <div className={`${this.constructor.name}__feedback`}>
        {this.state.correct ? "✔" : "❌"} {renderedFeedback}
      </div>
    );
  };

  render() {
    const { header, body } = this.props.questionData;
    return (
      <article className={this.className()}>
        <header className={`${this.constructor.name}__header`}>{header}</header>
        <div className={`${this.constructor.name}__body`}>{body}</div>
        <form onSubmit={this.onSubmit} onReset={this.onReset}>
          {this.renderAnswerComponent()}
          {!this.state.pristine && <button type="reset">Reset</button>}
          {!this.state.submitted && (
            <button
              type="submit"
              disabled={this.state.pristine || !this.state.valid}
            >
              Check Answer
            </button>
          )}
        </form>
        <footer>{this.renderFeedback()}</footer>
      </article>
    );
  }
}

export default Question;
