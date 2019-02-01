import React from "react";
import Checkbox from '@material-ui/core/Checkbox';

import CheckCircleRounded from '@material-ui/icons/CheckCircleRounded';
import CancelRounded from '@material-ui/icons/CancelRounded';

import './common.scss';

const CorrectIcon = CheckCircleRounded;
const IncorrectIcon = CancelRounded;

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
    // Return the correct CSS class for the current state.
    const correct = this.props.answers[index].correct;

    if ( ! this.props.submitted || ! (this.state.selectedAnswers.includes(index) || correct ) ) {
      // Default style with no feedback required.
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

      return (
        <Answer 
          key={index}
          index={index} 
          answer={answer}
          selected={selected}
          type={answerType}
          onChangeAnswer={this.onChangeAnswer}
          submitted={this.props.submitted}
        />
      );
    });

    return <ul className='answerList'>{answers}</ul>;
  }
}

class Answer extends React.Component {

  render() {
    const answer = this.props.answer;
    const type = this.props.type;

    let style = 'answer';
    let icon = null;

    if (type === 'correct') {
      style = 'answerCorrect';
      icon = <CorrectIcon className='feedbackIconCorrect' />;
    } else if (type === 'incorrect') {
      style = 'answerIncorrect';
      icon = <IncorrectIcon className='feedbackIconIncorrect' />;
    }

    return(
      <li>
        {icon}
        <div className={style}>
          <Checkbox
            color='primary'
            checked={this.props.selected}
            onChange={() => this.props.onChangeAnswer(this.props.index)}
            disabled={this.props.submitted}
          />{" "}
          {answer.answer}
        </div>
        {this.props.submitted &&  (
          <div className='feedback'>
            {answer.feedback}
          </div>
        )}
      </li>
    );
  }
}

export default MultipleAnswer;
