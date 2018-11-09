import React from "react";

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
    let newSelectedAnswers;

    if (this.state.selectedAnswers.includes(index)) {
      newSelectedAnswers = this.state.selectedAnswers.filter(i => i !== index);
    } else {
      newSelectedAnswers = [...this.state.selectedAnswers, index];
    }

    this.setState({
      pristine: false,
      selectedAnswers: newSelectedAnswers
    });
    this.props.onChange();
  };

  renderAnswers = () => {
    const answers = this.props.answers.map((answer, index) => {
      return (
        <li key={index}>
          <div className={`${this.constructor.name}__answer`}>
            <input
              type="checkbox"
              checked={this.state.selectedAnswers.includes(index)}
              onChange={() => this.onChangeAnswer(index)}
            />{" "}
            {answer.answer}
          </div>
          {this.props.submitted && (
            <div className={`${this.constructor.name}__feedback`}>
              {answer.feedback}
            </div>
          )}
        </li>
      );
    });
    return answers;
  };

  render() {
    return <ul>{this.renderAnswers()}</ul>;
  }
}

export default MultipleAnswer;
