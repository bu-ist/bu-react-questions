import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DragIndicator from '@material-ui/icons/DragIndicator';
import CorrectIcon from '@material-ui/icons/CheckCircleRounded';
import IncorrectIcon from '@material-ui/icons/CancelRounded';

import Types from '../types';

import './common.scss';
import './Matching.scss';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({

  // change background colour if dragging
  background: isDragging ? '#f2f2f2' : '#dbdbdb',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#ededed' : '#f2f2f2',
});

class Matching extends React.Component {
  static propTypes = {
    answers: Types.questionData.answers.isRequired,
    submitted: PropTypes.bool,
    correct: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    submitted: false,
    correct: null,
    onChange: null,
  };

  constructor(props) {
    super(props);

    // Sort answers by initial order state, without mutating original array.
    const initialAnswersOrder = [...props.answers].sort((a, b) => (
      parseFloat(a.order) - parseFloat(b.order)
    ));

    this.state = {
      items: initialAnswersOrder,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { onChange } = this.props;
    const { items } = this.state;

    const pristine = false;

    // Check if answer is valid.
    const valid = true;

    onChange(pristine, valid);

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      items: newItems,
    });
  }

  isCorrect = () => {
    const { answers } = this.props;
    const { items } = this.state;

    // Compare the current item state with answer keys.
    const checkAnswers = answers.map((answer, index) => answer.order === items[index].order);

    // Check for false matches between current state and answer key.
    const correct = checkAnswers.every(x => x);

    return correct;
  };

  onChangeAnswer = () => {
    const { onChange } = this.props;

    const pristine = false;

    // Check if answer is valid.
    const valid = true;

    // Update question wrapper component state.
    onChange(pristine, valid);
  };

  answerClass = (answerCorrect) => {
    const { submitted } = this.props;

    if (!submitted) {
      return 'item';
    }

    if (answerCorrect) {
      return 'item-correct';
    }

    return 'item-incorrect';
  }

  render() {
    const { answers, submitted } = this.props;
    const { items } = this.state;

    // Calculate if individual answers are correct or not.
    const answersCorrect = items.map((item, index) => answers[index].order === item.order);

    return (
      <div className="matching-area">
        <PromptBox answers={answers} answersCorrect={answersCorrect} submitted={submitted} />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className="item-list"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable
                    key={item.answer}
                    draggableId={item.answer}
                    index={index}
                    isDragDisabled={submitted}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={this.answerClass(answersCorrect[index])}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        <DragIndicator className="drag-handle" />
                        {item.answer}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}

          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

function PromptBox(props) {
  const { answers, answersCorrect, submitted } = props;

  const items = answers.map((item, index) => {
    let icon = null;

    if (submitted && (answersCorrect[index])) {
      icon = <CorrectIcon className="feedback-icon-correct" />;
    } else if (submitted) {
      icon = <IncorrectIcon className="feedback-icon-incorrect" />;
    }

    return (
      <div className="item-prompt">
        {icon}
        {item.feedback}
      </div>
    );
  });

  return (
    <div className="item-list">{items}</div>
  );
}

PromptBox.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.node,
      feedback: PropTypes.node,
      order: PropTypes.number,
    }),
  ).isRequired,
};

export default Matching;
