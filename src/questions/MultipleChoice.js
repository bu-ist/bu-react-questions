import React from "react";
import Radio from '@material-ui/core/Radio';

import styles from './common.scss';

class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pristine: true,
      selectedAnswer: null
    };
  }

  isCorrect = () => {
    return this.props.answers[this.state.selectedAnswer].correct;
  };

  onChangeAnswer = index => {
    const pristine = false;

    // Check if answer is valid.
    const valid = true;

    // Update component state.
    this.setState({
      pristine,
      selectedAnswer: index
    });

    // Update question wrapper component state.
    this.props.onChange(pristine, valid);
  };

  answerClassName = (index) => {
    // Return the correct CSS class for the current state.
    if ( ! this.props.submitted || this.state.selectedAnswer !== index ) {
      // Default style with no feedback required.
      return styles.answer;
    }

    if ( this.state.selectedAnswer === index && this.props.correct ) {
      return styles.correct;
    } else {
      return styles.incorrect;
    }
  }

  renderAnswers = () => {
    const answers = this.props.answers.map((answer, index) => {
      const selected = this.state.selectedAnswer === index;

      return (
        <li key={index}>
          <div className={this.answerClassName(index)}>
            <Radio
              checked={selected}
              onChange={() => this.onChangeAnswer(index)}
            />{" "}
            {answer.answer}
          </div>
          {this.props.submitted && selected && (
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

export default MultipleChoice;
