import './Header.css';
import Button from '../button/Button.jsx';

function Header({quiz, setQuiz}){

    return(
        <header className="Header">
            <h1>PIDISHI NIHONGO BENKYOU !</h1>
            <nav>
                    <Button name={"Hiragana"} setQuiz={setQuiz} isActive={quiz === 'Hiragana'}/>
                    <Button name={"Katakana"} setQuiz={setQuiz} isActive={quiz === 'Katakana'}/>
                    <Button name={"Kanji"} setQuiz={setQuiz} isActive={quiz === 'Kanji'}/>
                    <Button name={"Vocabulary"} setQuiz={setQuiz} isActive={quiz === 'Vocabulary'}/>
            </nav>
            <hr></hr>
        </header>
    );
}

export default Header;