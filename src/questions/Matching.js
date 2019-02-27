import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import TextListAnswer from './components/TextListAnswer';
import Types from '../types';

import './common.scss';
import './Matching.scss';

class Matching extends React.Component {
  static propTypes = {
    answers: Types.questionData.answers.isRequired,
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
      selects: [],
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

  onChangeAnswer = (event) => {
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
    const { selects } = this.state;

    // Sort answers by alphabetical letter, without mutating original array.
    const answersInOrder = [...answers].sort((a, b) => (
      a.correct.localeCompare(b.correct)
    ));

    const renderAnswers = answers.map((answer, index) => {
      const select = selects.includes(index);
      const answerType = this.answerType(index);

      return (

        <TextListAnswer
          key={index}
          answer={answer}
          //selected={selected}
          type={answerType}
          onChangeAnswer={this.onChangeAnswer}
          submitted={submitted}
        >
          <Select
            color="primary"
            //checked={selected}
            onChange={this.onChangeAnswer}
            disabled={submitted}
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="D">D</MenuItem>
            <MenuItem value="E">E</MenuItem>
          </Select>
        </TextListAnswer>
      );
    });

    return (
      <div className="matching-area">
        <ul className="answer-list">{renderAnswers}</ul>
        <PromptBox answers={answersInOrder} />
      </div>
    );
  }
}

function PromptBox(props) {
  const { answers } = props;

  const items = answers.map(item => (
    <div className="item-prompt">
      {item.correct}
      .
      {' '}
      {item.feedback}
    </div>
  ));

  return (
    <div className="item-list">{items}</div>
  );
}

export default Matching;
