import { useEffect, useRef, useState } from 'react';
import localStorageApi from '../localStoreApi'
import '../App.css'

export default function Header({ categoriesList, onSubmit, quote, errorMessage }) {
  const [correctScore, setCorrectScore] = useState(localStorageApi.getCorrectScore())
  const [incorrectScore, setIncorrectScore] = useState(localStorageApi.getIncorrectScore())
  const categoryRef = useRef()
  const difficultyRef = useRef()
  const sizeRef = useRef()
  const difficultyList = [{ id: 'any', name: 'Any' }, { id: 'easy', name: 'Easy' }, { id: 'medium', name: 'Medium' }, { id: 'hard', name: 'Hard' }]
  const sizeList = [{ id: 50, name: '50' }, { id: 25, name: '25' }, { id: 10, name: '10' }, { id: 5, name: '5' }, { id: 1, name: '1' }]

  useEffect(() => {
    const interval = setInterval(() => {
      setCorrectScore(localStorageApi.getCorrectScore());
      setIncorrectScore(localStorageApi.getIncorrectScore());
    }, 1000); // Check for updates every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  function handleSubmit(e) {
    e.preventDefault()

    const params = {
      amount: sizeRef.current.value,
      category: categoryRef.current.value,
    }

    const difficulty = difficultyRef.current.value;
    if (difficulty !== 'any') {
      params['difficulty'] = difficulty
    }

    onSubmit(params)
  }

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <div className='header-group'>
          <select ref={categoryRef} id="category">
            {
              categoriesList.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
            }
          </select>
        </div>

        <div className='header-group'>
          <select ref={difficultyRef} id="difficulty">
            {
              difficultyList.map(difficulty => <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>)
            }
          </select>

          <select ref={sizeRef} id="size">
            {
              sizeList.map(size => <option key={size.id} value={size.id}>{size.name}</option>)
            }
          </select>
        </div>

        <div className='header-group'>
          <button>Submit</button>
        </div>

        <div className='header-score'>
          <span>{`High Score: ${localStorageApi.getHighScore()}`}</span>
          <br />
          <span>{`(${correctScore}/${incorrectScore})`}</span>
        </div>

        <div className='header-quote'>
          <hr />
          <div className='quote'>
            <span>{quote.content}</span>
            <br />
            <span>- {quote.author}</span>
          </div>
        </div>

        { errorMessage && <div className='header-error-msg'>
          <span style={{textDecoration: "underline"}}>Error</span>: {errorMessage}
        </div>}
      </form>
    </header>
  )
}
