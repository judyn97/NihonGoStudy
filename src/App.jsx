import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import QuizGameComponent from "./components/quizgame/QuizGameComponent";

import './App.css';

function App() {
  return(
    <div className="App">
      <Header/>
      <div className="MainBody">
        <QuizGameComponent/>
      </div>
      <Footer/>
    </div>
  );
}

export default App
