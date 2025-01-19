const QuizDataName = 'QuizData'
const initialQuizData = {
  correctScore: 0,
  incorrectScore: 0,
  highScore: 0,
}

const localStoreApi = {
  getQuizLocalStorageData() {
    const quizDataObj = localStorage.getItem(QuizDataName)
    return quizDataObj === null ? initialQuizData : JSON.parse(quizDataObj)
  },
  setQuizLocalStorageData(quizDataObj) {
    const quizDataObjString = JSON.stringify(quizDataObj)
    localStorage.setItem(QuizDataName, quizDataObjString)
  },

  getHighScore() {
    const quizDataObj = this.getQuizLocalStorageData()
    return quizDataObj.highScore
  },
  setHighScore(score) {
    const quizDataObj = this.getQuizLocalStorageData()
    this.setQuizLocalStorageData({ ...quizDataObj, highScore: parseInt(score) })
  },

  getCorrectScore() {
    const quizDataObj = this.getQuizLocalStorageData()
    return quizDataObj.correctScore
  },
  setCorrectScore(score) {
    const quizDataObj = this.getQuizLocalStorageData()
    this.setQuizLocalStorageData({ ...quizDataObj, correctScore: parseInt(score) })
  },

  getIncorrectScore() {
    const quizDataObj = this.getQuizLocalStorageData()
    return quizDataObj.incorrectScore
  },
  setIncorrectScore(score) {
    const quizDataObj = this.getQuizLocalStorageData()
    this.setQuizLocalStorageData({ ...quizDataObj, incorrectScore: parseInt(score) })
  }
}

export default localStoreApi;
