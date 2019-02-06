import React from "react";
import {
  TrueFalse,
  MultipleChoice,
  MultipleAnswer,
  CalculatedNumeric
} from "./questions";
import Button from '@material-ui/core/Button';
import CorrectIcon from '@material-ui/icons/CheckCircleRounded';
import IncorrectIcon from '@material-ui/icons/CancelRounded';

import './Question.scss';

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

    this.setState(
      prevState => ({
        ...this.initialState,
        // Increment the reset count so that it will reset the child elements via the key prop.
        resetCount: prevState.resetCount + 1
      }),
      () => {
        // Run the onReset event hook prop.
        if (this.props.onReset) {
          this.props.onReset();
        }
      }
    );
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

    this.setState(
      {
        pristine: false,
        submitted: true,
        correct
      },
      () => {
        // Run the onSubmit event hook prop.
        if (this.props.onSubmit) {
          this.props.onSubmit();
        }
      }
    );

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
    const commonProps = {
      key: this.state.resetCount,
      ref: this.answerComponentRef,
      submitted: this.state.submitted,
      onChange: this.onChange,
      ...this.props.questionData,
    };


    switch (this.props.questionData.type) {
      case "true-false":
        return (
          <TrueFalse
            correct={this.state.correct}
            {...commonProps}
          />
        );
      case "multiple-choice":
        return (
          <MultipleChoice
            correct={this.state.correct}
            {...commonProps}
          />
        );
      case "multiple-answer":
        return (
          <MultipleAnswer
            {...commonProps}
          />
        );
      case "calculated-numeric":
        return (
          <CalculatedNumeric
            {...commonProps}
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
    const renderedFeedback = this.state.correct
      ? feedback.correct
      : feedback.incorrect;

    return (
      <div className={'feedback'}>
        {this.state.correct
          ? <CorrectIcon className='question-icon-correct' />
          : <IncorrectIcon className='question-icon-incorrect' />} 
        {renderedFeedback}
      </div>
    );
  };

  render() {
    const { header, body } = this.props.questionData;
    return (
      <article className='question'>
        <header className='header'>{header}</header>
        <div className='body'>{body}</div>
        <form onSubmit={this.onSubmit} onReset={this.onReset}>
          {this.renderAnswerComponent()}
          {!this.state.submitted && (
            <Button
              variant='outlined'
              color='primary'
              type="submit"
              disabled={this.state.pristine || !this.state.valid}
            >
              Check Answer
            </Button>
          )}
          {!this.state.pristine && <Button type="reset">Reset</Button>}
        </form>
        <footer>{this.renderFeedback()}</footer>
      </article>
    );
  }
}

export default Question;
