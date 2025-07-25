import React, { useEffect } from "react";
import Options from "./Options";
import Progress from "./Progress";

export const Ques = ({ index, numQuestions, questions, handleNext, handleAnswer, answer, points, maxPoints, onFinish, secondsRemaining, handleTimer }) => {
  const hasAnswered = answer === null;

  const hideNextBtn = index < numQuestions - 1;

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      handleTimer();
    }, 1000);

    return () => clearInterval(id);
  }, [handleTimer]);

  return (
    <main className="main">
      <Progress numQuestions={numQuestions} index={index} points={points} maxPoints={maxPoints} answer={answer} />
      <h4>{questions.question}</h4>
      <Options questions={questions} handleAnswer={handleAnswer} answer={answer} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="timer">
          {mins < 10 && "0"}
          {mins}: {seconds < 10 && "0"}
          {seconds}
        </div>
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
