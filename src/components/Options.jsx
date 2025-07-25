import React from "react";

const Options = ({ questions, handleAnswer, answer }) => {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {questions.options.map((options, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? (index === questions.correctOption ? "correct" : "wrong") : ""}`}
          key={options}
          disabled={answer !== null}
          onClick={() => handleAnswer(index)}
        >
          {options}
        </button>
      ))}
    </div>
  );
};

export default Options;
