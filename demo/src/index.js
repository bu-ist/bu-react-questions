import React from 'react';
import { render } from 'react-dom';

import { Question } from '../../src';

import '../../src/Question.scss';

const trueFalseQuestionData = {
  type: 'true-false',
  header: 'Is the following statement true or false',
  body: 'The square root of 4 is 2',
  answers: [
    {
      answer: 'True',
      correct: true,
    },
    {
      answer: 'False',
      correct: false,
    },
  ],
  feedback: {
    correct: 'Wow, you are like a doctor or a rocket scientist!',
    incorrect: 'Are you a kindergarden dropout?',
  },
};

const multipleAnswerQuestionData = {
  type: 'multiple-answer',
  header: 'Please select all correct answers',
  body: 'How many toes can a two toed sloth have?',
  answers: [
    {
      answer: '6',
      feedback: 'You are correct! They some of them can have six.',
      correct: true,
    },
    {
      answer: '0',
      feedback: 'Nope, definitely more than that',
      correct: false,
    },
    {
      answer: '10',
      feedback: 'Nope, that is too many',
      correct: false,
    },
    {
      answer: '8',
      feedback: 'You are correct! They some of them can have eight.',
      correct: true,
    },
    {
      answer: '100',
      feedback: 'Really?',
      correct: false,
    },
  ],
  feedback: {
    correct: 'You picked all of the correct answers!',
    incorrect:
      'Sorry, see the feedback below your answers for why it was wrong.',
  },
};

const multipleChoiceQuestionData = {
  type: 'multiple-choice',
  header: 'Please select the correct answer',
  body: 'How many toes does a two toed sloth have?',
  answers: [
    {
      answer: 'None',
      feedback: 'Nope, definitely more than that',
      correct: false,
    },
    {
      answer: 'Ten',
      feedback: 'Nope, that is too many',
      correct: false,
    },
    {
      answer: 'Two',
      feedback: 'Nope, a little more than that.',
      correct: false,
    },
    {
      answer: 'Either six or eight',
      feedback:
        'You are correct! The name "two-toed sloth" erroneously describe the number of toes.',
      correct: true,
    },
    {
      answer: 'All of the above',
      feedback: 'Really?',
      correct: false,
    },
  ],
  feedback: {
    correct: 'You picked the correct answer!',
    incorrect:
      'You picked an incorrect answer, see the feedback below your answer for why it was wrong.',
  },
};

const calculatedNumericQuestionData = {
  type: 'calculated-numeric',
  header: 'Submit the correct answer:',
  body: 'What is the result of 1/3',
  answer: '0.333',
  answerRange: '0.001',
  decimalPlaces: '3',
  feedback: {
    correct: '1 divided by 3 is 0.333333333',
    incorrect: '1 divided by 3 is 0.333333333',
  },
};


const matchingQuestionData = {
  type: 'matching',
  header: 'Match the words',
  body: 'Match the word in Spanish to the corresponding word in English',
  answers: [
    {
      answer: 'abuela',
      feedback: 'grandmother',
      correct: true,
      order: 3,
    },
    {
      answer: 'comida',
      feedback: 'food',
      correct: true,
      order: 1,
    },
    {
      answer: 'manzana',
      feedback: 'apple',
      correct: true,
      order: 5,
    },
    {
      answer: 'cielo',
      feedback: 'sky',
      correct: true,
      order: 2,
    },
    {
      answer: 'mesa',
      feedback: 'table',
      correct: true,
      order: 4,
    },
  ],
  feedback: {
    correct: 'You picked all of the correct answers!',
    incorrect:
      'Sorry, you did not get all of them right.',
  },
};

function Demo() {
  return (
    <div>
      <h1>react-questions Demo</h1>
      <Question {...trueFalseQuestionData} />
      <Question {...multipleChoiceQuestionData} />
      <Question {...multipleAnswerQuestionData} />
      <Question {...calculatedNumericQuestionData} />
      <Question {...matchingQuestionData} />
    </div>
  );
}

render(<Demo />, document.querySelector('#demo'));
