import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
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
      selects: [],
    };
  }

  isCorrect = () => {
    const { answers } = this.props;
    const { selects } = this.state;

    // Sort selects array for comparison, without mutating original array.
    const selectsOrdered = [...selects].sort((a, b) => parseFloat(a.name) - parseFloat(b.name));

    // Compare answers with sorted selects
    const checkAnswers = answers.map((answer, index) => answer.correct === selectsOrdered[index].value);
    const correct = checkAnswers.every(x => x);

    return correct;
  };

  onChangeAnswer = (event) => {
    const { onChange } = this.props;
    const { target: newSelect } = event;

    // Update component state with new set of selections.
    this.setState((prevState) => {
      // If the target name or value already exists in the state, remove it.
      const filteredSelects = prevState.selects.filter(x => x.name !== newSelect.name && x.value !== newSelect.value);

      // Then add the new event target to state.
      const newSelects = [...filteredSelects, newSelect];
      return { selects: newSelects };
    }, () => {
      // Compare answers to state in setState callback to ensure state has completed updating
      const { answers } = this.props;
      const { selects } = this.state;
      const pristine = false;

      // Only valid if all selects are complete.
      const valid = answers.length === selects.length;

      // Update question wrapper component state.
      onChange(pristine, valid);
    });
  };

  answerType = (index) => {
    const { answers, submitted } = this.props;
    const { selects } = this.state;

    // Calculate what type of feedback the answer should display.
    if (!submitted) {
      return 'unselected';
    }

    const selectForIndex = selects.find(x => x.name === index);

    if (answers[index].correct === selectForIndex.value) {
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

    // Map answersInOrder to build an array of menuItem values
    const menuItems = answersInOrder.map(x => <MenuItem value={x.correct}>{x.correct}</MenuItem>);

    const renderAnswers = answers.map((answer, index) => {
      const select = selects.find(x => (x.name === index));

      let value = null;
      if (select) {
        value = select.value;
      }

      const answerType = this.answerType(index);

      return (

        <TextListAnswer
          key={index}
          answer={answer}
          type={answerType}
          onChangeAnswer={this.onChangeAnswer}
          submitted={submitted}
        >
          <Select
            color="primary"
            index={index}
            onChange={this.onChangeAnswer}
            disabled={submitted}
            name={index}
            value={value}
          >
            {menuItems}
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
