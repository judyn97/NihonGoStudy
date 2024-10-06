import './Header.css';
import Button from '../button/Button.jsx';

function Header(){

    return(
        <header className="Header">
            <h1>PIDISHI NIHONGO BENKYOU !</h1>
            <nav>
                    <Button name={"Hiragana"}/>
                    <Button name={"Katakana"}/>
                    <Button name={"Kanji"}/>
                    <Button name={"Vocabulary"}/>
            </nav>
            <hr></hr>
        </header>
    );
}

export default Header;