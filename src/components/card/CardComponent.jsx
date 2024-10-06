import { useState } from "react";
function CardComponent(props){
    const [inputValue, setInputValue] = useState("");
 
    const handleOnChangeInput = (event) =>
    {   event.preventDefault();
        props.onSubmit(inputValue);
        setInputValue('');
    }
    return(
        <>
            <form onSubmit={handleOnChangeInput} >
                <h3 style={{fontSize: 95, marginBottom:10}}>{props.question.hiragana}</h3>
                <input placeholder="Input answer here" style={{marginBottom:10}} value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
            </form>
        </>
    );
}
export default CardComponent;

