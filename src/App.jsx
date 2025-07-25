import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import { Ques } from "./components/Ques.jsx";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import StartScreen from "./components/StartScreen.jsx";
import FinishScreen from "./components/FinishScreen.jsx";

const SECS_PER_QUIZZ = 30;

const initialState = {
  questions: [],

  // Loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducerFn(state, action) {
  switch (action.type) {
    case "dataReceived": {
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    }

    case "dataFailed": {
      return {
        ...state,
        status: "error",
      };
    }

    case "startBtn": {
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUIZZ,
      };
    }

    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    }

    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }

    case "finished": {
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };
    }

    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };

    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default: {
      throw new Error("Action Unknown");
    }
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducerFn, initialState);

  const numQuestions = questions.length;

  const maxPoints = questions.reduce((perv, cur) => perv + cur.points, 0);

  function handleStart(e) {
    e.preventDefault;
    dispatch({ type: "startBtn" });
  }

  function handleAnswer(answer) {
    dispatch({ type: "newAnswer", payload: answer });
  }

  function handleNext(e) {
    e.preventDefault;
    dispatch({ type: "nextQuestion" });
    // dispatch({ type: "finished" });
  }

  function handleFinish(e) {
    e.preventDefault;
    dispatch({ type: "finished" });
  }

  function handleRestart(e) {
    e.preventDefault;
    dispatch({ type: "restart" });
  }

  function handleTimer() {
    dispatch({ type: "timer" });
  }

  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:8000/questions")
        .then((response) => response.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((error) => {
          console.error(error);
          return dispatch({ type: "dataFailed" });
        });
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />

      <main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <>
            <StartScreen numQuestions={numQuestions} onHandleStart={handleStart} />
          </>
        )}
        {status === "active" && (
          <Ques
            numQuestions={numQuestions}
            index={index}
            points={points}
            questions={questions[index]}
            handleNext={handleNext}
            handleAnswer={handleAnswer}
            answer={answer}
            maxPoints={maxPoints}
            onFinish={handleFinish}
            secondsRemaining={secondsRemaining}
            handleTimer={handleTimer}
          />
        )}

        {status === "finished" && (
          <>
            <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} onRestart={handleRestart} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
