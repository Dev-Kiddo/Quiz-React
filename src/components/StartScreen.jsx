import React from "react";

const StartScreen = ({ numQuestions, onHandleStart }) => {
  return (
    <>
      <div className="start">
        <h2>Welcome to the React Quiz!</h2>
        <h3>{numQuestions} questions to test your React mastery</h3>
        <button className="btn btn-ui" onClick={onHandleStart}>
          Let's Start
        </button>
      </div>
    </>
  );
};

export default StartScreen;
