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

  renderAnswers = () => {
    const answers = this.props.answers.map((answer, index) => {
      return (
        <li key={index}>
          <div className={`${this.constructor.name}__answer`}>
            <Checkbox
              checked={this.state.selectedAnswers.includes(index)}
              onChange={() => this.onChangeAnswer(index)}
            />{" "}
            {answer.answer}
          </div>
          {this.props.submitted && (
            <div className={`${this.constructor.name}__feedback`}>
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
