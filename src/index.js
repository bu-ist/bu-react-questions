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
  </div>
);

render(<App />, document.getElementById("root"));
