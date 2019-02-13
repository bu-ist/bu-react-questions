import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

import TextListAnswer from './components/TextListAnswer';

import './common.scss';

class MultipleAnswer extends React.Component {
  static propTypes = {
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        answer: PropTypes.node.isRequired,
        feedback: PropTypes.node,
        correct: PropTypes.bool,
      }),
    ).isRequired,
    submitted: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    submitted: false,
    onChange: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      pristine: true,
      selectedAnswers: [],
    };
  }

  isCorrect = () => {
    let correct = true;
    const { answers } = this.props;
    const { selectedAnswers } = this.state;

    answers.forEach((answer, index) => {
      if (
        (answer.correct && !selectedAnswers.includes(index))
        || (!answer.correct && selectedAnswers.includes(index))
      ) {
        correct = false;
      }
    });
    return correct;
  };

  onChangeAnswer = (index) => {
    const pristine = false;
    const { selectedAnswers } = this.state;
    const { onChange } = this.props;

    // Check if answer is valid.
    const valid = true;

    // Toggle selected answer.
    let newSelectedAnswers;
    if (selectedAnswers.includes(index)) {
      newSelectedAnswers = selectedAnswers.filter(i => i !== index);
    } else {
      newSelectedAnswers = [...selectedAnswers, index];
    }

    // Update component state.
    this.setState({
      pristine,
      selectedAnswers: newSelectedAnswers,
    });

    // Update question wrapper component state.
    onChange(pristine, valid);
  };

  answerType = (index) => {
    const { answers, submitted } = this.props;
    const { selectedAnswers } = this.state;

    // Calculate what type of feedback the answer should display.
    const { correct } = answers[index];

    if (!submitted || !(selectedAnswers.includes(index) || correct)) {
      return 'unselected';
    }

    if (selectedAnswers.includes(index) && correct) {
      return 'correct';
    }

    return 'incorrect';
  }

  render() {
    const { answers, submitted } = this.props;
    const { selectedAnswers } = this.state;

    const renderAnswers = answers.map((answer, index) => {
      const selected = selectedAnswers.includes(index);
      const answerType = this.answerType(index);

      return (
        <TextListAnswer
          key={index}
          answer={answer}
          selected={selected}
          type={answerType}
          onChangeAnswer={this.onChangeAnswer}
          submitted={submitted}
        >
          <Checkbox
            color="primary"
            checked={selected}
            onChange={() => this.onChangeAnswer(index)}
            disabled={submitted}
          />
        </TextListAnswer>
      );
    });

    return <ul className="answer-list">{renderAnswers}</ul>;
  }
}

export default MultipleAnswer;
