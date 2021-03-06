import React from 'react';
import PropTypes from 'prop-types';
import Types from '../types';

class CalculatedNumeric extends React.Component {
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
      valid: null,
      errors: [],
      answer: '',
    };
  }

  isFloat = (str) => {
    const floatRegExp = new RegExp(/^[-+]?[0-9]*\.?[0-9]*$/);

    if (str !== '') {
      if (floatRegExp.test(str)) {
        return true;
      }
    }

    return false;
  };

  isCorrectNumDecimalPlaces = (str, decimalPlacesAllowed) => {
    try {
      let decimalPlaces = 0;
      const splitOnPeriods = str.split('.');
      if (splitOnPeriods.length === 2) {
        decimalPlaces = splitOnPeriods[1].length;
      }
      return decimalPlaces === parseInt(decimalPlacesAllowed, 10);
    } catch (error) {
      return false;
    }
  };

  validateAnswer = (answer) => {
    const { decimalPlaces } = this.props;

    const errors = [];
    if (!this.isFloat(answer)) {
      errors.push('Invalid');
    } else if (
      !this.isCorrectNumDecimalPlaces(answer, decimalPlaces)
    ) {
      errors.push(
        `Please make sure your answer has ${
          decimalPlaces
        } decimal places`,
      );
    }
    return errors;
  };

  isCorrect = () => {
    const { answer, answerRange } = this.props;
    const { answer: submittedAnswer } = this.state;

    const errors = this.validateAnswer(submittedAnswer);

    // Abort check if there are errors.
    if (errors.length > 0) {
      this.setState({ errors });
      return null;
    }

    const min = parseFloat(answer) - parseFloat(answerRange);
    const max = parseFloat(answer) + parseFloat(answerRange);

    if (submittedAnswer >= min && submittedAnswer <= max) {
      return true;
    }
    return false;
  };

  onChangeAnswer = (answer) => {
    const { onChange } = this.props;

    const pristine = false;

    // Check if answer is valid.
    const errors = this.validateAnswer(answer);
    const valid = errors.length === 0;

    // Update component state.
    this.setState({
      valid,
      errors,
      answer,
    });

    // Update question wrapper component state.
    onChange(pristine, valid);
  };

  render() {
    const { valid, errors, answer } = this.state;

    return (
      <div>
        <input
          type="text"
          value={answer}
          placeholder="Enter answer here"
          onChange={event => this.onChangeAnswer(event.target.value)}
        />
        {!valid && (
          <div>
            <ul>
              {errors.map((error, index) => (
                // There is only ever going to be one error, so accept array index as key.
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {valid}
      </div>
    );
  }
}

export default CalculatedNumeric;
