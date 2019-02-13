import React from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CorrectIcon from '@material-ui/icons/CheckCircleRounded';
import IncorrectIcon from '@material-ui/icons/CancelRounded';
import {
  TrueFalse,
  MultipleChoice,
  MultipleAnswer,
  CalculatedNumeric,
} from './questions';

import './Question.scss';

class Question extends React.Component {
  static propTypes = {
    questionData: PropTypes.shape({
      type: PropTypes.string,
      header: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
      ]),
      body: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
      ]),
      answers: PropTypes.arrayOf(PropTypes.shape({
        answer: PropTypes.oneOfType([
          PropTypes.node,
          PropTypes.element,
        ]),
        feedback: PropTypes.oneOfType([
          PropTypes.node,
          PropTypes.element,
        ]),
        correct: PropTypes.bool,
      })),
      feedback: PropTypes.shape({
        correct: PropTypes.oneOfType([
          PropTypes.node,
          PropTypes.element,
        ]),
        incorrect: PropTypes.oneOfType([
          PropTypes.node,
          PropTypes.element,
        ]),
      }),
    }).isRequired,
    onReset: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onReset: null,
    onSubmit: null,
  };

  constructor(props) {
    super(props);
    this.answerComponentRef = React.createRef();
    this.initialState = {
      pristine: true,
      valid: null,
      submitted: false,
      correct: null,
      resetCount: 0,
    };
    this.state = {
      ...this.initialState,
    };
  }

  // Handles the reset event.
  onReset = (event) => {
    const { onReset } = this.props;

    event.preventDefault();

    this.setState(
      prevState => ({
        ...this.initialState,
        // Increment the reset count so that it will reset the child elements via the key prop.
        resetCount: prevState.resetCount + 1,
      }),
      () => {
        // Run the onReset event hook prop.
        if (onReset) {
          onReset();
        }
      },
    );
  };

  // Handles the submit event.
  onSubmit = (event) => {
    const { onSubmit } = this.props;
    const { submitted } = this.state;

    event.preventDefault();
    if (submitted) {
      return false;
    }

    // Check with answerComponent if answer is correct or not.
    const correct = this.answerComponentRef.current.isCorrect();

    // Abort submission if correct is null.
    if (correct === null) {
      this.setState({
        pristine: false,
      });
      return false;
    }

    this.setState(
      {
        pristine: false,
        submitted: true,
        correct,
      },
      () => {
        // Run the onSubmit event hook prop.
        if (onSubmit) {
          onSubmit();
        }
      },
    );

    return true;
  };

  onChange = (pristine = false, valid = null) => {
    this.setState({
      pristine,
      valid,
    });
  };

  // Renders the correct question type.
  renderAnswerComponent = () => {
    const { questionData } = this.props;
    const { resetCount, submitted: submitState, correct } = this.state;

    const commonProps = {
      key: resetCount,
      ref: this.answerComponentRef,
      submitted: submitState,
      onChange: this.onChange,
      ...questionData,
    };

    switch (questionData.type) {
      case 'true-false':
        return (
          <TrueFalse
            correct={correct}
            {...commonProps}
          />
        );
      case 'multiple-choice':
        return (
          <MultipleChoice
            correct={correct}
            {...commonProps}
          />
        );
      case 'multiple-answer':
        return (
          <MultipleAnswer
            {...commonProps}
          />
        );
      case 'calculated-numeric':
        return (
          <CalculatedNumeric
            {...commonProps}
          />
        );
      default:
        console.error(
          `'${questionData.type}' is not a recognized question type.`,
        );
        return null;
    }
  };

  // Generates the string of classes to be passed to className.
  className = () => {
    const { pristine, submitted, correct } = this.state;

    const prefix = this.constructor.name;
    const classes = [];

    classes.push(pristine ? 'pristine' : 'dirty');
    classes.push(submitted ? 'submitted' : 'unsubmitted');

    if (correct !== null) {
      classes.push(correct ? 'correct' : 'incorrect');
    }

    const prefixedClasses = classes.map(c => `${prefix}--state-${c}`);
    prefixedClasses.unshift(prefix);
    return prefixedClasses.join(' ');
  };

  renderFeedback = () => {
    const { correct } = this.state;
    const { questionData } = this.props;

    if (correct === null) {
      return null;
    }
    const { feedback } = questionData;
    const renderedFeedback = correct
      ? feedback.correct
      : feedback.incorrect;

    return (
      <div className="feedback">
        {correct
          ? <CorrectIcon className="question-icon-correct" />
          : <IncorrectIcon className="question-icon-incorrect" />}
        {renderedFeedback}
      </div>
    );
  };

  render() {
    const { questionData } = this.props;
    const { pristine, submitted, valid } = this.state;

    const { header, body } = questionData;

    return (
      <article className="question">
        <header className="header">{header}</header>
        <div className="body">{body}</div>
        <form onSubmit={this.onSubmit} onReset={this.onReset}>
          {this.renderAnswerComponent()}
          {!submitted && (
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              disabled={pristine || !valid}
            >
              Check Answer
            </Button>
          )}
          {!pristine && <Button type="reset">Reset</Button>}
        </form>
        <footer>{this.renderFeedback()}</footer>
      </article>
    );
  }
}

export default Question;
