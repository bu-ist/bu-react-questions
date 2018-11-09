import React from "react";

class TrueFalse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pristine: true,
      selectedAnswer: null,
      correct: null
    };
  }

  onChangeAnswer = index => {
    this.setState({
      pristine: false,
      selectedAnswer: index,
      correct: this.props.answers[index].correct
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
