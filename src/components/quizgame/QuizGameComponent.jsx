import { useState } from "react";
import CardComponent from "../card/CardComponent";
import { hiraganaData } from "../../HiraganaData";
import correct from "../../assets/correct.mp3";
import incorrect from "../../assets/incorrect.mp3";
let test = [];
function QuizGameComponent(){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scoreCount, setScoreCount] = useState(0);

    let randomizer = Math.floor(Math.random() * hiraganaData.length);
    const currentQuestion = hiraganaData[randomizer];

    test.push(currentQuestion);
    console.log(test);

    const correctSound = new Audio(correct);
    const incorrectSound = new Audio(incorrect);

    const handleOnSubmit = (userAnswer) => {
        if (userAnswer === currentQuestion.romanji.toLowerCase()) {
            correctSound.play();
            
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setScoreCount(scoreCount + 1);
        }
        else{
            incorrectSound.play();
        }
    }

    return(
        <>
            <div className="QuizCard">  
                <h2 style={{marginBottom:10}}>Hiragana Quiz</h2>
                <CardComponent question={currentQuestion} onSubmit={handleOnSubmit}/>
                <p>Score: {scoreCount}</p>
            </div>
        </>
        
    );
}
export default QuizGameComponent;

