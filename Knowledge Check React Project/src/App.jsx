import { useEffect, useState } from 'react'
import CardList from './components/CardList'
import localStoreApi from './localStoreApi'
import Header from './components/Header'
import axios from 'axios'
import './App.css'

const initData = [
  {
    index: 1,
    id: crypto.randomUUID(),
    question: 'Welcome to the Knowledge Check',
    options: ["Created", "By", "Nikhil", "Gajam"],
    correct_answer: '',
  }
]

const triviaDBErrorCodes = {
  1: "No Results. Could not return results. The API doesn't have enough questions for your query.",
  2: "Invalid Parameter. Contains an invalid parameter. Arguements passed in aren't valid",
  3: "Token Not Found. Session Token does not exist.",
  4: "Token Empty Session. Token has returned all possible questions for the specified query. Resetting the Token is necessary.",
  5: "Rate Limit. Too many requests have occurred. Each IP can only access the API once every 5 seconds.",
}

function decodeData(text) {
  var element = document.createElement("textarea")
  element.innerHTML = text
  return element.value
}

function parseQuestions(data) {
  return data.map((question, index) => {
    const shuffledOptions = [
      question.correct_answer,
      ...question.incorrect_answers
    ].sort(() => Math.random() - 0.5)

    return {
      index: (index + 1),
      id: crypto.randomUUID(),
      question: decodeData(question.question),
      options: shuffledOptions.map(option => decodeData(option)),
      correct_answer: decodeData(question.correct_answer),
    }
  })
}

async function requestData(url, params) {
  try {
    const response = await axios.get(url, {
      params
    })
    return response
  } catch (error) {
    return { error }
  }
}

function App() {
  const [data, setData] = useState(initData)
  const [quote, setQuote] = useState('')
  const [categories, setCategories] = useState([{ id: 1, name: 'Loading...' }])
  const [errorMessage, setErrorMessage] = useState('')

  async function getCategories() {
    const url = 'https://opentdb.com/api_category.php'
    const response = await requestData(url)
    const parsedCategories = response.data.trivia_categories
    setCategories(parsedCategories)
  }

  async function getQuestions(params) {
    const url = 'https://opentdb.com/api.php'
    const response = await requestData(url, params)

    let responseCode = response?.data?.response_code

    responseCode = response?.data?.response_code
    if (responseCode > 1 || response.error) {
      responseCode = response?.error?.response?.data?.response_code
    }

    if (responseCode !== 0) {
      setErrorMessage(triviaDBErrorCodes[responseCode])
      setData((previousData) => previousData)
    } else {
      setErrorMessage('')
      setData(() => parseQuestions(response.data.results))

      localStoreApi.setCorrectScore(0)
      localStoreApi.setIncorrectScore(0)
    }
  }

  async function getQuote() {
    const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random'
    const response = await requestData(url)

    const quote = {
      content: response.data.data.content,
      author: response.data.data.author,
    }

    setQuote(quote)
  }

  function handleSubmit(params) {
    getQuestions(params)
  }

  useEffect(() => {
    const params = {
      amount: 50,
    }
    getCategories()
    getQuestions(params)
    getQuote()
  }, [])

  return (
    <>
      <Header
        categoriesList={categories}
        questionsSize={data.length}
        quote={quote}
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
      />
      <div className='container'>
        <CardList cards={data} />
      </div>
    </>
  )
}

export default App
