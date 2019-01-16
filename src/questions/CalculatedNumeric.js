import React from "react";

class CalculatedNumeric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pristine: true,
      valid: null,
      errors: [],
      answer: ""
    };
  }

  i18nFloat(str) {
    // Replace commas with period.
    const commaLess = str.replace(/,/g, ".");
    // Remove all periods minus the last one.
    const splitOnPeriods = commaLess.split(".");
    const i18nFloat =
      splitOnPeriods.slice(0, -1).join("") +
      "." +
      splitOnPeriods[splitOnPeriods.length - 1];

    return i18nFloat;
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

  isCorrectNumDecimalPlaces = (str, decimalPlaces) => {
    try {
      const decimals = str.split(".")[1];
      return decimals.length === parseInt(decimalPlaces);
    } catch (error) {
      return false;
    }
  };

  validateAnswer = answer => {
    const i18nFloat = this.i18nFloat(answer);
    let errors = [];
    if (!this.isFloat(i18nFloat)) {
      errors.push("Invalid");
    } else if (
      !this.isCorrectNumDecimalPlaces(i18nFloat, this.props.decimalPlaces)
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

    const floatAnswer = this.i18nFloat(submittedAnswer);

    const min = parseFloat(answer) - parseFloat(answerRange);
    const max = parseFloat(answer) + parseFloat(answerRange);

    if (floatAnswer >= min && floatAnswer <= max) {
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