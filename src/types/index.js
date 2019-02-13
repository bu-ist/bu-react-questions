import PropTypes from 'prop-types';

const questionData = {
  type: PropTypes.oneOf(['true-false', 'multiple-answer', 'multiple-choice', 'calculated-numeric']),
  header: PropTypes.node,
  body: PropTypes.node,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.node.isRequired,
      feedback: PropTypes.node,
      correct: PropTypes.bool,
    }),
  ),
  feedback: PropTypes.shape({
    correct: PropTypes.node,
    incorrect: PropTypes.node,
  }),
};

export default {
  questionData,
};
