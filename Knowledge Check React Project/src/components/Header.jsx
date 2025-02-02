import { useEffect, useRef, useState } from 'react';
import storageApi from '../storageApi'
import '../App.css'

export default function Header({ categoriesList, onSubmit, quote, errorMessage }) {
  const [correctScore, setCorrectScore] = useState(storageApi.getCorrectScore())
  const [incorrectScore, setIncorrectScore] = useState(storageApi.getIncorrectScore())
  const categoryRef = useRef()
  const difficultyRef = useRef()
  const sizeRef = useRef()
  const difficultyList = [{ id: 'any', name: 'Any' }, { id: 'easy', name: 'Easy' }, { id: 'medium', name: 'Medium' }, { id: 'hard', name: 'Hard' }]
  const sizeList = [{ id: 50, name: '50' }, { id: 25, name: '25' }, { id: 10, name: '10' }, { id: 5, name: '5' }, { id: 1, name: '1' }]

  useEffect(() => {
    const onStorageChange = () => {
      setCorrectScore(storageApi.getCorrectScore());
      setIncorrectScore(storageApi.getIncorrectScore());
    };

    // Binding onStorageChange function with the event
    window.addEventListener(storageApi.getStorageEventConstant(), onStorageChange)

    return () => window.removeEventListener(storageApi.getStorageEventConstant(), onStorageChange) // Cleanup
  }, []);

  function handleSubmit(e) {
    e.preventDefault()

    const params = {
      amount: sizeRef.current.value,
      category: categoryRef.current.value,
    }

    const difficulty = difficultyRef.current.value
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
          <span>{`High Score: ${storageApi.getHighScore()}`}</span>
          <br />
          <span>{`(${correctScore}/${incorrectScore})`}</span>
        </div>

        <div className='header-quote'>
          <hr />
          <div className='quote'>
            <span>{quote.content}</span>
            <br />
            <span style={{ "fontWeight": "bold" }}>- {quote.author}</span>
          </div>
        </div>

        {errorMessage && <div className='header-error-msg'>
          <span style={{ textDecoration: "underline", fontWeight: "bold" }}
          >Error</span><span>: {errorMessage}</span>
        </div>}
      </form>
    </header>
  )
}
