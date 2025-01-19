
import { useEffect, useState } from 'react'
import localStoreApi from '../localStoreApi'
import '../App.css'

export default function Card({ card }) {
  const [answerState, setAnswerState] = useState('')
  const [cursor, setCursor] = useState('pointer')

  useEffect(() => {
    if (answerState === 'card-correct') {
      const correctScore = localStoreApi.getCorrectScore() + 1
      const highScore = localStoreApi.getHighScore()

      localStoreApi.setCorrectScore(correctScore)

      if (correctScore > highScore) {
        localStoreApi.setHighScore(correctScore)
      }
    } else if (answerState === 'card-incorrect') {
      const correctScore = localStoreApi.getIncorrectScore() + 1

      localStoreApi.setIncorrectScore(correctScore)
    }
  }, [answerState])

  function handleClick(e) {
    if (e.target.value === card.correct_answer) {
      setCursor('default')
      setAnswerState(() => 'card-correct')
    } else {
      setCursor('default')
      setAnswerState(() => 'card-incorrect')
    }
  }

  return (
    <div className={'card ' + answerState}>
      <div className='card-question'>
        {(!card.isError) ? card.index : '*'}.&nbsp;{card.question}
      </div>
      <div className='card-options '>
        <ul>
          {
            card.options.map(option => {
              return (
                <li key={card.id + option}>
                  <input
                    id={option + card.id}
                    type='radio'
                    name={card.id}
                    value={option}
                    onClick={handleClick}
                    disabled={answerState === '' ? false : true}
                    style={{cursor}}
                  />
                  &nbsp;
                  <label 
                    htmlFor={option + card.id}
                    style={{cursor}}
                  >{option}</label>
                  &nbsp;
                  {answerState === 'card-incorrect' && option === card.correct_answer && <span className='correct-tick'>&#10004;</span>}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
