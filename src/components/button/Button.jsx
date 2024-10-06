import {useEffect} from 'react';
import './Button.css'

const Button = ({name, setQuiz}) => {

  const handleClick = () => setQuiz(name);
  
  return (
    <button onClick={handleClick}>
        {name}
    </button>
  )
}

export default Button