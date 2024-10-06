import { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../card/CardComponent";
import { hiraganaData } from "../../HiraganaData";
import { katakanaData } from "../../KatakanaData";
import correct from "../../assets/correct.mp3";
import incorrect from "../../assets/incorrect.mp3";

function QuizGameComponent({quiz}){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scoreCount, setScoreCount] = useState(0);
    const [vocabList, setVocabList] = useState([]);
    const [kanjiList, setKanjiList] = useState([]);
    const [loadingKanji, setLoadingKanji] = useState(true);
    const [loadingVocab, setLoadingVocab] = useState(true);
    let currentQuestion = [];

    const fetchVocabData = async () => {
        try {
          const response = await axios.get('https://jlpt-vocab-api.vercel.app/api/words');
          setVocabList(response.data);
          setLoadingVocab(false)
        } catch (error) {
          console.error('Error fetching vocab data:', error); // Log errors
        }
      };
    
      const fetchKanjiData = async () => {
        try {
          const response = await axios.get('/kanji-wanikani.json');
          setKanjiList(response.data);
          setLoadingKanji(false)
        } catch (error) {
          console.error('Error fetching kanji data:', error); // Log errors
        }
      };
    
      useEffect(() => {
        fetchVocabData();
        fetchKanjiData();
      }, []);
    
      // Log kanjiList after it updates
    useEffect(() => {
    if (kanjiList && Object.keys(kanjiList).length > 0) {
        const filteredKanji = Object.entries(kanjiList).filter(
            ([key, value]) => value.jlpt_new === 5
        );
        }
    }, [kanjiList]); // Triggered when kanjiList changes

    if(quiz === "Hiragana"){
        let randomize = Math.floor(Math.random() * hiraganaData.length);
        currentQuestion = hiraganaData[randomize];
    }
    else if(quiz === "Katakana"){
        let randomize = Math.floor(Math.random() * katakanaData.length);
        currentQuestion = katakanaData[randomize];
    }
    else if(quiz === "Kanji")
    {   
        if (loadingKanji) return <h2>Loading...</h2>;
        const kanjiKeys = Object.keys(kanjiList); 
        let randomize = Math.floor(Math.random() * kanjiKeys.length);
        currentQuestion = kanjiKeys[randomize];
    }
    else if(quiz === "Vocabulary")
    {
        if (loadingKanji) return <h2>Loading...</h2>;
        let randomize = Math.floor(Math.random() * vocabList.words.length);
        currentQuestion = vocabList.words[randomize];
    }

    

    const correctSound = new Audio(correct);
    const incorrectSound = new Audio(incorrect);

    const handleOnSubmit = (userAnswer) => {
        if (userAnswer.toLowerCase() === (currentQuestion.romanji || currentQuestion.romaji).toLowerCase()) {
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
                <h2 style={{marginBottom:10}}>{quiz} Quiz</h2>
                <CardComponent question={currentQuestion} onSubmit={handleOnSubmit}/>
                <p>Score: {scoreCount}</p>
            </div>
        </>
        
    );
}
export default QuizGameComponent;

