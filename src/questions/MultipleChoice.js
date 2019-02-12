import React from "react";
import Radio from '@material-ui/core/Radio';

import TextListAnswer from './components/TextListAnswer';

import './common.scss';

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

  answerType = (index) => {
    // Calculate what type of feedback the answer should display.
    if ( ! this.props.submitted || this.state.selectedAnswer !== index ) {
      return 'unselected';
    }

    if ( this.state.selectedAnswer === index && this.props.correct ) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  }

  render() {
    const answers = this.props.answers.map((answer, index) => {
      const selected = this.state.selectedAnswer === index;
      const answerType = this.answerType(index);

      return (
        <TextListAnswer
          key={index}
          answer={answer}
          selected={selected}
          type={answerType}
          onChangeAnswer={this.onChangeAnswer}
          submitted={this.props.submitted}
        >
          <Radio
            color='primary'
            checked={selected}
            onChange={() => this.onChangeAnswer(index)}
            disabled={this.props.submitted}
          />
        </TextListAnswer>
      );
    });

    return <ul className='answer-list'>{answers}</ul>;
  }
}

export default MultipleChoice;
