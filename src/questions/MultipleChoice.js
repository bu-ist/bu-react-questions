import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';

import TextListAnswer from './components/TextListAnswer';

import './common.scss';

class MultipleChoice extends React.Component {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.object).isRequired,
    submitted: PropTypes.bool,
    correct: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    submitted: false,
    correct: null,
    onChange: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      pristine: true,
      selectedAnswer: null,
    };
  }

  isCorrect = () => {
    const { answers } = this.props;
    const { selectedAnswer } = this.state;

    return answers[selectedAnswer].correct;
  };

  onChangeAnswer = (index) => {
    const { onChange } = this.props;

    const pristine = false;

    // Check if answer is valid.
    const valid = true;

    // Update component state.
    this.setState({
      pristine,
      selectedAnswer: index,
    });

    // Update question wrapper component state.
    onChange(pristine, valid);
  };

  answerType = (index) => {
    const { submitted, correct } = this.props;
    const { selectedAnswer } = this.state;

    // Calculate what type of feedback the answer should display.
    if (!submitted || selectedAnswer !== index) {
      return 'unselected';
    }

    if ((selectedAnswer === index) && correct) {
      return 'correct';
    }

    return 'incorrect';
  }

  render() {
    const { answers, submitted } = this.props;
    const { selectedAnswer } = this.state;

    const renderedAnswers = answers.map((answer, index) => {
      const selected = selectedAnswer === index;
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
          <Radio
            color="primary"
            checked={selected}
            onChange={() => this.onChangeAnswer(index)}
            disabled={submitted}
          />
        </TextListAnswer>
      );
    });

    return <ul className="answer-list">{renderedAnswers}</ul>;
  }
}

export default MultipleChoice;
