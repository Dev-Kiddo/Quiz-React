import React from "react";

const FinishScreen = ({ points, maxPoints, highscore, onRestart }) => {
  const percentage = (points / maxPoints) * 100;
  let emoji;

  if (percentage === 100) {
    emoji = "🥇";
  }

  if (percentage >= 70 && percentage < 100) {
    emoji = "🥳";
  }

  if (percentage >= 20 && percentage < 70) {
    emoji = "🎉";
  }

  if (percentage >= 0 && percentage < 20) {
    emoji = "🤦";
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points} </strong> out of {maxPoints} ({Math.ceil(percentage)}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>

      <button className="btn btn-ui" onClick={onRestart}>
        Restart
      </button>
    </>
  );
};

export default FinishScreen;
