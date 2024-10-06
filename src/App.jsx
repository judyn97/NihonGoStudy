import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import QuizGameComponent from "./components/quizgame/QuizGameComponent";
import { useState } from "react";
import './App.css';

function App() {
  const [quiz, setQuiz] = useState('');
  return(
    <div className="App">
      <Header setQuiz={setQuiz}/>
      <div className="MainBody">
        <QuizGameComponent quiz={quiz}/>
      </div>
      <Footer/>
    </div>
  );
}

export default App
