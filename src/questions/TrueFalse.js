import React from 'react';
import Radio from '@material-ui/core/Radio';

import TextListAnswer from './components/TextListAnswer';

import './common.scss';

class TrueFalse extends React.Component {
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
    const { answers, submitted: submitProp } = this.props;
    const { selectedAnswer } = this.state;

    const renderedAnswers = answers.map((answer, index) => {
      const answerType = this.answerType(index);

      return (
        <TextListAnswer
          key={index}
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
