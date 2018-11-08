import React from "react";
import { render } from "react-dom";
import { Question } from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h1>Hello React</h1>
    <Question
      data={{
        type: "true-false",
        header: "Is the following statement true or false",
        body: "The square root of 4 is 2",
        answers: [
          {
            answer: "True",
            feedback: "Wow, you are like a doctor or a rocket scientist!",
            correct: true
          },
          {
            answer: "False",
            feedback: "Are you a kindergarden dropout?",
            correct: false
          }
        ]
      }}
    />
  </div>
);

render(<App />, document.getElementById("root"));
