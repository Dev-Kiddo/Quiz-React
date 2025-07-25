import React from "react";

const Progress = ({ index, numQuestions, points, maxPoints, answer }) => {
  console.log(index, numQuestions);

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index}</strong>/<strong>{numQuestions}</strong>
      </p>
      <p>
        <strong>{points}</strong>/ <strong>{maxPoints}</strong>
      </p>
    </header>
  );
};

export default Progress;
