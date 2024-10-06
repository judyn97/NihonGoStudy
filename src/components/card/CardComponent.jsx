import { useState } from "react";
function CardComponent({question, onSubmit}){
    const [inputValue, setInputValue] = useState("");
 
    const handleOnChangeInput = (event) =>
    {   event.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
    }
    return(
        <>
            <form onSubmit={handleOnChangeInput} >
                <h3 style={{fontSize: 185, marginBottom:10}}>{question.hiragana || question.kana || question.furigana || question.word || question}</h3>
                <input placeholder="Input answer here" style={{marginBottom:10}} value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
            </form>
        </>
    );
}
export default CardComponent;

