import React from "react";
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
    return this.props.answers[this.state.selectedAnswer].correct;
  };

  onChangeAnswer = index => {
    const pristine = false;

    // Check if answer is valid.
    const valid = true;

    // Update component state.
    this.setState({
      pristine,
      selectedAnswer: index,
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
      const answerType = this.answerType(index);

      const formControl = <Radio
        color='primary'
        checked={this.state.selectedAnswer === index}
        onChange={() => this.onChangeAnswer(index)}
        disabled={this.props.submitted}
      />

      return (
        <TextListAnswer 
          key={index}
          answer={answer}
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

export default TrueFalse;
