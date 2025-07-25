import React from "react";

const FinishScreen = ({ points, maxPoints }) => {
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
    <p className="result">
      <span>{emoji}</span>You scored <strong>{points} </strong> out of {maxPoints} ({Math.ceil(percentage)}%)
    </p>
  );
};

export default FinishScreen;
