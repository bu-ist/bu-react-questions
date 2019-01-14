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

  renderAnswers = () => {
    const answers = this.props.answers.map((answer, index) => {
      return (
        <li key={index}>
          <div className={`${this.constructor.name}__answer`}>
            <Radio
              checked={this.state.selectedAnswer === index}
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

export default MultipleChoice;
