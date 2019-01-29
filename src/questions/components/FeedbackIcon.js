import React from "react";
import CheckCircleRounded from '@material-ui/icons/CheckCircleRounded';
import CancelRounded from '@material-ui/icons/CancelRounded';

import '../common.scss';

class FeedbackIcon extends React.Component {
    render() {
      const feedback = this.props.answerFeedback;
  
      if (feedback === 'answer') {
        return null;
      }
  
      if (feedback === 'answerCorrect') {
        return <CheckCircleRounded className='feedbackIconCorrect'  />
      } else {
        return <CancelRounded className="feedbackIconIncorrect"  />
      }
    }
  }

  export default FeedbackIcon;