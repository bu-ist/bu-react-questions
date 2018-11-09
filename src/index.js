import React from "react";
import { render } from "react-dom";
import { Question } from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h1>React Questions</h1>
    <Question
      questionData={{
        type: "true-false",
        header: "Is the following statement true or false",
        body: "The square root of 4 is 2",
        answers: [
          {
            answer: "True",
            correct: true
          },
          {
            answer: "False",
            correct: false
          }
        ],
        correctFeedback: "Wow, you are like a doctor or a rocket scientist!",
        incorrectFeedback: "Are you a kindergarden dropout?"
      }}
    />
    <Question
      questionData={{
        type: "multiple-choice",
        header: "Please select the correct answer",
        body: "How many toes does a two toed sloth have?",
        answers: [
          {
            answer: "None",
            feedback: "Nope, definitely more than that",
            correct: false
          },
          {
            answer: "Ten",
            feedback: "Nope, that is too many",
            correct: false
          },
          {
            answer: "Two",
            feedback: "Nope, a little more than that.",
            correct: false
          },
          {
            answer: "Either six or eight",
            feedback:
              'You are correct! The name "two-toed sloth" erroneously describe the number of toes.',
            correct: true
          },
          {
            answer: "All of the above",
            feedback: "Really?",
            correct: false
          }
        ],
        correctFeedback: "You picked the correct answer!",
        incorrectFeedback:
          "You picked an incorrect answer, see the feedback below your answer for why it was wrong."
      }}
    />
  </div>
);

render(<App />, document.getElementById("root"));
