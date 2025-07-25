import React from "react";
import Options from "./Options";
import Progress from "./Progress";

export const Ques = ({ index, numQuestions, questions, handleNext, handleAnswer, answer, points, maxPoints, onFinish }) => {
  console.log(questions);
  const hasAnswered = answer === null;

  const hideNextBtn = index < numQuestions - 1;

  return (
    <main className="main">
      <Progress numQuestions={numQuestions} index={index} points={points} maxPoints={maxPoints} answer={answer} />
      <h4>{questions.question}</h4>
      <Options questions={questions} handleAnswer={handleAnswer} answer={answer} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="btn">07.20</button>
        {!hasAnswered &&
          (hideNextBtn ? (
            <button className="btn btn-ui" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="btn btn-ui" onClick={onFinish}>
              Finish
            </button>
          ))}
      </div>
    </main>
  );
};
