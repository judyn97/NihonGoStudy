import { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../card/CardComponent";
import LevelButton from "../button/LevelButton";
import { hiraganaData } from "../../HiraganaData";
import { katakanaData } from "../../KatakanaData";
import correct from "../../assets/correct.mp3";
import incorrect from "../../assets/incorrect.mp3";

function QuizGameComponent({quiz}){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scoreCount, setScoreCount] = useState(0);
    const [vocabList, setVocabList] = useState([]);
    const [kanjiList, setKanjiList] = useState([]);
    const [filteredKanji, setFilteredKanjiList] = useState([]);
    const [filteredVocab, setFilteredVocabList] = useState([]);
    const [loadingKanji, setLoadingKanji] = useState(true);
    const [loadingVocab, setLoadingVocab] = useState(true);
    const [level, setLevel] = useState('');
    let currentQuestion = [];

    const fetchVocabData = async () => {
        try {
          const response = await axios.get('https://jlpt-vocab-api.vercel.app/api/words/all');
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
    if (kanjiList && Object.keys(kanjiList).length > 0 && level) {
        const filtered = Object.entries(kanjiList).filter(
          ([key, value]) => value.jlpt_new === parseInt(level)
        );
        setFilteredKanjiList(filtered);
        }
    }, [level, kanjiList]); // Triggered when kanjiList and level changes

    useEffect(() => {
        if(vocabList && vocabList.length > 0 && level){
            const filtered = vocabList.filter(vocab => vocab.level === parseInt(level));
            setFilteredVocabList(filtered);
        }
      }, [level, vocabList]);

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
        if (filteredKanji.length > 0) {
          let randomize = Math.floor(Math.random() * filteredKanji.length);
          currentQuestion = filteredKanji[randomize][0];
        } else {
          currentQuestion = "No data";
        }
    }
    else if(quiz === "Vocabulary")
    {
        if (loadingVocab) return <h2>Loading...</h2>;
        if (filteredVocab.length > 0) {
        let randomize = Math.floor(Math.random() * vocabList.length);
        currentQuestion = vocabList[randomize];
        } else{
            currentQuestion = "No data";
        }
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
            {
            quiz === '' ? <h2> Choose a quiz by clicking the button above to start ! </h2> :
            (quiz === 'Kanji' || quiz === 'Vocabulary') ? 
            <div className="QuizCard">  
                <h2 style={{marginBottom:10}}>{quiz} Quiz</h2>
                <LevelButton level="N5" setLevel={setLevel} isActive={level === '5'}/>
                <LevelButton level="N4" setLevel={setLevel} isActive={level === '4'}/>
                <LevelButton level="N3" setLevel={setLevel} isActive={level === '3'}/>
                <LevelButton level="N2" setLevel={setLevel} isActive={level === '2'}/>
                <LevelButton level="N1" setLevel={setLevel} isActive={level === '1'}/>
                {currentQuestion === "No data" ? <h2 style={{marginTop: 30}}>Select N Level</h2> : 
                <>
                <CardComponent question={currentQuestion} onSubmit={handleOnSubmit}/>
                <p>Score: {scoreCount}</p>
                </>
                }
            </div>
            :
            <div className="QuizCard">  
                
                <h2 style={{marginBottom:10}}>{quiz} Quiz</h2>
                <CardComponent question={currentQuestion} onSubmit={handleOnSubmit}/>
                <p>Score: {scoreCount}</p>
            </div>
            }
        </>
        
    );
}
export default QuizGameComponent;

