import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
    this.state = {
      items: props.answers,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      items,
    });
  }

  isCorrect = () => {
    const { answers } = this.props;
    const { selectedAnswer } = this.state;

    return answers[selectedAnswer].correct;
  };

  onChangeAnswer = (index) => {
    const { onChange } = this.props;

    const pristine = false;

    // Check if answer is valid.
    const valid = true;

    // Update component state.
    this.setState({
      pristine,
      selectedAnswer: index,
    });

    // Update question wrapper component state.
    onChange(pristine, valid);
  };

  answerType = (index) => {
    const { submitted, correct } = this.props;
    const { selectedAnswer } = this.state;

    // Calculate what type of feedback the answer should display.
    if (!submitted || selectedAnswer !== index) {
      return 'unselected';
    }

    if ((selectedAnswer === index) && correct) {
      return 'correct';
    }

    return 'incorrect';
  }

  render() {
    const { answers, submitted } = this.props;
    const { selectedAnswer } = this.state;

    return (
      <div className="matching-area">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className="item-list"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.answer} draggableId={item.answer} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
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

export default Matching;
