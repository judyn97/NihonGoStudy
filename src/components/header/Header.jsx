import './Header.css';
import Button from '../button/Button.jsx';

function Header({setQuiz}){

    return(
        <header className="Header">
            <h1>PIDISHI NIHONGO BENKYOU !</h1>
            <nav>
                    <Button name={"Hiragana"} setQuiz={setQuiz}/>
                    <Button name={"Katakana"} setQuiz={setQuiz}/>
                    <Button name={"Kanji"} setQuiz={setQuiz}/>
                    <Button name={"Vocabulary"} setQuiz={setQuiz}/>
            </nav>
            <hr></hr>
        </header>
    );
}

export default Header;