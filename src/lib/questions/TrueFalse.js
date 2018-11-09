import React from "react";

class TrueFalse extends React.Component {
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
    this.setState({
      pristine: false,
      selectedAnswer: index
    });
    this.props.onChange();
  };

  renderAnswers = () => {
    const answers = this.props.answers.map((answer, index) => {
      return (
        <li key={index}>
          <input
            type="radio"
            checked={this.state.selectedAnswer === index}
            onChange={() => this.onChangeAnswer(index)}
          />{" "}
          {answer.answer}
        </li>
      );
    });
    return answers;
  };

  render() {
    return <ul>{this.renderAnswers()}</ul>;
  }
}

export default TrueFalse;
