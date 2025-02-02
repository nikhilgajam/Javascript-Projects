import { useEffect, useState } from 'react'
import storageApi from '../storageApi'
import '../App.css'

const initCard = {
  id: 0,
  index: 0,
  question: '',
  options: [],
  correct_answer: '',
  isError: false,
}

export default function Card({ card = initCard }) {
  const [answerState, setAnswerState] = useState('')
  const [cursor, setCursor] = useState('pointer')

  useEffect(() => {
    if (answerState === 'card-correct') {
      const correctScore = storageApi.getCorrectScore() + 1
      const highScore = storageApi.getHighScore()

      storageApi.setCorrectScore(correctScore)

      if (correctScore > highScore) {
        storageApi.setHighScore(correctScore)
      }
    } else if (answerState === 'card-incorrect') {
      const correctScore = storageApi.getIncorrectScore() + 1

      storageApi.setIncorrectScore(correctScore)
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
                    style={{ cursor }}
                  />
                  &nbsp;
                  <label
                    htmlFor={option + card.id}
                    style={{ cursor }}
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
