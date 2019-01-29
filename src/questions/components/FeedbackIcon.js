import React from "react";
import CheckCircleRounded from '@material-ui/icons/CheckCircleRounded';
import CancelRounded from '@material-ui/icons/CancelRounded';

class FeedbackIcon extends React.Component {
    render() {
  
      if (this.props.show === 'answer') {
        return (null);
      }
  
      if (this.props.show === 'answerCorrect') {
        return <CheckCircleRounded className='feedbackIconCorrect'  />
      } else {
        return <CancelRounded className="feedbackIconIncorrect"  />
      }
  
    }
  }

  export default FeedbackIcon;