import React from 'react';
import PropTypes from 'prop-types';
import Types from '../types';

class FillInTheBlank extends React.Component {
  static propTypes = {
    answer: Types.questionData.answer.isRequired,
    answerRange: PropTypes.string,
    decimalPlaces: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    answerRange: '0',
    decimalPlaces: '0',
    onChange: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      valid: null,
    };
  }

  validateAnswer = (answer) => {
    const errors = [];
    if (answer === '') {
      errors.push('Please enter an answer');
    }

    return errors;
  };

  isCorrect = () => {
    const { answer } = this.props;
    const { answer: submittedAnswer } = this.state;

    if (submittedAnswer === answer) {
      return true;
    }
    return false;
  };

  onChangeAnswer = (answer) => {
    const { onChange } = this.props;

    const pristine = false;

    // Any answer is valid, so pass true to the wrapper component.
    const valid = true;

    // Update component state.
    this.setState({
      valid,
      answer,
    });

    // Update question wrapper component state.
    onChange(pristine, valid);
  };

  render() {
    const { answer } = this.state;

    return (
      <div>
        <input
          type="text"
          value={answer}
          placeholder="Enter answer here"
          onChange={event => this.onChangeAnswer(event.target.value)}
        />
        <div><ul /></div>
      </div>
    );
  }
}

export default FillInTheBlank;
