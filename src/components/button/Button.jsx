import {useEffect} from 'react';
import './Button.css'

const Button = ({name, setQuiz, isActive}) => {

  const handleClick = () => setQuiz(name);
  
  return (
    <button className={`quizButton ${isActive ? 'active' : ''}`} onClick={handleClick}>
        {name}
    </button>
  )
}

export default Button