import React from "react";
import CorrectIcon from '@material-ui/icons/CheckCircleRounded';
import IncorrectIcon from '@material-ui/icons/CancelRounded';

import '../common.scss';

class TextListAnswer extends React.Component {

  render() {
    const answer = this.props.answer;
    const type = this.props.type;

    let style = 'answer';
    let icon = null;

    if (type === 'correct') {
      style = 'answer-correct';
      icon = <CorrectIcon className='feedback-icon-correct' />;
    } else if (type === 'incorrect') {
      style = 'answer-incorrect';
      icon = <IncorrectIcon className='feedback-icon-incorrect' />;
    }

    return(
      <li>
        {icon}
        <div className={style}>
          {this.props.children}{" "}
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

export default TextListAnswer;