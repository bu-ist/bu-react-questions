import React from "react";
import PropTypes from 'prop-types';

class CalculatedNumeric extends React.Component {
  static propTypes = {
    answer: PropTypes.string.isRequired,
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
      pristine: true,
      valid: null,
      errors: [],
      answer: ""
    };
  }

  isFloat = str => {
    const floatRegExp = new RegExp(/^[-+]?[0-9]*\.?[0-9]*$/);

    if (str !== "") {
      if (floatRegExp.test(str)) {
        return true;
      }
    }

    return false;
  };

  isCorrectNumDecimalPlaces = (str, decimalPlacesAllowed) => {
    try {
      let decimalPlaces = 0;
      const splitOnPeriods = str.split(".");
      if (splitOnPeriods.length === 2) {
        decimalPlaces = splitOnPeriods[1].length;
      }
      return decimalPlaces === parseInt(decimalPlacesAllowed);
    } catch (error) {
      return false;
    }
  };

  validateAnswer = answer => {
    let errors = [];
    if (!this.isFloat(answer)) {
      errors.push("Invalid");
    } else if (
      !this.isCorrectNumDecimalPlaces(answer, this.props.decimalPlaces)
    ) {
      errors.push(
        `Please make sure your answer has ${
          this.props.decimalPlaces
        } decimal places`
      );
    }
    return errors;
  };

  isCorrect = () => {
    const { answer, answerRange } = this.props;
    const submittedAnswer = this.state.answer;

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

  onChangeAnswer = answer => {
    const pristine = false;

    // Check if answer is valid.
    const errors = this.validateAnswer(answer);
    const valid = errors.length === 0;

    // Update component state.
    this.setState({
      pristine,
      valid,
      errors,
      answer
    });

    // Update question wrapper component state.
    this.props.onChange(pristine, valid);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.answer}
          placeholder="Enter answer here"
          onChange={event => this.onChangeAnswer(event.target.value)}
        />
        {!this.state.valid && (
          <div>
            <ul>
              {this.state.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {this.state.valid}
      </div>
    );
  }
}

export default CalculatedNumeric;
