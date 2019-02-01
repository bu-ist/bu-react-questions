import React from "react";
import CheckCircleRounded from '@material-ui/icons/CheckCircleRounded';
import CancelRounded from '@material-ui/icons/CancelRounded';

import '../common.scss';

const CorrectIcon = CheckCircleRounded;
const IncorrectIcon = CancelRounded;

class TextListAnswer extends React.Component {

  render() {
    const answer = this.props.answer;
    const type = this.props.type;
    const formControl = this.props.formControl

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
          {formControl}{" "}
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