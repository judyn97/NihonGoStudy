import {useEffect} from 'react';
import './Button.css'

const LevelButton = ({level, setLevel, isActive}) => {

  const handleClick = e =>{ 
    e.preventDefault();
    const textSplit = level.split("");
    setLevel(textSplit[1])
    };

  return (
    <button className={`levelButton ${isActive ? 'active' : ''}`} onClick={handleClick}>
        {level}
    </button>
  )
}

export default LevelButton