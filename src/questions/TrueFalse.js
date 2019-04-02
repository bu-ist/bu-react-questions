import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';

import TextListAnswer from './components/TextListAnswer';
import Types from '../types';

import './common.scss';

class TrueFalse extends React.Component {
  static propTypes = {
    answers: Types.questionData.answers.isRequired,
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
    const { answers, submitted: submitProp } = this.props;
    const { selectedAnswer } = this.state;

    const renderedAnswers = answers.map((answer, index) => {
      const answerType = this.answerType(index);

      return (
        <TextListAnswer
          key={answer.answer}
          answer={answer}
          type={answerType}
          onChangeAnswer={this.onChangeAnswer}
          submitted={submitProp}
        >
          <Radio
            color="primary"
            checked={selectedAnswer === index}
            onChange={() => this.onChangeAnswer(index)}
            disabled={submitProp}
          />
        </TextListAnswer>
      );
    });

    return <ul className="answer-list">{renderedAnswers}</ul>;
  }
}

export default TrueFalse;
