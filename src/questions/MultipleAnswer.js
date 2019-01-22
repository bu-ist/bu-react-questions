import React from "react";
import Checkbox from '@material-ui/core/Checkbox';

import styles from './common.scss';

class MultipleAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pristine: true,
      selectedAnswers: []
    };
  }

  isCorrect = () => {
    let correct = true;
    this.props.answers.forEach((answer, index) => {
      if (
        (answer.correct && !this.state.selectedAnswers.includes(index)) ||
        (!answer.correct && this.state.selectedAnswers.includes(index))
      ) {
        correct = false;
      }
    });
    return correct;
  };

  onChangeAnswer = index => {
    const pristine = false;

    // Check if answer is valid.
    const valid = true;

    // Toggle selected answer.
    let newSelectedAnswers;
    if (this.state.selectedAnswers.includes(index)) {
      newSelectedAnswers = this.state.selectedAnswers.filter(i => i !== index);
    } else {
      newSelectedAnswers = [...this.state.selectedAnswers, index];
    }

    // Update component state.
    this.setState({
      pristine,
      selectedAnswers: newSelectedAnswers
    });

    // Update question wrapper component state.
    this.props.onChange(pristine, valid);
  };

  answerClassName = (index) => {
    // Return the correct CSS class for the current state.
    const correct = this.props.answers[index].correct;

    if ( ! this.props.submitted || ! (this.state.selectedAnswers.includes(index) || correct ) ) {
      // Default style with no feedback required.
      // Skip unselected answers that are correct, these need visual feedback display.
      return styles.answer;
    }

    if ( this.state.selectedAnswers.includes(index) && correct ) {
      return styles.correct;
    } else {
      return styles.incorrect;
    }
  }

  renderAnswers = () => {
    const answers = this.props.answers.map((answer, index) => {
      const selected = this.state.selectedAnswers.includes(index);

      return (
        <li key={index}>
          <div className={this.answerClassName(index)}>
            <Checkbox
              color='primary'
              checked={selected}
              onChange={() => this.onChangeAnswer(index)}
              disabled={this.props.submitted}
            />{" "}
            {answer.answer}
          </div>
          {this.props.submitted && selected &&  (
            <div className={styles.feedback}>
              {answer.feedback}
            </div>
          )}
        </li>
      );
    });
    return answers;
  };

  render() {
    return <ul className={styles.answerList}>{this.renderAnswers()}</ul>;
  }
}

export default MultipleAnswer;
