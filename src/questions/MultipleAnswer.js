import React from "react";
import Checkbox from '@material-ui/core/Checkbox';

import TextListAnswer from './components/TextListAnswer';

import './common.scss';

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

  answerType = (index) => {
    // Calculate what type of feedback the answer should display.
    const correct = this.props.answers[index].correct;

    if ( ! this.props.submitted || ! (this.state.selectedAnswers.includes(index) || correct ) ) {
      return 'unselected';
    }

    if ( this.state.selectedAnswers.includes(index) && correct ) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  }

  render() {
    const answers = this.props.answers.map((answer, index) => {
      const selected = this.state.selectedAnswers.includes(index);
      const answerType = this.answerType(index);

      // Different question types use different form controls, so pass the form control as a prop.
      const formControl = <Checkbox
        color='primary'
        checked={selected}
        onChange={() => this.onChangeAnswer(index)}
        disabled={this.props.submitted}
      />

      return (
        <TextListAnswer 
          key={index}
          answer={answer}
          selected={selected}
          type={answerType}
          onChangeAnswer={this.onChangeAnswer}
          submitted={this.props.submitted}
          formControl={formControl}
        />
      );
    });

    return <ul className='answerList'>{answers}</ul>;
  }
}

export default MultipleAnswer;
